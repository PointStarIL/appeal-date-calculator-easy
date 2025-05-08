
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDateHebrew } from "@/utils/dateUtils";
import { jsPDF } from "jspdf";
import "jspdf/dist/polyfills.es.js";
import { format } from "date-fns";

interface ResultCardProps {
  decisionDate: Date;
  deadline: Date;
  explanation: string;
  daysCount: number;
}

export function ResultCard({ decisionDate, deadline, explanation, daysCount }: ResultCardProps) {
  const exportToPdf = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Set RTL mode for Hebrew text
    pdf.setR2L(true);

    // Add title
    pdf.setFontSize(20);
    pdf.text("חישוב מועד ערר/ערעור", 105, 20, { align: "center" });

    // Add content
    pdf.setFontSize(12);
    pdf.text(`תאריך ההחלטה: ${formatDateHebrew(decisionDate)}`, 200, 40, { align: "right" });
    pdf.text(`המועד האחרון להגשה: ${formatDateHebrew(deadline)}`, 200, 50, { align: "right" });
    pdf.text(`${explanation}`, 200, 60, { align: "right" });
    pdf.text(`סה"כ ימים: ${daysCount}`, 200, 70, { align: "right" });

    // Add footer with date
    pdf.setFontSize(10);
    pdf.text(`הופק בתאריך: ${format(new Date(), "dd/MM/yyyy")}`, 200, 280, { align: "right" });

    // Save the PDF
    pdf.save(`appeal-deadline-${format(deadline, "dd-MM-yyyy")}.pdf`);
  };

  return (
    <Card className="w-full max-w-md shadow-lg bg-blue-50">
      <CardHeader className="bg-green-600 text-white rounded-t-lg">
        <CardTitle className="text-center text-xl">תוצאת החישוב</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4 text-right">
          <div className="border-b pb-2">
            <h3 className="font-semibold">תאריך ההחלטה:</h3>
            <p className="text-lg">{formatDateHebrew(decisionDate)}</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold">המועד האחרון להגשה:</h3>
            <p className="text-xl font-bold text-green-700">{formatDateHebrew(deadline)}</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold">פירוט החישוב:</h3>
            <p>{explanation}</p>
          </div>
          
          <div className="pb-2">
            <h3 className="font-semibold">סה"כ ימים (כולל סופי שבוע וחגים):</h3>
            <p>{daysCount} ימים</p>
          </div>

          <Button 
            onClick={exportToPdf} 
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
          >
            ייצא ל-PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
