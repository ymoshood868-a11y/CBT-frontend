import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface Student {
  id: number;
  name: string;
  admissionNo: string;
  status: "not_started" | "in_progress" | "submitted" | "paused";
  startedAt: string | null;
  submittedAt: string | null;
  timeRemaining: number; // in seconds
  progress: number; // percentage
  answeredQuestions: number;
  totalQuestions: number;
  flagged: boolean;
  suspiciousActivities: string[];
  lastActivity: string;
  tabSwitches: number;
  connectionStatus: "online" | "offline";
}

const mockStudents: Student[] = [
  {
    id: 1,
    name: "John Doe",
    admissionNo: "SS3A/001",
    status: "in_progress",
    startedAt: "10:00 AM",
    submittedAt: null,
    timeRemaining: 3600,
    progress: 45,
    answeredQuestions: 23,
    totalQuestions: 50,
    flagged: false,
    suspiciousActivities: [],
    lastActivity: "2 mins ago",
    tabSwitches: 0,
    connectionStatus: "online",
  },
  {
    id: 2,
    name: "Jane Smith",
    admissionNo: "SS3A/002",
    status: "in_progress",
    startedAt: "10:02 AM",
    submittedAt: null,
    timeRemaining: 3480,
    progress: 60,
    answeredQuestions: 30,
    totalQuestions: 50,
    flagged: true,
    suspiciousActivities: ["Tab switched 5 times", "Exited fullscreen"],
    lastActivity: "Just now",
    tabSwitches: 5,
    connectionStatus: "online",
  },
  {
    id: 3,
    name: "Mike Johnson",
    admissionNo: "SS3A/003",
    status: "not_started",
    startedAt: null,
    submittedAt: null,
    timeRemaining: 5400,
    progress: 0,
    answeredQuestions: 0,
    totalQuestions: 50,
    flagged: false,
    suspiciousActivities: [],
    lastActivity: "Never",
    tabSwitches: 0,
    connectionStatus: "offline",
  },
  {
    id: 4,
    name: "Sarah Williams",
    admissionNo: "SS3A/004",
    status: "submitted",
    startedAt: "10:00 AM",
    submittedAt: "10:45 AM",
    timeRemaining: 0,
    progress: 100,
    answeredQuestions: 50,
    totalQuestions: 50,
    flagged: false,
    suspiciousActivities: [],
    lastActivity: "15 mins ago",
    tabSwitches: 0,
    connectionStatus: "online",
  },
  {
    id: 5,
    name: "David Brown",
    admissionNo: "SS3A/005",
    status: "paused",
    startedAt: "10:05 AM",
    submittedAt: null,
    timeRemaining: 3300,
    progress: 30,
    answeredQuestions: 15,
    totalQuestions: 50,
    flagged: false,
    suspiciousActivities: ["Connection lost"],
    lastActivity: "5 mins ago",
    tabSwitches: 0,
    connectionStatus: "offline",
  },
];

