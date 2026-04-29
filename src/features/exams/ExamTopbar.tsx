import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookOpen, LogOut } from "lucide-react";

interface Question {
  passage_part_key?: string;
}

interface Timer {
  remaining: number;
  formatted: string;
}

interface ExamTopbarProps {
  examName: string;
  currentQuestion?: Question;
  timer: Timer;
  onPassageOpen: () => void;
  onLogout: () => void;
}

function TimerDisplay({
  remaining,
  formatted,
}: {
  remaining: number;
  formatted: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-md font-mono text-lg font-bold",
        remaining <= 300
          ? "text-destructive"
          : remaining <= 600
            ? "text-warning"
            : "text-foreground",
      )}
    >
      {formatted}
    </div>
  );
}

export function ExamTopbar({
  examName,
  currentQuestion,
  timer,
  onPassageOpen,
  onLogout,
}: ExamTopbarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-3 border-b transition-colors",
        timer.remaining <= 300
          ? "bg-destructive/10 border-destructive/30"
          : timer.remaining <= 600
            ? "bg-warning/10 border-warning/30"
            : timer.remaining <= 1800
              ? "bg-yellow-50 border-yellow-200"
              : "bg-background border-border",
      )}
    >
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-base">{examName}</h1>
        {currentQuestion?.passage_part_key && (
          <Button
            variant="outline"
            size="sm"
            onClick={onPassageOpen}
            className="border-primary text-primary"
          >
            <BookOpen className="h-4 w-4 mr-1" />
            Passage {currentQuestion.passage_part_key}
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <TimerDisplay remaining={timer.remaining} formatted={timer.formatted} />
        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="text-muted-foreground"
        >
          <LogOut className="h-4 w-4 mr-1" />
          Pause & Exit
        </Button>
      </div>
    </div>
  );
}
