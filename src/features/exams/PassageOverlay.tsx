import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PassageOverlayProps {
  open: boolean;
  partKey?: string;
  title?: string;
  content?: string;
  onClose: () => void;
}

export function PassageOverlay({
  open,
  partKey,
  title,
  content,
  onClose,
}: PassageOverlayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Critical: always scroll to top on open
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-background overflow-y-auto"
      ref={scrollRef}
    >
      {/* Sticky header */}
      <div className="sticky top-0 bg-background border-b z-10 px-6 py-4 flex justify-between items-center shadow-sm">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            Passage {partKey}
          </p>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <Button variant="outline" onClick={onClose} size="sm">
          <X className="h-4 w-4 mr-2" />
          Close Passage
        </Button>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div
          className="prose prose-neutral max-w-none text-base leading-8"
          dangerouslySetInnerHTML={{ __html: content || "" }}
        />
      </div>

      {/* Bottom close */}
      <div className="flex justify-center pb-12">
        <Button size="lg" onClick={onClose}>
          Close & Return to Question
        </Button>
      </div>
    </div>
  );
}
