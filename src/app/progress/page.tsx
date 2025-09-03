import { generateProgressReport } from "@/ai/flows/automated-progress-reports";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ProgressForm from "./progress-form";
import { ClipboardList } from "lucide-react";

export const maxDuration = 60;

export default function ProgressReportPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-1 p-4 md:p-8">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <ClipboardList className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Generate Progress Report</CardTitle>
                <CardDescription>
                  Let AI create a detailed progress report based on student
                  performance.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <ProgressForm />
        </Card>
      </main>
    </div>
  );
}
