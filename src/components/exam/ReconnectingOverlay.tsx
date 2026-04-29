import { Loader2, WifiOff } from "lucide-react";

export function ReconnectingOverlay() {
  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto">
          <WifiOff className="h-8 w-8 text-warning" />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Connection Lost</h2>
          <p className="text-muted-foreground mb-4">
            Attempting to reconnect to the server...
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Reconnecting</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground max-w-md">
          Don't worry, your answers are saved locally and will be synced when
          connection is restored.
        </div>
      </div>
    </div>
  );
}
