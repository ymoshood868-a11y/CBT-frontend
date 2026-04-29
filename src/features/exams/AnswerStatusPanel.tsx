import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
}

interface AnswerStatusPanelProps {
  questions: Question[];
  answers: Record<string, string[]>;
  flagged: Record<string, boolean>;
  currentIndex: number;
  onNavigate: (index: number) => void;
  onOpenReview: () => void;
}

export function AnswerStatusPanel({
  questions,
  answers,
  flagged,
  currentIndex,
  onNavigate,
  onOpenReview,
}: AnswerStatusPanelProps) {
  const answered = questions.filter((q) => answers[q.id]?.length > 0).length;

  return (
    <aside className="w-64 border-l bg-muted/20 flex flex-col overflow-y-auto p-4 space-y-4">
      {/* Legend */}
      <div className="space-y-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary" />
          Answered
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-accent" />
          Flagged
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted border" />
          Unanswered
        </div>
      </div>
      {/* Stats */}
      <div className="text-sm font-medium">
        {answered}/{questions.length} answered
      </div>
      {/* Grid */}
      <div className="grid grid-cols-5 gap-1.5">
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => onNavigate(i)}
            className={cn(
              "h-8 w-8 rounded text-xs font-bold transition-colors",
              i === currentIndex && "ring-2 ring-ring ring-offset-1",
              flagged[q.id]
                ? "bg-accent text-accent-foreground"
                : answers[q.id]?.length
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70",
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {/* Actions */}
      <div className="space-y-2 pt-2">
        <Button
          variant="outline"
          className="w-full"
          size="sm"
          onClick={onOpenReview}
        >
          Review & Submit
        </Button>
      </div>
    </aside>
  );
}
