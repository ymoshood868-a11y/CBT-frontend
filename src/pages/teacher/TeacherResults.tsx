import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const results = [
  {
    id: 1,
    studentName: "James Anderson",
    studentId: "STU-2024-001",
    examName: "Mathematics Mid-Term Exam",
    subject: "Mathematics",
    class: "SS3A",
    score: 78,
    total: 100,
    percentage: 78,
    grade: "B",
    status: "passed",
    submittedAt: "Apr 28, 2026 11:30 AM",
  },
  {
    id: 2,
    studentName: "Sarah Johnson",
    studentId: "STU-2024-002",
    examName: "Mathematics Mid-Term Exam",
    subject: "Mathematics",
    class: "SS3A",
    score: 91,
    total: 100,
    percentage: 91,
    grade: "A",
    status: "passed",
    submittedAt: "Apr 28, 2026 11:25 AM",
  },
  {
    id: 3,
    studentName: "Michael Brown",
    studentId: "STU-2024-003",
    examName: "Mathematics Mid-Term Exam",
    subject: "Mathematics",
    class: "SS3A",
    score: 45,
    total: 100,
    percentage: 45,
    grade: "F",
    status: "failed",
    submittedAt: "Apr 28, 2026 11:28 AM",
  },
  {
    id: 4,
    studentName: "Emily Davis",
    studentId: "STU-2024-004",
    examName: "Chemistry Test",
    subject: "Chemistry",
    class: "SS3A",
    score: 85,
    total: 100,
    percentage: 85,
    grade: "A",
    status: "passed",
    submittedAt: "Apr 20, 2026 12:15 PM",
  },
  {
    id: 5,
    studentName: "David Wilson",
    studentId: "STU-2024-005",
    examName: "Chemistry Test",
    subject: "Chemistry",
    class: "SS3A",
    score: 72,
    total: 100,
    percentage: 72,
    grade: "B",
    status: "passed",
    submittedAt: "Apr 20, 2026 12:10 PM",
  },
];

export default function TeacherResults() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [filterExam, setFilterExam] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  const exams = Array.from(new Set(results.map((r) => r.examName)));

  const filteredResults = results.filter((r) => {
    const matchesSearch =
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExam = filterExam === "all" || r.examName === filterExam;
    const matchesStatus = filterStatus === "all" || r.status === filterStatus;
    return matchesSearch && matchesExam && matchesStatus;
  });

  const averageScore =
    filteredResults.length > 0
      ? (
          filteredResults.reduce((sum, r) => sum + r.percentage, 0) /
          filteredResults.length
        ).toFixed(1)
      : "0";

  const passRate =
    filteredResults.length > 0
      ? (
          (filteredResults.filter((r) => r.status === "passed").length /
            filteredResults.length) *
          100
        ).toFixed(0)
      : "0";

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
                Exam Results
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                View and manage student performance
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
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

              <button
                onClick={() => {
                  // Export results logic
                  alert("Exporting results...");
                }}
                style={{
                  background: "hsl(var(--primary-foreground))",
                  color: "hsl(var(--primary))",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                📊 Export Results
              </button>
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
            label: "Total Submissions",
            value: filteredResults.length.toString(),
            icon: "📝",
            color: "hsl(var(--primary))",
          },
          {
            label: "Average Score",
            value: `${averageScore}%`,
            icon: "📊",
            color: "hsl(var(--accent))",
          },
          {
            label: "Pass Rate",
            value: `${passRate}%`,
            icon: "✅",
            color: "#22c55e",
          },
          {
            label: "Failed",
            value: filteredResults
              .filter((r) => r.status === "failed")
              .length.toString(),
            icon: "❌",
            color: "#ef4444",
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

      {/* Filters */}
      <div
        style={{
          background: "hsl(var(--background))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          padding: "20px 24px",
          marginBottom: 16,
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search by student name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: 250,
            padding: "10px 16px",
            border: "1px solid hsl(var(--border))",
            borderRadius: 10,
            fontSize: 14,
            fontFamily: "inherit",
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
          }}
        />
        <select
          value={filterExam}
          onChange={(e) => setFilterExam(e.target.value)}
          style={{
            padding: "10px 16px",
            border: "1px solid hsl(var(--border))",
            borderRadius: 10,
            fontSize: 14,
            fontFamily: "inherit",
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            cursor: "pointer",
          }}
        >
          <option value="all">All Exams</option>
          {exams.map((exam) => (
            <option key={exam} value={exam}>
              {exam}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: "10px 16px",
            border: "1px solid hsl(var(--border))",
            borderRadius: 10,
            fontSize: 14,
            fontFamily: "inherit",
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            cursor: "pointer",
          }}
        >
          <option value="all">All Status</option>
          <option value="passed">Passed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Results Table */}
      <div
        style={{
          background: "hsl(var(--background))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "8px" }}>
          {filteredResults.length > 0 ? (
            filteredResults.map((result) => (
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
                onClick={() => navigate(`/teacher/results/${result.id}`)}
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
                        gap: 12,
                        marginBottom: 8,
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          background: "hsl(var(--primary) / 0.1)",
                          border: "2px solid hsl(var(--primary) / 0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "hsl(var(--primary))",
                          fontWeight: 700,
                          fontSize: 16,
                        }}
                      >
                        {result.studentName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3
                          style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: "hsl(var(--foreground))",
                            margin: "0 0 4px",
                          }}
                        >
                          {result.studentName}
                        </h3>
                        <div
                          style={{
                            fontSize: 12,
                            color: "hsl(var(--muted-foreground))",
                          }}
                        >
                          {result.studentId} · {result.examName}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 24,
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: 11,
                          color: "hsl(var(--muted-foreground))",
                          marginBottom: 4,
                        }}
                      >
                        Score
                      </div>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: "hsl(var(--foreground))",
                        }}
                      >
                        {result.score}/{result.total}
                      </div>
                    </div>

                    <div
                      style={{
                        width: 70,
                        height: 70,
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
                          fontSize: 20,
                          fontWeight: 800,
                          color:
                            result.status === "passed" ? "#22c55e" : "#ef4444",
                        }}
                      >
                        {result.percentage}%
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color:
                            result.status === "passed" ? "#22c55e" : "#ef4444",
                        }}
                      >
                        {result.grade}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/teacher/results/${result.id}`);
                      }}
                      style={{
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                        border: "none",
                        borderRadius: 8,
                        padding: "10px 16px",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      View Details
                    </button>
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
              <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                No Results Found
              </h3>
              <p style={{ fontSize: 14 }}>
                {searchTerm || filterExam !== "all" || filterStatus !== "all"
                  ? "Try adjusting your filters"
                  : "No exam results available yet"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
