'use server';

/**
 * @fileOverview A flow for generating automated progress reports for students.
 *
 * - generateProgressReport - A function that generates a progress report based on tutoring sessions and performance data.
 * - GenerateProgressReportInput - The input type for the generateProgressReport function.
 * - GenerateProgressReportOutput - The return type for the generateProgressReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProgressReportInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  subject: z.string().describe('The subject the student is being tutored in.'),
  learningGoals: z.string().describe('The learning goals of the student.'),
  performanceData: z.string().describe('Data about the student performance in tutoring sessions.'),
  sessionSummaries: z.string().describe('Summaries of the tutoring sessions.'),
});
export type GenerateProgressReportInput = z.infer<typeof GenerateProgressReportInputSchema>;

const GenerateProgressReportOutputSchema = z.object({
  report: z.string().describe('The generated progress report.'),
});
export type GenerateProgressReportOutput = z.infer<typeof GenerateProgressReportOutputSchema>;

export async function generateProgressReport(input: GenerateProgressReportInput): Promise<GenerateProgressReportOutput> {
  return generateProgressReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProgressReportPrompt',
  input: {schema: GenerateProgressReportInputSchema},
  output: {schema: GenerateProgressReportOutputSchema},
  prompt: `You are an expert tutor providing progress reports to students and parents.

  Based on the following information, generate a detailed progress report for the student.

  Student Name: {{{studentName}}}
  Subject: {{{subject}}}
  Learning Goals: {{{learningGoals}}}
  Performance Data: {{{performanceData}}}
  Session Summaries: {{{sessionSummaries}}}

  The progress report should include:
  - An overview of the student's strengths and weaknesses.
  - Progress made towards the learning goals.
  - Specific examples from the tutoring sessions.
  - Recommendations for future sessions.
  `,
});

const generateProgressReportFlow = ai.defineFlow(
  {
    name: 'generateProgressReportFlow',
    inputSchema: GenerateProgressReportInputSchema,
    outputSchema: GenerateProgressReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
