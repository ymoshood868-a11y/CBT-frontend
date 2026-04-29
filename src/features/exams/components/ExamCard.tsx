import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./CountdownTimer";
import { getExamCardState } from "../utils/examStates";
import type { StudentExam } from "../utils/examStates";
import { cn } from "@/lib/utils";
import { Clock, HelpCircle, Target } from "lucide-react";

interface ExamCardProps {
  exam: StudentExam;
  onAction?: (exam: StudentExam) => void;
}

export function ExamCard({ exam, onAction }: ExamCardProps) {
  const state = getExamCardState(exam);

  const handleClick = () => {
    if (state.action && onAction) {
      onAction(exam);
    }
  };

  return (
    <Card className={cn("transition-all hover:shadow-md", state.borderClass)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-base font-semibold line-clamp-2">
              {exam.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {exam.subject_name}
            </p>
          </div>
          <Badge variant={state.badgeVariant}>{state.statusLabel}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{exam.duration_minutes} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4" />
            <span>{exam.question_count} questions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Target className="h-4 w-4" />
            <span>Pass: {exam.pass_mark}%</span>
          </div>
        </div>

        {exam.starts_at && new Date(exam.starts_at) > new Date() && (
          <CountdownTimer endsAt={exam.starts_at} label="Starts in" />
        )}

        {exam.retake_status === "APPROVED" && exam.retake_note && (
          <div className="text-xs text-muted-foreground italic bg-accent/10 p-2 rounded">
            "{exam.retake_note}"
          </div>
        )}
      </CardContent>

      {state.action !== undefined && (
        <CardFooter>
          <Button
            className="w-full"
            variant={state.actionVariant || "default"}
            onClick={handleClick}
            disabled={!state.action}
          >
            {state.actionLabel}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
