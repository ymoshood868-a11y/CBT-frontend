import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const upcomingExams = [
  {
    id: 1,
    subject: "Mathematics",
    name: "Mathematics Mid-Term Exam",
    class: "SS3A",
    date: "2026-04-28",
    time: "10:00 AM",
    duration: "90 mins",
    questions: 50,
    status: "upcoming",
    code: "MAT-001",
    instructor: "Mr. Johnson",
    description: "Covers chapters 1-5: Algebra, Geometry, and Trigonometry",
  },
  {
    id: 2,
    subject: "English Language",
    name: "English Language Quiz",
    class: "SS3A",
    date: "2026-04-30",
    time: "9:00 AM",
    duration: "60 mins",
    questions: 40,
    status: "upcoming",
    code: "ENG-002",
    instructor: "Mrs. Smith",
    description: "Grammar, Comprehension, and Essay Writing",
  },
  {
    id: 3,
    subject: "Physics",
    name: "Physics Final Exam",
    class: "SS3B",
    date: "2026-05-02",
    time: "2:00 PM",
    duration: "120 mins",
    questions: 60,
    status: "upcoming",
    code: "PHY-003",
    instructor: "Dr. Williams",
    description: "Mechanics, Electricity, and Modern Physics",
  },
];

const completedExams = [
  {
    id: 4,
    subject: "Chemistry",
    name: "Chemistry Test",
    class: "SS3A",
    date: "2026-04-20",
    time: "10:00 AM",
    duration: "90 mins",
    questions: 50,
    status: "completed",
    code: "CHE-004",
    score: 78,
    grade: "B",
  },
  {
    id: 5,
    subject: "Biology",
    name: "Biology Mid-Term",
    class: "SS3A",
    date: "2026-04-18",
    time: "11:00 AM",
    duration: "90 mins",
    questions: 50,
    status: "completed",
    code: "BIO-005",
    score: 91,
    grade: "A",
  },
];

export function StudentExams() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">(
    "upcoming",
  );

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
          background:
            "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)",
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
            background: "hsl(var(--accent) / 0.2)",
            filter: "blur(60px)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h1
                style={{
                  color: "hsl(var(--primary-foreground))",
                  fontSize: 32,
                  fontWeight: 800,
                  margin: "0 0 8px",
                  letterSpacing: "-0.02em",
                }}
              >
                My Exams
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                View and take your scheduled exams
              </p>
            </div>

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
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Upcoming Exams",
            value: upcomingExams.length.toString(),
            icon: "📅",
            color: "hsl(var(--primary))",
          },
          {
            label: "Completed",
            value: completedExams.length.toString(),
            icon: "✅",
            color: "#22c55e",
          },
          {
            label: "Total Exams",
            value: (upcomingExams.length + completedExams.length).toString(),
            icon: "📝",
            color: "hsl(var(--accent))",
          },
          {
            label: "This Week",
            value: upcomingExams
              .filter((e) => {
                const examDate = new Date(e.date);
                const today = new Date();
                const weekFromNow = new Date(
                  today.getTime() + 7 * 24 * 60 * 60 * 1000,
                );
                return examDate >= today && examDate <= weekFromNow;
              })
              .length.toString(),
            icon: "⏰",
            color: "#1b7fc4",
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
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 24,
          borderBottom: "2px solid hsl(var(--border))",
        }}
      >
        {[
          {
            key: "upcoming" as const,
            label: "Upcoming Exams",
            count: upcomingExams.length,
          },
          {
            key: "completed" as const,
            label: "Completed Exams",
            count: completedExams.length,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              background: "none",
              border: "none",
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              color:
                activeTab === tab.key
                  ? "hsl(var(--primary))"
                  : "hsl(var(--muted-foreground))",
              borderBottom:
                activeTab === tab.key
                  ? "2px solid hsl(var(--primary))"
                  : "2px solid transparent",
              marginBottom: -2,
              transition: "all 0.2s",
              fontFamily: "inherit",
            }}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Exams List */}
      <div
        style={{
          background: "hsl(var(--background))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "8px" }}>
          {activeTab === "upcoming" ? (
            upcomingExams.length > 0 ? (
              upcomingExams.map((exam) => (
                <div
                  key={exam.id}
                  style={{
                    padding: "20px",
                    margin: "8px",
                    background: "hsl(var(--secondary))",
                    borderRadius: 12,
                    border: "1px solid hsl(var(--border))",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "hsl(var(--accent) / 0.1)";
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
                            fontSize: 18,
                            fontWeight: 700,
                            color: "hsl(var(--foreground))",
                            margin: 0,
                          }}
                        >
                          {exam.name}
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
                      <p
                        style={{
                          fontSize: 13,
                          color: "hsl(var(--muted-foreground))",
                          margin: "0 0 16px",
                        }}
                      >
                        {exam.description}
                      </p>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(150px, 1fr))",
                          gap: 12,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "hsl(var(--muted-foreground))",
                              marginBottom: 4,
                            }}
                          >
                            📅 Date
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "hsl(var(--foreground))",
                            }}
                          >
                            {new Date(exam.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "hsl(var(--muted-foreground))",
                              marginBottom: 4,
                            }}
                          >
                            ⏰ Time
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "hsl(var(--foreground))",
                            }}
                          >
                            {exam.time}
                          </div>
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "hsl(var(--muted-foreground))",
                              marginBottom: 4,
                            }}
                          >
                            ⏱️ Duration
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "hsl(var(--foreground))",
                            }}
                          >
                            {exam.duration}
                          </div>
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "hsl(var(--muted-foreground))",
                              marginBottom: 4,
                            }}
                          >
                            ❓ Questions
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "hsl(var(--foreground))",
                            }}
                          >
                            {exam.questions}
                          </div>
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "hsl(var(--muted-foreground))",
                              marginBottom: 4,
                            }}
                          >
                            👨‍🏫 Instructor
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "hsl(var(--foreground))",
                            }}
                          >
                            {exam.instructor}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/student/exams/${exam.id}/instructions`)
                      }
                      style={{
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                        border: "none",
                        borderRadius: 10,
                        padding: "12px 24px",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        marginLeft: 16,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      Start Exam →
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: "60px 20px",
                  textAlign: "center",
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                  No Upcoming Exams
                </h3>
                <p style={{ fontSize: 14 }}>
                  You don't have any scheduled exams at the moment.
                </p>
              </div>
            )
          ) : completedExams.length > 0 ? (
            completedExams.map((exam) => (
              <div
                key={exam.id}
                style={{
                  padding: "20px",
                  margin: "8px",
                  background: "hsl(var(--secondary))",
                  borderRadius: 12,
                  border: "1px solid hsl(var(--border))",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onClick={() => navigate(`/student/results/${exam.id}`)}
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
                    alignItems: "center",
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
                          fontSize: 18,
                          fontWeight: 700,
                          color: "hsl(var(--foreground))",
                          margin: 0,
                        }}
                      >
                        {exam.name}
                      </h3>
                      <span
                        style={{
                          background: "rgba(34, 197, 94, 0.1)",
                          color: "#22c55e",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: 6,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Completed
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "hsl(var(--muted-foreground))",
                      }}
                    >
                      {exam.subject} · {exam.date} · {exam.time}
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      marginLeft: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        background: "rgba(34, 197, 94, 0.1)",
                        border: "4px solid #22c55e",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 800,
                          color: "#22c55e",
                        }}
                      >
                        {exam.score}%
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#22c55e",
                        }}
                      >
                        {exam.grade}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                No Completed Exams
              </h3>
              <p style={{ fontSize: 14 }}>
                You haven't completed any exams yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
