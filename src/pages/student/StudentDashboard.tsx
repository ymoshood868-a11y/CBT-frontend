import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useState, useEffect } from "react";

const upcomingExams = [
  {
    id: 1,
    subject: "Mathematics",
    class: "SS3A",
    date: "2026-04-28",
    time: "10:00 AM",
    duration: "90 mins",
    questions: 50,
    status: "upcoming",
    code: "MAT-001",
    instructor: "Mr. Johnson",
  },
  {
    id: 2,
    subject: "English Language",
    class: "SS3A",
    date: "2026-04-30",
    time: "9:00 AM",
    duration: "60 mins",
    questions: 40,
    status: "upcoming",
    code: "ENG-002",
    instructor: "Mrs. Smith",
  },
  {
    id: 3,
    subject: "Physics",
    class: "SS3A",
    date: "2026-05-02",
    time: "2:00 PM",
    duration: "120 mins",
    questions: 60,
    status: "upcoming",
    code: "PHY-003",
    instructor: "Dr. Williams",
  },
];

const recentResults = [
  {
    id: 1,
    subject: "Chemistry",
    score: 78,
    total: 100,
    grade: "B",
    date: "Apr 20, 2026",
    status: "passed",
  },
  {
    id: 2,
    subject: "Biology",
    score: 91,
    total: 100,
    grade: "A",
    date: "Apr 18, 2026",
    status: "passed",
  },
  {
    id: 3,
    subject: "Economics",
    score: 45,
    total: 100,
    grade: "F",
    date: "Apr 15, 2026",
    status: "failed",
  },
];

export function StudentDashboard() {
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
                Welcome to Your Dashboard
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                You have <strong>{upcomingExams.length} upcoming exams</strong>{" "}
                this week
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
            label: "Total Exams",
            value: "12",
            icon: "📝",
            color: "hsl(var(--primary))",
            change: "+2 this month",
          },
          {
            label: "Average Score",
            value: "74%",
            icon: "📊",
            color: "hsl(var(--accent))",
            change: "+5% from last",
          },
          {
            label: "Completed",
            value: "9",
            icon: "✅",
            color: "#22c55e",
            change: "75% completion",
          },
          {
            label: "Pending",
            value: "3",
            icon: "⏳",
            color: "#f59e0b",
            change: "Due this week",
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
        {/* Upcoming Exams */}
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
                Upcoming Exams
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: "hsl(var(--muted-foreground))",
                  margin: 0,
                }}
              >
                Your scheduled assessments
              </p>
            </div>
            <button
              onClick={() => navigate("/student/exams")}
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
            {upcomingExams.map((exam) => (
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
                        {exam.subject}
                      </h3>
                      <span
                        style={{
                          background: "hsl(var(--primary) / 0.1)",
                          color: "hsl(var(--primary))",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: 6,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {exam.code}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 12,
                        marginTop: 12,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontSize: 16 }}>📅</span>
                        <div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "hsl(var(--muted-foreground))",
                            }}
                          >
                            Date
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: "hsl(var(--foreground))",
                            }}
                          >
                            {new Date(exam.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontSize: 16 }}>⏰</span>
                        <div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "hsl(var(--muted-foreground))",
                            }}
                          >
                            Time
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: "hsl(var(--foreground))",
                            }}
                          >
                            {exam.time}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontSize: 16 }}>⏱️</span>
                        <div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "hsl(var(--muted-foreground))",
                            }}
                          >
                            Duration
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: "hsl(var(--foreground))",
                            }}
                          >
                            {exam.duration}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontSize: 16 }}>❓</span>
                        <div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "hsl(var(--muted-foreground))",
                            }}
                          >
                            Questions
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: "hsl(var(--foreground))",
                            }}
                          >
                            {exam.questions}
                          </div>
                        </div>
                      </div>
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
                      marginLeft: 16,
                    }}
                  >
                    Start →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Results */}
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
              Recent Results
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "hsl(var(--muted-foreground))",
                margin: 0,
              }}
            >
              Your latest scores
            </p>
          </div>

          <div style={{ padding: "8px" }}>
            {recentResults.map((result) => (
              <div
                key={result.id}
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
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "hsl(var(--secondary))";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background:
                        result.status === "passed"
                          ? "rgba(34, 197, 94, 0.1)"
                          : "rgba(239, 68, 68, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      fontWeight: 800,
                      color: result.status === "passed" ? "#22c55e" : "#ef4444",
                    }}
                  >
                    {result.grade}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "hsl(var(--foreground))",
                        marginBottom: 4,
                      }}
                    >
                      {result.subject}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "hsl(var(--muted-foreground))",
                      }}
                    >
                      {result.date}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color:
                          result.status === "passed" ? "#22c55e" : "#ef4444",
                      }}
                    >
                      {result.score}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: "16px",
              borderTop: "1px solid hsl(var(--border))",
            }}
          >
            <button
              onClick={() => navigate("/student/results")}
              style={{
                width: "100%",
                background: "hsl(var(--secondary))",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 10,
                padding: "12px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "hsl(var(--primary))";
                e.currentTarget.style.color = "hsl(var(--primary-foreground))";
                e.currentTarget.style.borderColor = "hsl(var(--primary))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "hsl(var(--secondary))";
                e.currentTarget.style.color = "hsl(var(--foreground))";
                e.currentTarget.style.borderColor = "hsl(var(--border))";
              }}
            >
              View All Results →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
