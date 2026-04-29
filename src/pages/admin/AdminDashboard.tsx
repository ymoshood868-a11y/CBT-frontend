import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hour = currentTime.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const pendingExams = [
    {
      id: 1,
      name: "Physics Final Exam",
      teacher: "John Williams",
      date: "Apr 18, 2026",
    },
    {
      id: 2,
      name: "Chemistry Quiz",
      teacher: "Sarah Johnson",
      date: "Apr 20, 2026",
    },
    {
      id: 3,
      name: "Biology Test",
      teacher: "Michael Brown",
      date: "Apr 22, 2026",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "var(--font-inter)",
        background: "hsl(var(--background))",
        minHeight: "100%",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)",
          borderRadius: 16,
          padding: "32px",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "hsl(var(--accent) / 0.2)",
            filter: "blur(60px)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              marginBottom: 20,
            }}
          >
            <div>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.8)",
                  fontSize: 14,
                  margin: "0 0 8px",
                  fontWeight: 500,
                }}
              >
                {greeting}, {user?.first_name}! 👋
              </p>
              <h1
                style={{
                  color: "hsl(var(--primary-foreground))",
                  fontSize: 32,
                  fontWeight: 800,
                  margin: "0 0 8px",
                  letterSpacing: "-0.02em",
                }}
              >
                Admin Dashboard
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                Manage your school at <strong>{user?.school?.name}</strong>
              </p>
            </div>

            {/* Online Status & Time */}
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: isOnline
                    ? "rgba(34, 197, 94, 0.2)"
                    : "rgba(239, 68, 68, 0.2)",
                  border: `1px solid ${isOnline ? "rgba(34, 197, 94, 0.4)" : "rgba(239, 68, 68, 0.4)"}`,
                  borderRadius: 100,
                  padding: "8px 16px",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: isOnline ? "#22c55e" : "#ef4444",
                    boxShadow: `0 0 8px ${isOnline ? "#22c55e" : "#ef4444"}`,
                  }}
                />
                <span
                  style={{
                    color: "hsl(var(--primary-foreground))",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
              <div
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 24,
                  fontWeight: 700,
                  fontFamily: "monospace",
                }}
              >
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div
                style={{
                  color: "hsl(var(--primary-foreground) / 0.7)",
                  fontSize: 12,
                }}
              >
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Total Students",
            value: "450",
            icon: "👥",
            color: "hsl(var(--primary))",
            change: "+25 this month",
          },
          {
            label: "Total Teachers",
            value: "35",
            icon: "👨‍🏫",
            color: "hsl(var(--accent))",
            change: "Active staff",
          },
          {
            label: "Active Exams",
            value: "8",
            icon: "📝",
            color: "#22c55e",
            change: "In progress",
          },
          {
            label: "Pending Approvals",
            value: "3",
            icon: "⏳",
            color: "#ef4444",
            change: "Needs review",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 16,
              padding: "20px",
              transition: "all 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${stat.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
              >
                {stat.icon}
              </div>
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "hsl(var(--foreground))",
                marginBottom: 4,
                letterSpacing: "-0.02em",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "hsl(var(--muted-foreground))",
                fontWeight: 500,
                marginBottom: 8,
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                fontSize: 12,
                color: stat.color,
                fontWeight: 600,
              }}
            >
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        {/* Pending Approvals */}
        <div
          style={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid hsl(var(--border))",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "hsl(var(--foreground))",
                  margin: "0 0 4px",
                }}
              >
                Pending Exam Approvals
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: "hsl(var(--muted-foreground))",
                  margin: 0,
                }}
              >
                Requires your review
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/exams/pending")}
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                border: "none",
                borderRadius: 10,
                padding: "10px 20px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              View All
            </button>
          </div>

          <div style={{ padding: "8px" }}>
            {pendingExams.map((exam) => (
              <div
                key={exam.id}
                style={{
                  padding: "16px",
                  margin: "8px",
                  background: "hsl(var(--secondary))",
                  borderRadius: 12,
                  border: "1px solid hsl(var(--border))",
                  cursor: "pointer",
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
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "hsl(var(--accent) / 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 20,
                    }}
                  >
                    ⏳
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "hsl(var(--foreground))",
                        marginBottom: 4,
                      }}
                    >
                      {exam.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "hsl(var(--muted-foreground))",
                      }}
                    >
                      By {exam.teacher} · {exam.date}
                    </div>
                  </div>
                  <button
                    style={{
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      border: "none",
                      borderRadius: 10,
                      padding: "10px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid hsl(var(--border))",
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "hsl(var(--foreground))",
                margin: "0 0 4px",
              }}
            >
              Quick Actions
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "hsl(var(--muted-foreground))",
                margin: 0,
              }}
            >
              Common tasks
            </p>
          </div>

          <div style={{ padding: "16px" }}>
            {[
              {
                label: "Manage Users",
                icon: "👥",
                color: "hsl(var(--primary))",
                action: () => navigate("/admin/users"),
              },
              {
                label: "View Analytics",
                icon: "📊",
                color: "#1b7fc4",
                action: () => navigate("/admin/analytics"),
              },
              {
                label: "System Logs",
                icon: "📋",
                color: "hsl(var(--accent))",
                action: () => navigate("/admin/logs"),
              },
              {
                label: "Settings",
                icon: "⚙️",
                color: "#9333ea",
                action: () => navigate("/admin/settings"),
              },
            ].map((action) => (
              <button
                key={action.label}
                onClick={action.action}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "hsl(var(--secondary))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12,
                  padding: "16px",
                  marginBottom: 12,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${action.color}10`;
                  e.currentTarget.style.borderColor = action.color;
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "hsl(var(--secondary))";
                  e.currentTarget.style.borderColor = "hsl(var(--border))";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `${action.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                  }}
                >
                  {action.icon}
                </div>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {action.label}
                  </div>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
