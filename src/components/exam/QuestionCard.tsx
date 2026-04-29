import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Flag } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  id: string;
  text: string;
  image_url?: string;
}

interface Question {
  id: string;
  text: string;
  type: "single" | "multiple";
  options: Option[];
  image_url?: string;
}

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string[];
  isFlagged?: boolean;
  onAnswer: (optionIds: string[]) => void;
  onFlag: () => void;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer = [],
  isFlagged = false,
  onAnswer,
  onFlag,
}: QuestionCardProps) {
  const handleOptionClick = (optionId: string) => {
    if (question.type === "single") {
      onAnswer([optionId]);
    } else {
      // Multiple choice
      if (selectedAnswer.includes(optionId)) {
        onAnswer(selectedAnswer.filter((id) => id !== optionId));
      } else {
        onAnswer([...selectedAnswer, optionId]);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>
                Question {questionNumber} of {totalQuestions}
              </span>
              {question.type === "multiple" && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                  Multiple Choice
                </span>
              )}
            </div>
            <div
              className="text-lg font-medium leading-relaxed"
              dangerouslySetInnerHTML={{ __html: question.text }}
            />
            {question.image_url && (
              <img
                src={question.image_url}
                alt="Question"
                className="mt-4 max-w-full rounded-lg border"
              />
            )}
          </div>
          <Button
            variant={isFlagged ? "default" : "outline"}
            size="sm"
            onClick={onFlag}
            className={cn(isFlagged && "bg-accent hover:bg-accent/90")}
          >
            <Flag className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer.includes(option.id);

          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={cn(
                "w-full text-left p-4 rounded-lg border-2 transition-all",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-accent/5",
              )}
            >
              <div className="flex items-start gap-3">
                {question.type === "multiple" ? (
                  <Checkbox checked={isSelected} className="mt-0.5" />
                ) : (
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5",
                      isSelected ? "border-primary" : "border-muted-foreground",
                    )}
                  >
                    {isSelected && (
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </div>
                )}
                <div className="flex-1">
                  <div dangerouslySetInnerHTML={{ __html: option.text }} />
                  {option.image_url && (
                    <img
                      src={option.image_url}
                      alt="Option"
                      className="mt-2 max-w-sm rounded border"
                    />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
