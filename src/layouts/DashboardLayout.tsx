import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

// UI / layout components
import { AppSidebar } from "@/components/layouts/AppSidebar";
import { AppTopbar } from "@/components/layouts/AppTopbar";

// auth gate
import { PasswordChangeGate } from "@/router/guards";

export function DashboardLayout() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isDemo = accessToken === "demo-token";

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "hsl(var(--background))",
      }}
    >
      {/* Demo Mode Banner */}
      {isDemo && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background: "hsl(var(--accent))",
            color: "hsl(var(--accent-foreground))",
            textAlign: "center",
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 600,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          🎭 Demo Mode — Read-only preview
        </div>
      )}

      {/* Sidebar */}
      <AppSidebar />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          marginTop: isDemo ? 32 : 0,
        }}
      >
        <AppTopbar />

        <main
          id="main-content"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 24,
          }}
        >
          <PasswordChangeGate>
            <Outlet />
          </PasswordChangeGate>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
