"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getSmartTutorRecommendations } from "@/ai/flows/smart-tutor-recommendations";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  learningGoals: z.string().min(10, {
    message: "Learning goals must be at least 10 characters.",
  }),
  academicHistory: z.string().min(10, {
    message: "Academic history must be at least 10 characters.",
  }),
  subjectArea: z.string().min(2, {
    message: "Subject area must be at least 2 characters.",
  }),
});

type RecommendationOutput = {
  recommendedTutors: string[];
  reasoning: string;
};

export default function RecommendationsForm() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] =
    useState<RecommendationOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      learningGoals: "I want to understand quantum mechanics fundamentals and prepare for my final exam.",
      academicHistory: "Aced Physics I (A+), struggled a bit with Electromagnetism (B-). Strong in math (Calculus, Linear Algebra).",
      subjectArea: "Quantum Physics",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setRecommendations(null);
    try {
      const result = await getSmartTutorRecommendations(values);
      setRecommendations(result);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      setRecommendations({ recommendedTutors: [], reasoning: "An error occurred while fetching recommendations. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="subjectArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Area</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Creative Writing" {...field} />
                  </FormControl>
                  <FormDescription>
                    What subject do you need help with?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="learningGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Learning Goals</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Prepare for an exam, understand a specific topic, improve my grade..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="academicHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic History</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'Good grades in math, but struggle with physics concepts...'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Briefly describe your background in this and related subjects.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Finding Tutors...</>
              ) : (
                <><Sparkles className="mr-2 h-4 w-4" /> Get Recommendations</>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {recommendations && (
        <div className="px-6 py-4 border-t">
            <h3 className="text-lg font-semibold mb-4">Your Recommended Tutors</h3>
            <div className="space-y-4 mb-6">
                {recommendations.recommendedTutors.map((tutorName, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${tutorName.replace(/\s/g, '')}`} alt={tutorName} />
                            <AvatarFallback>{tutorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-semibold">{tutorName}</p>
                            <p className="text-sm text-muted-foreground">Expert in {form.getValues("subjectArea")}</p>
                        </div>
                        <Button variant="outline">View Profile</Button>
                    </div>
                ))}
            </div>
            <h3 className="text-lg font-semibold mb-2">Reasoning</h3>
            <div className="prose prose-sm max-w-none rounded-md border bg-secondary/50 p-4">
                <p>{recommendations.reasoning}</p>
            </div>
        </div>
      )}
    </>
  );
}
