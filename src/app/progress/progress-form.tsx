"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { generateProgressReport } from "@/ai/flows/automated-progress-reports";
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

const formSchema = z.object({
  studentName: z.string().min(2, {
    message: "Student name must be at least 2 characters.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  learningGoals: z.string().min(10, {
    message: "Please describe the learning goals.",
  }),
  performanceData: z.string().min(10, {
    message: "Please describe the student's performance.",
  }),
  sessionSummaries: z.string().min(10, {
    message: "Please provide summaries of recent sessions.",
  }),
});

export default function ProgressForm() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "Alex Doe",
      subject: "Algebra II",
      learningGoals: "Improve understanding of quadratic equations and functions.",
      performanceData: "Struggles with factoring complex trinomials, but excels at graphing linear equations. Recent quiz score: 78%.",
      sessionSummaries: "Worked on factoring methods, including grouping and substitution. Reviewed homework problems and identified common errors.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setReport("");
    try {
      const result = await generateProgressReport(values);
      setReport(result.report);
    } catch (error) {
      console.error("Error generating report:", error);
      setReport("An error occurred while generating the report. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Calculus II" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="learningGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Learning Goals</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the student's main objectives..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="performanceData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Performance Data</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Include quiz scores, homework completion, areas of strength and weakness..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sessionSummaries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Summaries</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Summarize topics covered and student engagement in recent sessions..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Report
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {report && (
        <div className="px-6 py-4 border-t">
          <h3 className="text-lg font-semibold mb-2">Generated Report:</h3>
          <div className="prose prose-sm max-w-none rounded-md border bg-secondary/50 p-4 whitespace-pre-wrap">
            {report}
          </div>
        </div>
      )}
    </>
  );
}
