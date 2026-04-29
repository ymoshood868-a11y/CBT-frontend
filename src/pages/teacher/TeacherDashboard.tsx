import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useState, useEffect } from "react";

const recentExams = [
  {
    id: 1,
    name: "Mathematics Mid-Term Exam",
    subject: "Mathematics",
    class: "SS3A",
    status: "published",
    students: 45,
    completed: 38,
    date: "Apr 28, 2026",
    time: "10:00 AM",
  },
  {
    id: 2,
    name: "English Language Quiz",
    subject: "English Language",
    class: "SS3A",
    status: "draft",
    students: 0,
    completed: 0,
    date: "Not scheduled",
    time: "-",
  },
  {
    id: 3,
    name: "Physics Final Exam",
    subject: "Physics",
    class: "SS3B",
    status: "pending",
    students: 52,
    completed: 0,
    date: "May 5, 2026",
    time: "9:00 AM",
  },
];

const statusConfig: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  published: {
    bg: "rgba(34, 197, 94, 0.1)",
    text: "#22c55e",
    label: "Published",
  },
  draft: { bg: "rgba(156, 163, 175, 0.1)", text: "#9ca3af", label: "Draft" },
  pending: {
    bg: "rgba(245, 158, 11, 0.1)",
    text: "#f59e0b",
    label: "Pending Approval",
  },
};

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentTime, setCurrentTime] = useState(new Date());

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

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hour = currentTime.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div
      style={{
        fontFamily: "var(--font-inter)",
        background: "hsl(var(--background))",
        minHeight: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)",
          borderRadius: 16,
          padding: "32px",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255, 144, 1, 0.2)",
            filter: "blur(60px)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <div>
              <p
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 14,
                  margin: "0 0 8px",
                  fontWeight: 500,
                }}
              >
                {greeting}, {user?.first_name}! 👋
              </p>
              <h1
                style={{
                  color: "#fff",
                  fontSize: 32,
                  fontWeight: 800,
                  margin: "0 0 8px",
                  letterSpacing: "-0.02em",
                }}
              >
                Teacher Dashboard
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                Manage your exams and track student performance
              </p>
            </div>

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
                <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
              <div
                style={{
                  color: "#fff",
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
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
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

      {/* Stats */}
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
            label: "Total Exams",
            value: "12",
            icon: "📝",
            color: "#2d6a4f",
            change: "+3 this month",
          },
          {
            label: "Questions",
            value: "450",
            icon: "❓",
            color: "#1b7fc4",
            change: "In question bank",
          },
          {
            label: "Active Students",
            value: "145",
            icon: "👥",
            color: "#ff9001",
            change: "Across all classes",
          },
          {
            label: "Avg. Score",
            value: "74%",
            icon: "📊",
            color: "#22c55e",
            change: "+5% improvement",
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
            <div style={{ fontSize: 12, color: stat.color, fontWeight: 600 }}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        {/* Recent Exams */}
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
                Recent Exams
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: "hsl(var(--muted-foreground))",
                  margin: 0,
                }}
              >
                Your latest exam activities
              </p>
            </div>
            <button
              onClick={() => navigate("/teacher/exams")}
              style={{
                background: "#2d6a4f",
                color: "#fff",
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
            {recentExams.map((exam) => (
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
                  e.currentTarget.style.background = "rgba(45, 106, 79, 0.05)";
                  e.currentTarget.style.borderColor = "#2d6a4f";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "hsl(var(--secondary))";
                  e.currentTarget.style.borderColor = "hsl(var(--border))";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 8,
                      }}
                    >
                      <h3
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: "hsl(var(--foreground))",
                          margin: 0,
                        }}
                      >
                        {exam.name}
                      </h3>
                      <span
                        style={{
                          background: statusConfig[exam.status].bg,
                          color: statusConfig[exam.status].text,
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: 6,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {statusConfig[exam.status].label}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 12,
                        marginTop: 12,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "hsl(var(--muted-foreground))",
                          }}
                        >
                          Class
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "hsl(var(--foreground))",
                          }}
                        >
                          {exam.class}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "hsl(var(--muted-foreground))",
                          }}
                        >
                          Students
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "hsl(var(--foreground))",
                          }}
                        >
                          {exam.students}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "hsl(var(--muted-foreground))",
                          }}
                        >
                          Completed
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "hsl(var(--foreground))",
                          }}
                        >
                          {exam.completed}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    style={{
                      background: "#2d6a4f",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      padding: "10px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      marginLeft: 16,
                    }}
                  >
                    Manage
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
                label: "Create New Exam",
                icon: "➕",
                color: "#2d6a4f",
                action: () => navigate("/teacher/exams/create"),
              },
              {
                label: "Add Questions",
                icon: "📝",
                color: "#1b7fc4",
                action: () => navigate("/teacher/questions/create"),
              },
              {
                label: "View Results",
                icon: "📊",
                color: "#ff9001",
                action: () => navigate("/teacher/results"),
              },
              {
                label: "Manage Students",
                icon: "👥",
                color: "#9333ea",
                action: () => navigate("/teacher/students"),
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
