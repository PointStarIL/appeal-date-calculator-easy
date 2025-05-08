
export interface Holiday {
  name: string;
  date: Date;
}

// Israeli holidays for 2024-2025
export const israeliHolidays: Holiday[] = [
  // 2024 Holidays
  { name: "Purim", date: new Date("2024-03-24") },
  { name: "Passover Eve", date: new Date("2024-04-22") },
  { name: "Passover (1st day)", date: new Date("2024-04-23") },
  { name: "Passover (7th day)", date: new Date("2024-04-29") },
  { name: "Independence Day", date: new Date("2024-05-14") },
  { name: "Shavuot", date: new Date("2024-06-12") },
  { name: "Rosh Hashanah Eve", date: new Date("2024-10-02") },
  { name: "Rosh Hashanah", date: new Date("2024-10-03") },
  { name: "Rosh Hashanah (2nd day)", date: new Date("2024-10-04") },
  { name: "Yom Kippur Eve", date: new Date("2024-10-11") },
  { name: "Yom Kippur", date: new Date("2024-10-12") },
  { name: "Sukkot Eve", date: new Date("2024-10-16") },
  { name: "Sukkot", date: new Date("2024-10-17") },
  { name: "Simchat Torah", date: new Date("2024-10-24") },
  
  // 2025 Holidays
  { name: "Purim", date: new Date("2025-03-14") },
  { name: "Passover Eve", date: new Date("2025-04-12") },
  { name: "Passover (1st day)", date: new Date("2025-04-13") },
  { name: "Passover (7th day)", date: new Date("2025-04-19") },
  { name: "Independence Day", date: new Date("2025-05-03") },
  { name: "Shavuot", date: new Date("2025-06-01") },
];

// Judicial recess periods
export interface JudicialRecess {
  name: string;
  startDate: Date;
  endDate: Date;
}

export const judicialRecesses: JudicialRecess[] = [
  { name: "Summer Recess 2024", startDate: new Date("2024-08-11"), endDate: new Date("2024-09-01") },
  { name: "Passover Recess 2024", startDate: new Date("2024-04-21"), endDate: new Date("2024-04-30") },
  { name: "Passover Recess 2025", startDate: new Date("2025-04-11"), endDate: new Date("2025-04-20") },
];
