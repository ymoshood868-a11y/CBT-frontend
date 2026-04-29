import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { RefreshCcw } from "lucide-react";
import { api } from "@/lib/api";

interface ExamInstructions {
  id: string;
  name: string;
  subject_name: string;
  duration_minutes: number;
  question_count: number;
  pass_mark: number;
  instructions: string;
  is_retake: boolean;
  retake_note?: string;
  granted_minutes?: number;
}

async function fetchExamInstructions(
  examId: string,
): Promise<ExamInstructions> {
  const response = await api.get(`/exams/${examId}/instructions`);
  return response as unknown as ExamInstructions;
}

export function ExamInstructions() {
  const { examId } = useParams();
  const { data: exam } = useQuery({
    queryKey: ["exam-instructions", examId],
    queryFn: () => fetchExamInstructions(examId!),
  });
  const navigate = useNavigate();
  const [starting, setStarting] = useState(false);

  async function handleStart() {
    setStarting(true);
    try {
      const response = await api.post(`/sessions/${examId}/join`);
      const data = response as unknown as { session_id: string };
      navigate(`/exam/${data.session_id}`);
    } catch (error) {
      console.error("Failed to start exam:", error);
      setStarting(false);
    }
  }

  if (!exam) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6">
      {/* Retake note banner */}
      {exam.is_retake && (
        <Alert className="border-accent bg-accent/5">
          <RefreshCcw className="h-4 w-4 text-accent" />
          <AlertTitle>Retake Session</AlertTitle>
          <AlertDescription>
            {exam.retake_note}
            <p className="mt-1 font-semibold">
              You have {exam.granted_minutes} minutes. You will resume from
              where you left off.
            </p>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{exam.name}</CardTitle>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>📚 {exam.subject_name}</span>
            <span>⏱ {exam.duration_minutes} min</span>
            <span>❓ {exam.question_count} questions</span>
            <span>🎯 Pass: {exam.pass_mark}%</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Instructions</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {exam.instructions}
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2">Exam Rules</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>🔒 Fullscreen mode is required throughout the exam</li>
              <li>⚠️ Tab switching is monitored and logged</li>
              <li>🚫 Copy and paste is disabled</li>
              <li>💾 Answers are auto-saved every 30 seconds</li>
              <li>📷 Webcam monitoring may be active</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            onClick={handleStart}
            loading={starting}
            disabled={starting}
          >
            {exam.is_retake ? "Start Retake" : "Start Exam"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