export default function MonitorExam() {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [actionType, setActionType] = useState<
    "warning" | "pause" | "submit" | "flag" | null
  >(null);
  const [message, setMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const examInfo = {
    id: examId || "1",
    name: "Mathematics Mid-Term Exam",
    subject: "Mathematics",
    class: "SS3A",
    duration: 90,
    totalStudents: 45,
    startTime: "10:00 AM",
    endTime: "11:30 AM",
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStudents((prev) =>
        prev.map((student) => {
          if (student.status === "in_progress" && student.timeRemaining > 0) {
            return {
              ...student,
              timeRemaining: student.timeRemaining - 1,
            };
          }
          return student;
        }),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAction = (
    student: Student,
    action: "warning" | "pause" | "submit" | "flag",
  ) => {
    setSelectedStudent(student);
    setActionType(action);
    setShowActionDialog(true);
  };

  const executeAction = () => {
    if (!selectedStudent || !actionType) return;

    switch (actionType) {
      case "warning":
        alert(`Warning sent to ${selectedStudent.name}: ${message}`);
        break;
      case "pause":
        setStudents((prev) =>
          prev.map((s) =>
            s.id === selectedStudent.id
              ? { ...s, status: "paused" as const }
              : s,
          ),
        );
        alert(`Exam paused for ${selectedStudent.name}`);
        break;
      case "submit":
        if (
          confirm(
            `Are you sure you want to force submit for ${selectedStudent.name}?`,
          )
        ) {
          setStudents((prev) =>
            prev.map((s) =>
              s.id === selectedStudent.id
                ? {
                    ...s,
                    status: "submitted" as const,
                    submittedAt: new Date().toLocaleTimeString(),
                  }
                : s,
            ),
          );
          alert(`Exam submitted for ${selectedStudent.name}`);
        }
        break;
      case "flag":
        setStudents((prev) =>
          prev.map((s) =>
            s.id === selectedStudent.id ? { ...s, flagged: !s.flagged } : s,
          ),
        );
        alert(
          `${selectedStudent.name} ${selectedStudent.flagged ? "unflagged" : "flagged"}`,
        );
        break;
    }

    setShowActionDialog(false);
    setMessage("");
    setSelectedStudent(null);
    setActionType(null);
  };

  const filteredStudents = students.filter((s) => {
    if (filterStatus === "all") return true;
    return s.status === filterStatus;
  });

  const stats = {
    total: students.length,
    notStarted: students.filter((s) => s.status === "not_started").length,
    inProgress: students.filter((s) => s.status === "in_progress").length,
    submitted: students.filter((s) => s.status === "submitted").length,
    paused: students.filter((s) => s.status === "paused").length,
    flagged: students.filter((s) => s.flagged).length,
  };

  const statusConfig: Record<
    string,
    { bg: string; text: string; label: string }
  > = {
    not_started: {
      bg: "rgba(156, 163, 175, 0.1)",
      text: "#9ca3af",
      label: "Not Started",
    },
    in_progress: {
      bg: "rgba(34, 197, 94, 0.1)",
      text: "#22c55e",
      label: "In Progress",
    },
    submitted: {
      bg: "rgba(59, 130, 246, 0.1)",
      text: "#3b82f6",
      label: "Submitted",
    },
    paused: { bg: "rgba(245, 158, 11, 0.1)", text: "#f59e0b", label: "Paused" },
  };

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
              alignItems: "start",
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
                🎥 Live Exam Monitoring
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: "0 0 16px",
                }}
              >
                {examInfo.name} • {examInfo.class} • {examInfo.startTime} -{" "}
                {examInfo.endTime}
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>👥</span>
                  <span
                    style={{
                      color: "hsl(var(--primary-foreground))",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {stats.total} Students
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>✅</span>
                  <span
                    style={{
                      color: "hsl(var(--primary-foreground))",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {stats.submitted} Submitted
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>⏳</span>
                  <span
                    style={{
                      color: "hsl(var(--primary-foreground))",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {stats.inProgress} In Progress
                  </span>
                </div>
                {stats.flagged > 0 && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span style={{ fontSize: 20 }}>🚩</span>
                    <span
                      style={{
                        color: "#ef4444",
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      {stats.flagged} Flagged
                    </span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => navigate("/invigilator/dashboard")}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "hsl(var(--primary-foreground))",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: 10,
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Total",
            value: stats.total,
            icon: "👥",
            color: "hsl(var(--primary))",
          },
          {
            label: "Not Started",
            value: stats.notStarted,
            icon: "⏸️",
            color: "#9ca3af",
          },
          {
            label: "In Progress",
            value: stats.inProgress,
            icon: "⏳",
            color: "#22c55e",
          },
          {
            label: "Submitted",
            value: stats.submitted,
            icon: "✅",
            color: "#3b82f6",
          },
          {
            label: "Paused",
            value: stats.paused,
            icon: "⏯️",
            color: "#f59e0b",
          },
          {
            label: "Flagged",
            value: stats.flagged,
            icon: "🚩",
            color: "#ef4444",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 12,
              padding: "16px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() =>
              setFilterStatus(
                stat.label === "Total"
                  ? "all"
                  : stat.label.toLowerCase().replace(" ", "_"),
              )
            }
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>{stat.icon}</div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: stat.color,
                marginBottom: 4,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "hsl(var(--muted-foreground))",
                fontWeight: 500,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 24,
          borderBottom: "2px solid hsl(var(--border))",
        }}
      >
        {[
          { key: "all", label: "All Students", count: stats.total },
          { key: "in_progress", label: "In Progress", count: stats.inProgress },
          { key: "not_started", label: "Not Started", count: stats.notStarted },
          { key: "submitted", label: "Submitted", count: stats.submitted },
          { key: "paused", label: "Paused", count: stats.paused },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key)}
            style={{
              background: "none",
              border: "none",
              padding: "12px 20px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              color:
                filterStatus === tab.key
                  ? "hsl(var(--primary))"
                  : "hsl(var(--muted-foreground))",
              borderBottom:
                filterStatus === tab.key
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

      {/* Students List */}
      <div
        style={{
          background: "hsl(var(--background))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "8px" }}>
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              style={{
                padding: "20px",
                margin: "8px",
                background: student.flagged
                  ? "rgba(239, 68, 68, 0.05)"
                  : "hsl(var(--secondary))",
                border: `1px solid ${student.flagged ? "#ef4444" : "hsl(var(--border))"}`,
                borderRadius: 12,
                transition: "all 0.2s",
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
                      gap: 12,
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
                      {student.name}
                    </h3>
                    <span
                      style={{
                        fontSize: 13,
                        color: "hsl(var(--muted-foreground))",
                      }}
                    >
                      {student.admissionNo}
                    </span>
                    <span
                      style={{
                        background: statusConfig[student.status].bg,
                        color: statusConfig[student.status].text,
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 6,
                        textTransform: "uppercase",
                      }}
                    >
                      {statusConfig[student.status].label}
                    </span>
                    {student.flagged && (
                      <span style={{ fontSize: 16 }}>🚩</span>
                    )}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background:
                          student.connectionStatus === "online"
                            ? "rgba(34, 197, 94, 0.1)"
                            : "rgba(239, 68, 68, 0.1)",
                        border: `1px solid ${student.connectionStatus === "online" ? "#22c55e" : "#ef4444"}`,
                        borderRadius: 100,
                        padding: "4px 10px",
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background:
                            student.connectionStatus === "online"
                              ? "#22c55e"
                              : "#ef4444",
                        }}
                      />
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color:
                            student.connectionStatus === "online"
                              ? "#22c55e"
                              : "#ef4444",
                        }}
                      >
                        {student.connectionStatus}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(150px, 1fr))",
                      gap: 16,
                      marginBottom: 12,
                    }}
                  >
                    {student.status !== "not_started" && (
                      <>
                        <div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "hsl(var(--muted-foreground))",
                              marginBottom: 4,
                            }}
                          >
                            Time Remaining
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color:
                                student.timeRemaining < 600
                                  ? "#ef4444"
                                  : "hsl(var(--foreground))",
                            }}
                          >
                            {formatTime(student.timeRemaining)}
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
                            Progress
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "hsl(var(--foreground))",
                            }}
                          >
                            {student.answeredQuestions}/{student.totalQuestions}{" "}
                            ({student.progress}%)
                          </div>
                        </div>
                      </>
                    )}
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "hsl(var(--muted-foreground))",
                          marginBottom: 4,
                        }}
                      >
                        Started At
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "hsl(var(--foreground))",
                        }}
                      >
                        {student.startedAt || "Not started"}
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
                        Last Activity
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "hsl(var(--foreground))",
                        }}
                      >
                        {student.lastActivity}
                      </div>
                    </div>
                    {student.tabSwitches > 0 && (
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "hsl(var(--muted-foreground))",
                            marginBottom: 4,
                          }}
                        >
                          Tab Switches
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#ef4444",
                          }}
                        >
                          {student.tabSwitches}
                        </div>
                      </div>
                    )}
                  </div>

                  {student.suspiciousActivities.length > 0 && (
                    <div
                      style={{
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid #ef4444",
                        borderRadius: 8,
                        padding: "12px",
                        marginTop: 12,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#ef4444",
                          marginBottom: 8,
                        }}
                      >
                        ⚠️ Suspicious Activities:
                      </div>
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: 20,
                          color: "#ef4444",
                          fontSize: 12,
                        }}
                      >
                        {student.suspiciousActivities.map((activity, index) => (
                          <li key={index}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    marginLeft: 16,
                  }}
                >
                  <button
                    onClick={() => handleAction(student, "warning")}
                    disabled={student.status === "submitted"}
                    style={{
                      background: "#f59e0b",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor:
                        student.status === "submitted"
                          ? "not-allowed"
                          : "pointer",
                      opacity: student.status === "submitted" ? 0.5 : 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ⚠️ Send Warning
                  </button>
                  <button
                    onClick={() => handleAction(student, "pause")}
                    disabled={student.status !== "in_progress"}
                    style={{
                      background: "#3b82f6",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor:
                        student.status !== "in_progress"
                          ? "not-allowed"
                          : "pointer",
                      opacity: student.status !== "in_progress" ? 0.5 : 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ⏸️ Pause Exam
                  </button>
                  <button
                    onClick={() => handleAction(student, "submit")}
                    disabled={
                      student.status === "submitted" ||
                      student.status === "not_started"
                    }
                    style={{
                      background: "#ef4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor:
                        student.status === "submitted" ||
                        student.status === "not_started"
                          ? "not-allowed"
                          : "pointer",
                      opacity:
                        student.status === "submitted" ||
                        student.status === "not_started"
                          ? 0.5
                          : 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    🛑 Force Submit
                  </button>
                  <button
                    onClick={() => handleAction(student, "flag")}
                    style={{
                      background: student.flagged
                        ? "#22c55e"
                        : "hsl(var(--secondary))",
                      color: student.flagged
                        ? "#fff"
                        : "hsl(var(--foreground))",
                      border: `1px solid ${student.flagged ? "#22c55e" : "hsl(var(--border))"}`,
                      borderRadius: 8,
                      padding: "8px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {student.flagged ? "✓ Flagged" : "🚩 Flag"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Dialog */}
      {showActionDialog && selectedStudent && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "hsl(var(--background))",
              borderRadius: 16,
              padding: "32px",
              maxWidth: 500,
              width: "90%",
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 800,
                marginBottom: 16,
                color: "hsl(var(--foreground))",
              }}
            >
              {actionType === "warning" && "⚠️ Send Warning"}
              {actionType === "pause" && "⏸️ Pause Exam"}
              {actionType === "submit" && "🛑 Force Submit"}
              {actionType === "flag" && "🚩 Flag Student"}
            </h2>
            <p
              style={{
                fontSize: 15,
                marginBottom: 24,
                color: "hsl(var(--muted-foreground))",
              }}
            >
              Student: <strong>{selectedStudent.name}</strong> (
              {selectedStudent.admissionNo})
            </p>

            {actionType === "warning" && (
              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Warning Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter warning message..."
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: 15,
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 10,
                    background: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
              </div>
            )}

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => {
                  setShowActionDialog(false);
                  setMessage("");
                  setSelectedStudent(null);
                  setActionType(null);
                }}
                style={{
                  flex: 1,
                  background: "hsl(var(--secondary))",
                  color: "hsl(var(--foreground))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 10,
                  padding: "12px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={executeAction}
                disabled={actionType === "warning" && !message}
                style={{
                  flex: 1,
                  background:
                    actionType === "submit" ? "#ef4444" : "hsl(var(--primary))",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor:
                    actionType === "warning" && !message
                      ? "not-allowed"
                      : "pointer",
                  opacity: actionType === "warning" && !message ? 0.5 : 1,
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
