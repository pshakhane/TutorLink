'use server';
/**
 * @fileOverview Provides AI-powered tutor recommendations based on student learning goals, academic history, and subject area.
 *
 * - getSmartTutorRecommendations - A function that takes student information and returns a list of recommended tutors.
 * - SmartTutorRecommendationsInput - The input type for the getSmartTutorRecommendations function.
 * - SmartTutorRecommendationsOutput - The return type for the getSmartTutorRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartTutorRecommendationsInputSchema = z.object({
  learningGoals: z
    .string()
    .describe('The learning goals of the student.'),
  academicHistory: z
    .string()
    .describe('The academic history of the student, including subjects studied and grades.'),
  subjectArea: z.string().describe('The subject area the student needs tutoring in.'),
});
export type SmartTutorRecommendationsInput = z.infer<
  typeof SmartTutorRecommendationsInputSchema
>;

const SmartTutorRecommendationsOutputSchema = z.object({
  recommendedTutors: z
    .array(z.string())
    .describe('A list of recommended tutor names.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the tutor recommendations.'),
});
export type SmartTutorRecommendationsOutput = z.infer<
  typeof SmartTutorRecommendationsOutputSchema
>;

export async function getSmartTutorRecommendations(
  input: SmartTutorRecommendationsInput
): Promise<SmartTutorRecommendationsOutput> {
  return smartTutorRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartTutorRecommendationsPrompt',
  input: {schema: SmartTutorRecommendationsInputSchema},
  output: {schema: SmartTutorRecommendationsOutputSchema},
  prompt: `You are an AI tutor recommendation system.

  Based on the student's learning goals, academic history, and subject area,
  recommend a list of tutors who are best suited to help the student.

  Student Learning Goals: {{{learningGoals}}}
  Student Academic History: {{{academicHistory}}}
  Subject Area: {{{subjectArea}}}

  List the names of the recommended tutors, and explain the reasoning behind your recommendations.
  `,
});

const smartTutorRecommendationsFlow = ai.defineFlow(
  {
    name: 'smartTutorRecommendationsFlow',
    inputSchema: SmartTutorRecommendationsInputSchema,
    outputSchema: SmartTutorRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
