import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface LogoutConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function LogoutConfirmDialog({
  open,
  onConfirm,
  onCancel,
}: LogoutConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div>
              <DialogTitle>Pause & Exit Exam?</DialogTitle>
              <DialogDescription>
                Your progress will be saved and you can resume later
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3 text-sm text-muted-foreground">
          <p>When you pause the exam:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>All your answers will be saved</li>
            <li>The timer will continue running</li>
            <li>You can resume from where you left off</li>
            <li>Your session will remain active</li>
          </ul>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Continue Exam
          </Button>
          <Button variant="warning" onClick={onConfirm}>
            Pause & Exit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
