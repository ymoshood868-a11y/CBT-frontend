import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import type { ReactNode } from "react";

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isDemo = accessToken === "demo-token";
  const navigate = useNavigate();

  return (
    <>
      {isDemo && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background: "#ff9001",
            color: "#fff",
            textAlign: "center",
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 600,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          🎭 Demo Mode — Read-only preview ·{" "}
          <button
            onClick={() => navigate("/demo")}
            style={{
              color: "#fff",
              textDecoration: "underline",
              fontWeight: 700,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontFamily: "inherit",
            }}
          >
            Switch Role
          </button>
        </div>
      )}
      <div style={{ paddingTop: isDemo ? 32 : 0 }}>{children}</div>
    </>
  );
}
