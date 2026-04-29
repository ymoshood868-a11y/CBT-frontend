import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/lib/utils";

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const { accessToken } = useAuthStore();
  const isDemo = accessToken === "demo-token";

  // Show demo banner across all pages
  return (
    <>
      {isDemo && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-accent text-accent-foreground text-center text-xs py-1.5 font-medium">
          🎭 Demo Mode — Read-only preview ·{" "}
          <Link to="/demo" className="underline">
            Switch Role
          </Link>
        </div>
      )}
      <div className={cn(isDemo && "pt-7")}>{children}</div>
    </>
  );
}
