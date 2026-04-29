import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const exams = [
  {
    id: 1,
    name: "Mathematics Mid-Term Exam",
    subject: "Mathematics",
    teacher: "Mr. Johnson",
    class: "SS3A",
    status: "approved",
    students: 45,
    date: "Apr 28, 2026",
    time: "10:00 AM",
  },
  {
    id: 2,
    name: "Physics Final Exam",
    subject: "Physics",
    teacher: "Dr. Williams",
    class: "SS3B",
    status: "pending",
    students: 52,
    date: "May 5, 2026",
    time: "9:00 AM",
  },
  {
    id: 3,
    name: "Chemistry Test",
    subject: "Chemistry",
    teacher: "Mrs. Davis",
    class: "SS3A",
    status: "approved",
    students: 45,
    date: "Apr 20, 2026",
    time: "11:00 AM",
  },
];

const statusConfig: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  approved: {
    bg: "rgba(34, 197, 94, 0.1)",
    text: "#22c55e",
    label: "Approved",
  },
  pending: { bg: "rgba(245, 158, 11, 0.1)", text: "#f59e0b", label: "Pending" },
  rejected: {
    bg: "rgba(239, 68, 68, 0.1)",
    text: "#ef4444",
    label: "Rejected",
  },
};

export default function AdminExams() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [filterStatus, setFilterStatus] = useState("all");

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

  const filteredExams =
    filterStatus === "all"
      ? exams
      : exams.filter((e) => e.status === filterStatus);

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
                Exam Management
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                Review and approve exams
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
            value: exams.length.toString(),
            icon: "📝",
            color: "hsl(var(--primary))",
          },
          {
            label: "Approved",
            value: exams
              .filter((e) => e.status === "approved")
              .length.toString(),
            icon: "✅",
            color: "#22c55e",
          },
          {
            label: "Pending",
            value: exams
              .filter((e) => e.status === "pending")
              .length.toString(),
            icon: "⏳",
            color: "#f59e0b",
          },
          {
            label: "Rejected",
            value: exams
              .filter((e) => e.status === "rejected")
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

      {/* Filter */}
      <div
        style={{
          background: "hsl(var(--background))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          padding: "16px 24px",
          marginBottom: 16,
          display: "flex",
          gap: 12,
        }}
      >
        {["all", "approved", "pending", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            style={{
              background:
                filterStatus === status
                  ? "hsl(var(--primary))"
                  : "hsl(var(--secondary))",
              color:
                filterStatus === status
                  ? "hsl(var(--primary-foreground))"
                  : "hsl(var(--foreground))",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              textTransform: "capitalize",
            }}
          >
            {status === "all" ? "All Exams" : status}
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
          {filteredExams.map((exam) => (
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
                      fontSize: 13,
                      color: "hsl(var(--muted-foreground))",
                      marginBottom: 12,
                    }}
                  >
                    {exam.subject} · {exam.class} · By {exam.teacher}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 12,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "hsl(var(--muted-foreground))",
                        }}
                      >
                        📅 Date
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "hsl(var(--foreground))",
                        }}
                      >
                        {exam.date}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "hsl(var(--muted-foreground))",
                        }}
                      >
                        ⏰ Time
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
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "hsl(var(--muted-foreground))",
                        }}
                      >
                        👥 Students
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
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginLeft: 16 }}>
                  {exam.status === "pending" && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Exam approved!");
                        }}
                        style={{
                          background: "#22c55e",
                          color: "#fff",
                          border: "none",
                          borderRadius: 8,
                          padding: "10px 16px",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Exam rejected!");
                        }}
                        style={{
                          background: "#ef4444",
                          color: "#fff",
                          border: "none",
                          borderRadius: 8,
                          padding: "10px 16px",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/exams/${exam.id}`);
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
          ))}
        </div>
      </div>
    </div>
  );
}
