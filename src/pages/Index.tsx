
import React, { useState } from "react";
import { DateForm } from "@/components/DateForm";
import { ResultCard } from "@/components/ResultCard";
import { calculateAppealDeadline } from "@/utils/dateUtils";

const Index = () => {
  const [calculationResult, setCalculationResult] = useState<{
    decisionDate: Date;
    deadline: Date;
    explanation: string;
    daysCount: number;
  } | null>(null);

  const handleCalculate = (data: {
    decisionDate: Date;
    proceedingType: string;
    institutionType: string;
  }) => {
    const result = calculateAppealDeadline(
      data.decisionDate,
      data.proceedingType,
      data.institutionType
    );

    setCalculationResult({
      decisionDate: data.decisionDate,
      deadline: result.deadline,
      explanation: result.explanation,
      daysCount: result.daysCount,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto py-10 px-4">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">מחשבון מועדי ערר</h1>
          <p className="text-gray-600">
            חשב את המועד האחרון להגשת ערר/ערעור על החלטות של גופים שיפוטיים
          </p>
        </header>

        <div className="flex flex-col md:flex-row justify-center gap-8 items-start">
          <DateForm onCalculate={handleCalculate} />
          
          {calculationResult && (
            <ResultCard
              decisionDate={calculationResult.decisionDate}
              deadline={calculationResult.deadline}
              explanation={calculationResult.explanation}
              daysCount={calculationResult.daysCount}
            />
          )}
        </div>

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© 2025 מחשבון מועדי ערר - כלי עזר למשפטנים</p>
          <p className="mt-1">הכלי נועד לשימוש כעזר בלבד ואינו מהווה ייעוץ משפטי</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
