import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const results = [
  {
    id: 1,
    examName: "Mathematics Mid-Term Exam",
    subject: "Mathematics",
    class: "SS3A",
    date: "Apr 20, 2026",
    score: 78,
    total: 100,
    percentage: 78,
    grade: "B",
    status: "passed",
    duration: "90 mins",
    questions: 50,
    correct: 39,
    wrong: 11,
  },
  {
    id: 2,
    examName: "English Language Quiz",
    subject: "English Language",
    class: "SS3A",
    date: "Apr 18, 2026",
    score: 91,
    total: 100,
    percentage: 91,
    grade: "A",
    status: "passed",
    duration: "60 mins",
    questions: 40,
    correct: 36,
    wrong: 4,
  },
  {
    id: 3,
    examName: "Physics Final Exam",
    subject: "Physics",
    class: "SS3A",
    date: "Apr 15, 2026",
    score: 45,
    total: 100,
    percentage: 45,
    grade: "F",
    status: "failed",
    duration: "120 mins",
    questions: 60,
    correct: 27,
    wrong: 33,
  },
  {
    id: 4,
    examName: "Chemistry Test",
    subject: "Chemistry",
    class: "SS3A",
    date: "Apr 12, 2026",
    score: 85,
    total: 100,
    percentage: 85,
    grade: "A",
    status: "passed",
    duration: "90 mins",
    questions: 50,
    correct: 42,
    wrong: 8,
  },
  {
    id: 5,
    examName: "Biology Mid-Term Exam",
    subject: "Biology",
    class: "SS3A",
    date: "Apr 10, 2026",
    score: 72,
    total: 100,
    percentage: 72,
    grade: "B",
    status: "passed",
    duration: "90 mins",
    questions: 50,
    correct: 36,
    wrong: 14,
  },
  {
    id: 6,
    examName: "Economics Quiz",
    subject: "Economics",
    class: "SS3A",
    date: "Apr 8, 2026",
    score: 88,
    total: 100,
    percentage: 88,
    grade: "A",
    status: "passed",
    duration: "60 mins",
    questions: 40,
    correct: 35,
    wrong: 5,
  },
  {
    id: 7,
    examName: "Government Final Exam",
    subject: "Government",
    class: "SS3A",
    date: "Apr 5, 2026",
    score: 65,
    total: 100,
    percentage: 65,
    grade: "C",
    status: "passed",
    duration: "90 mins",
    questions: 50,
    correct: 32,
    wrong: 18,
  },
  {
    id: 8,
    examName: "Literature in English Test",
    subject: "Literature",
    class: "SS3A",
    date: "Apr 3, 2026",
    score: 79,
    total: 100,
    percentage: 79,
    grade: "B",
    status: "passed",
    duration: "90 mins",
    questions: 50,
    correct: 39,
    wrong: 11,
  },
  {
    id: 9,
    examName: "Geography Mid-Term Exam",
    subject: "Geography",
    class: "SS3A",
    date: "Mar 30, 2026",
    score: 82,
    total: 100,
    percentage: 82,
    grade: "A",
    status: "passed",
    duration: "90 mins",
    questions: 50,
    correct: 41,
    wrong: 9,
  },
  {
    id: 10,
    examName: "Computer Science Quiz",
    subject: "Computer Science",
    class: "SS3A",
    date: "Mar 28, 2026",
    score: 95,
    total: 100,
    percentage: 95,
    grade: "A",
    status: "passed",
    duration: "60 mins",
    questions: 40,
    correct: 38,
    wrong: 2,
  },
  {
    id: 11,
    examName: "Agricultural Science Test",
    subject: "Agricultural Science",
    class: "SS3A",
    date: "Mar 25, 2026",
    score: 70,
    total: 100,
    percentage: 70,
    grade: "B",
    status: "passed",
    duration: "90 mins",
    questions: 50,
    correct: 35,
    wrong: 15,
  },
  {
    id: 12,
    examName: "Civic Education Quiz",
    subject: "Civic Education",
    class: "SS3A",
    date: "Mar 22, 2026",
    score: 86,
    total: 100,
    percentage: 86,
    grade: "A",
    status: "passed",
    duration: "60 mins",
    questions: 40,
    correct: 34,
    wrong: 6,
  },
  {
    id: 13,
    examName: "Further Mathematics Exam",
    subject: "Further Mathematics",
    class: "SS3A",
    date: "Mar 20, 2026",
    score: 58,
    total: 100,
    percentage: 58,
    grade: "C",
    status: "passed",
    duration: "120 mins",
    questions: 60,
    correct: 35,
    wrong: 25,
  },
  {
    id: 14,
    examName: "Technical Drawing Test",
    subject: "Technical Drawing",
    class: "SS3A",
    date: "Mar 18, 2026",
    score: 75,
    total: 100,
    percentage: 75,
    grade: "B",
    status: "passed",
    duration: "90 mins",
    questions: 50,
    correct: 37,
    wrong: 13,
  },
  {
    id: 15,
    examName: "Financial Accounting Quiz",
    subject: "Financial Accounting",
    class: "SS3A",
    date: "Mar 15, 2026",
    score: 81,
    total: 100,
    percentage: 81,
    grade: "A",
    status: "passed",
    duration: "90 mins",
    questions: 50,
    correct: 40,
    wrong: 10,
  },
];

