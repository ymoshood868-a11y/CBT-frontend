import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  endsAt: string;
  label: string;
}

export function CountdownTimer({ endsAt, label }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        setTimeLeft(formatDistanceToNow(new Date(endsAt), { addSuffix: true }));
      } catch (error) {
        setTimeLeft("Invalid date");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [endsAt]);

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Clock className="h-4 w-4" />
      <span>
        {label}:{" "}
        <span className="font-semibold text-foreground">{timeLeft}</span>
      </span>
    </div>
  );
}
