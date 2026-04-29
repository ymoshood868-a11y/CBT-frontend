import { CheckCircle2, Loader2, XCircle, Cloud } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface AutoSaveIndicatorProps {
  lastSaved: Date | null;
  status: "idle" | "saving" | "saved" | "error";
}

export function AutoSaveIndicator({
  lastSaved,
  status,
}: AutoSaveIndicatorProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "saving":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case "saved":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "error":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Cloud className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "saving":
        return "Saving...";
      case "saved":
        return lastSaved
          ? `Saved ${formatDistanceToNow(lastSaved, { addSuffix: true })}`
          : "Saved";
      case "error":
        return "Failed to save";
      default:
        return "Auto-save enabled";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-background border rounded-lg shadow-lg px-4 py-2 flex items-center gap-2 text-sm">
      {getStatusIcon()}
      <span className="text-muted-foreground">{getStatusText()}</span>
    </div>
  );
}