export function StudentResults() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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

  const totalExams = results.length;
  const passedExams = results.filter((r) => r.status === "passed").length;
  const averageScore =
    results.reduce((sum, r) => sum + r.percentage, 0) / totalExams;

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
                My Results
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                View your exam performance and scores
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
            label: "Total Exams",
            value: totalExams.toString(),
            icon: "📝",
            color: "hsl(var(--primary))",
          },
          {
            label: "Passed",
            value: passedExams.toString(),
            icon: "✅",
            color: "#22c55e",
          },
          {
            label: "Average Score",
            value: `${averageScore.toFixed(1)}%`,
            icon: "📊",
            color: "hsl(var(--accent))",
          },
          {
            label: "Pass Rate",
            value: `${((passedExams / totalExams) * 100).toFixed(0)}%`,
            icon: "🎯",
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

      {/* Results List */}
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
            All Results
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "hsl(var(--muted-foreground))",
              margin: 0,
            }}
          >
            Your complete exam history
          </p>
        </div>

        <div style={{ padding: "8px" }}>
          {results.map((result) => (
            <div
              key={result.id}
              style={{
                padding: "20px",
                margin: "8px",
                background: "hsl(var(--secondary))",
                borderRadius: 12,
                border: "1px solid hsl(var(--border))",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onClick={() => navigate(`/student/results/${result.id}`)}
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
                  marginBottom: 16,
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
                      {result.examName}
                    </h3>
                    <span
                      style={{
                        background:
                          result.status === "passed"
                            ? "rgba(34, 197, 94, 0.1)"
                            : "rgba(239, 68, 68, 0.1)",
                        color:
                          result.status === "passed" ? "#22c55e" : "#ef4444",
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 6,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {result.status}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "hsl(var(--muted-foreground))",
                      marginBottom: 12,
                    }}
                  >
                    {result.subject} · {result.date}
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
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background:
                        result.status === "passed"
                          ? "rgba(34, 197, 94, 0.1)"
                          : "rgba(239, 68, 68, 0.1)",
                      border: `4px solid ${result.status === "passed" ? "#22c55e" : "#ef4444"}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 800,
                        color:
                          result.status === "passed" ? "#22c55e" : "#ef4444",
                      }}
                    >
                      {result.percentage}%
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color:
                          result.status === "passed" ? "#22c55e" : "#ef4444",
                      }}
                    >
                      {result.grade}
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 12,
                  paddingTop: 16,
                  borderTop: "1px solid hsl(var(--border))",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    Score
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {result.score}/{result.total}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    Correct
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#22c55e",
                    }}
                  >
                    {result.correct}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    Wrong
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#ef4444",
                    }}
                  >
                    {result.wrong}
                  </div>
                </div>
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
                      fontSize: 14,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {result.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
