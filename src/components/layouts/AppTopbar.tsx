import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useUiStore } from "@/stores/ui.store";

const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  exams: "Exams",
  questions: "Question Bank",
  results: "Results",
  students: "Students",
  teachers: "Teachers",
  schools: "Schools",
  billing: "Billing",
  analytics: "Analytics",
  settings: "Settings",
  monitor: "Live Monitor",
  retakes: "Retake Requests",
  profile: "My Profile",
};

export function AppTopbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications] = useState(3);

  const segment = location.pathname.split("/").pop() ?? "dashboard";
  const title = pageTitles[segment] ?? "Dashboard";

  return (
    <header
      style={{
        height: 64,
        background: "hsl(var(--background))",
        borderBottom: "1px solid hsl(var(--border))",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        flexShrink: 0,
        zIndex: 10,
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Mobile menu button */}
        <button
          onClick={() => useUiStore.getState().setSidebarOpen(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            color: "hsl(var(--muted-foreground))",
            display: "none",
          }}
          className="md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "hsl(var(--foreground))",
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "hsl(var(--muted-foreground))",
              margin: 0,
            }}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Notification bell */}
        <button
          style={{
            position: "relative",
            background: "hsl(var(--secondary))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 10,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "hsl(var(--muted-foreground))",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "hsl(var(--accent) / 0.1)";
            e.currentTarget.style.borderColor = "hsl(var(--primary))";
            e.currentTarget.style.color = "hsl(var(--primary))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "hsl(var(--secondary))";
            e.currentTarget.style.borderColor = "hsl(var(--border))";
            e.currentTarget.style.color = "hsl(var(--muted-foreground))";
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {notifications > 0 && (
            <span
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                background: "hsl(var(--destructive))",
                color: "hsl(var(--destructive-foreground))",
                fontSize: 10,
                fontWeight: 700,
                width: 18,
                height: 18,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid hsl(var(--background))",
              }}
            >
              {notifications}
            </span>
          )}
        </button>

        {/* Divider */}
        <div
          style={{ width: 1, height: 28, background: "hsl(var(--border))" }}
        />

        {/* Avatar + dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowDropdown((d) => !d)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "hsl(var(--secondary))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 10,
              padding: "6px 12px 6px 6px",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "hsl(var(--accent) / 0.1)";
              e.currentTarget.style.borderColor = "hsl(var(--primary))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "hsl(var(--secondary))";
              e.currentTarget.style.borderColor = "hsl(var(--border))";
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "hsl(var(--primary) / 0.1)",
                border: "2px solid hsl(var(--primary) / 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "hsl(var(--primary))",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {(user?.first_name ?? user?.email ?? "U")[0].toUpperCase()}
            </div>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "hsl(var(--foreground))",
                  lineHeight: 1.2,
                }}
              >
                {user?.first_name} {user?.last_name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "hsl(var(--muted-foreground))",
                  lineHeight: 1.2,
                  textTransform: "capitalize",
                }}
              >
                {user?.role?.replace("_", " ") ?? "Student"}
              </div>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {showDropdown && (
            <>
              <div
                style={{ position: "fixed", inset: 0, zIndex: 40 }}
                onClick={() => setShowDropdown(false)}
              />
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  background: "hsl(var(--background))",
                  borderRadius: 12,
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  minWidth: 200,
                  zIndex: 50,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "14px 16px",
                    borderBottom: "1px solid hsl(var(--border))",
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {user?.first_name} {user?.last_name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    {user?.email ?? user?.user_code}
                  </div>
                </div>
                {[
                  {
                    label: "Profile",
                    icon: "👤",
                    action: () => {
                      navigate(`/${user?.role}/profile`);
                      setShowDropdown(false);
                    },
                  },
                  {
                    label: "Settings",
                    icon: "⚙️",
                    action: () => {
                      navigate(`/${user?.role}/settings`);
                      setShowDropdown(false);
                    },
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 16px",
                      background: "none",
                      border: "none",
                      fontSize: 14,
                      color: "hsl(var(--foreground))",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "hsl(var(--secondary))")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <span style={{ fontSize: 16 }}>{item.icon}</span>{" "}
                    {item.label}
                  </button>
                ))}
                <div style={{ borderTop: "1px solid hsl(var(--border))" }}>
                  <button
                    onClick={() => {
                      useAuthStore.getState().clearAuth();
                      navigate("/login");
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 16px",
                      background: "none",
                      border: "none",
                      fontSize: 14,
                      color: "hsl(var(--destructive))",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "hsl(var(--destructive) / 0.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
