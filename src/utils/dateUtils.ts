
import { format, addDays, isWeekend, isSameDay } from "date-fns";
import { Holiday, israeliHolidays, JudicialRecess, judicialRecesses } from "../data/holidays";

// Check if a date is a holiday
export function isHoliday(date: Date): boolean {
  return israeliHolidays.some(holiday => isSameDay(holiday.date, date));
}

// Check if a date falls during a judicial recess
export function isDuringJudicialRecess(date: Date): boolean {
  return judicialRecesses.some(
    recess => date >= recess.startDate && date <= recess.endDate
  );
}

// Get the next business day (not a weekend or holiday)
export function getNextBusinessDay(date: Date): Date {
  let nextDay = addDays(date, 1);
  while (isWeekend(nextDay) || isHoliday(nextDay)) {
    nextDay = addDays(nextDay, 1);
  }
  return nextDay;
}

// Format date to Hebrew-friendly format
export function formatDateHebrew(date: Date): string {
  return format(date, "dd/MM/yyyy");
}

// Calculate the appeal deadline based on decision date, proceeding type and institution
export function calculateAppealDeadline(
  decisionDate: Date, 
  proceedingType: string,
  institutionType: string
): {
  deadline: Date,
  explanation: string,
  adjustedForHoliday: boolean,
  adjustedForWeekend: boolean,
  daysCount: number
} {
  // Default values
  let daysCount = 30; // Default to 30 days
  let explanation = "";
  let adjustedForHoliday = false;
  let adjustedForWeekend = false;
  
  // Determine days count based on proceeding and institution type
  if (proceedingType === "appeal") {
    if (institutionType === "court") {
      daysCount = 45;
      explanation = "45 ימים להגשת ערעור על החלטת בית משפט";
    } else if (institutionType === "committee") {
      daysCount = 30;
      explanation = "30 ימים להגשת ערעור על החלטת ועדת ערר";
    } else if (institutionType === "localCommittee") {
      daysCount = 30;
      explanation = "30 ימים להגשת ערעור על החלטת ועדה מקומית";
    } else {
      daysCount = 30;
      explanation = "30 ימים להגשת ערעור";
    }
  } else if (proceedingType === "review") {
    daysCount = 15;
    explanation = "15 ימים להגשת בקשה לעיון מחדש";
  } else if (proceedingType === "objection") {
    if (institutionType === "localCommittee") {
      daysCount = 45;
      explanation = "45 ימים להגשת ערר על החלטת ועדה מקומית";
    } else {
      daysCount = 30;
      explanation = "30 ימים להגשת ערר";
    }
  } else if (proceedingType === "bettermentLevy") {
    daysCount = 45;
    explanation = "45 ימים להגשת ערר על שומת היטל השבחה";
  } else {
    // Default
    daysCount = 30;
    explanation = "30 ימים להגשת ערר";
  }

  // Start counting from the day after the decision
  let currentDate = decisionDate;
  let actualDaysCount = 0;
  let countedDays = 0;
  
  // Continue adding days until we reach the required number of days
  while (countedDays < daysCount) {
    currentDate = addDays(currentDate, 1);
    actualDaysCount++;
    
    // Only holidays are not counted, but weekends are counted for all proceedings
    const isHolidayDay = isHoliday(currentDate);
    
    if (!isHolidayDay) {
      countedDays++;
    }
  }

  // Check if the final date falls on a weekend or holiday, and adjust if needed
  if (currentDate.getDay() === 5) { // Friday
    currentDate = addDays(currentDate, 2); // Move to Sunday
    adjustedForWeekend = true;
    explanation += ". המועד נדחה בשל סוף שבוע";
  } else if (currentDate.getDay() === 6) { // Saturday
    currentDate = addDays(currentDate, 1); // Move to Sunday
    adjustedForWeekend = true;
    explanation += ". המועד נדחה בשל סוף שבוע";
  }

  // Check again for holidays after weekend adjustment
  if (isHoliday(currentDate)) {
    const originalDate = new Date(currentDate);
    currentDate = getNextBusinessDay(currentDate);
    adjustedForHoliday = true;
    explanation += ". המועד נדחה בשל חג";
  }

  return {
    deadline: currentDate,
    explanation,
    adjustedForHoliday,
    adjustedForWeekend,
    daysCount: actualDaysCount
  };
}
