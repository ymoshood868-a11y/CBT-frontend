import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Flag } from "lucide-react";

interface Question {
  id: string;
  text: string;
}

interface SubmitReviewDialogProps {
  open: boolean;
  questions: Question[];
  answers: Record<string, string[]>;
  flagged: Record<string, boolean>;
  onNavigate: (index: number) => void;
  onSubmit: () => void;
}

export function SubmitReviewDialog({
  open,
  questions,
  answers,
  flagged,
  onNavigate,
  onSubmit,
}: SubmitReviewDialogProps) {
  const answeredCount = questions.filter(
    (q) => answers[q.id]?.length > 0,
  ).length;
  const unansweredCount = questions.length - answeredCount;
  const flaggedQuestions = questions
    .filter((q) => flagged[q.id])
    .map((q) => ({ question: q, index: questions.indexOf(q) }));

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review & Submit Exam</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-3xl font-bold text-primary">
                {answeredCount}
              </div>
              <div className="text-sm text-muted-foreground">Answered</div>
            </div>
            <div className="text-center p-4 bg-destructive/10 rounded-lg">
              <div className="text-3xl font-bold text-destructive">
                {unansweredCount}
              </div>
              <div className="text-sm text-muted-foreground">Unanswered</div>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <div className="text-3xl font-bold text-accent">
                {flaggedQuestions.length}
              </div>
              <div className="text-sm text-muted-foreground">Flagged</div>
            </div>
          </div>

          {/* Warnings */}
          {unansweredCount > 0 && (
            <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-destructive">
                  You have {unansweredCount} unanswered question
                  {unansweredCount > 1 ? "s" : ""}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Unanswered questions will be marked as incorrect. Review them
                  before submitting.
                </p>
              </div>
            </div>
          )}

          {/* Flagged Questions */}
          {flaggedQuestions.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Flag className="h-4 w-4 text-accent" />
                Flagged Questions
              </h3>
              <div className="space-y-2">
                {flaggedQuestions.map(({ question, index }) => (
                  <button
                    key={question.id}
                    onClick={() => onNavigate(index)}
                    className="w-full text-left p-3 border rounded-lg hover:bg-accent/5 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">Q{index + 1}</Badge>
                      <span
                        className="text-sm line-clamp-1"
                        dangerouslySetInnerHTML={{ __html: question.text }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {answers[question.id]?.length
                        ? "Answered"
                        : "Not answered"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate(0)}>
            Review Questions
          </Button>
          <Button onClick={onSubmit} variant="default">
            Submit Exam
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
