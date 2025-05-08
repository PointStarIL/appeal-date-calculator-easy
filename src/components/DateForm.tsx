
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  decisionDate: z.date({
    required_error: "יש לבחור תאריך החלטה",
  }),
  proceedingType: z.string({
    required_error: "יש לבחור סוג הליך",
  }),
  institutionType: z.string({
    required_error: "יש לבחור סוג מוסד",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface DateFormProps {
  onCalculate: (data: FormData) => void;
}

export function DateForm({ onCalculate }: DateFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      proceedingType: "objection",
      institutionType: "court",
    },
  });

  const handleSubmit = (data: FormData) => {
    onCalculate(data);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="bg-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-center text-xl">חישוב מועדי ערר/ערעור</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="decisionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-right">תאריך ההחלטה/פסק דין</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-right font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>בחר תאריך</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="proceedingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right block">סוג ההליך</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="בחר סוג הליך" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="text-right">
                        <SelectItem value="objection">ערר</SelectItem>
                        <SelectItem value="appeal">ערעור</SelectItem>
                        <SelectItem value="review">בקשה לעיון מחדש</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="institutionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right block">סוג המוסד</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="בחר סוג מוסד" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="text-right">
                        <SelectItem value="court">בית משפט</SelectItem>
                        <SelectItem value="tribunal">בית דין</SelectItem>
                        <SelectItem value="committee">ועדת ערר</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              חשב מועד אחרון
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
