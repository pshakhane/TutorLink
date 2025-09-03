import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import RecommendationsForm from "./recommendations-form";
import { Sparkles } from "lucide-react";

export const maxDuration = 60;

export default function RecommendationsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-1 p-4 md:p-8">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle>Smart Tutor Recommendations</CardTitle>
                    <CardDescription>
                    Tell us your goals, and our AI will find the perfect tutor for you.
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
          <RecommendationsForm />
        </Card>
      </main>
    </div>
  );
}
