import { useState, useEffect } from "react";

interface SystemLog {
  id: number;
  timestamp: string;
  level: "info" | "warning" | "error" | "success";
  category: string;
  message: string;
  user: string;
  ipAddress: string;
  details?: string;
}

const mockLogs: SystemLog[] = [
  {
    id: 1,
    timestamp: "2026-04-28 14:32:15",
    level: "success",
    category: "Authentication",
    message: "User logged in successfully",
    user: "john.doe@school.com",
    ipAddress: "192.168.1.100",
    details: "Login from Chrome browser on Windows",
  },
  {
    id: 2,
    timestamp: "2026-04-28 14:30:42",
    level: "info",
    category: "Exam",
    message: "Exam session started",
    user: "jane.smith@school.com",
    ipAddress: "192.168.1.101",
    details: "Mathematics Mid-Term Exam - Session ID: 12345",
  },
  {
    id: 3,
    timestamp: "2026-04-28 14:28:19",
    level: "warning",
    category: "Security",
    message: "Multiple tab switches detected",
    user: "mike.johnson@school.com",
    ipAddress: "192.168.1.102",
    details: "Student switched tabs 5 times during exam",
  },
  {
    id: 4,
    timestamp: "2026-04-28 14:25:33",
    level: "error",
    category: "System",
    message: "Database connection timeout",
    user: "system",
    ipAddress: "127.0.0.1",
    details: "Connection to database server timed out after 30 seconds",
  },
  {
    id: 5,
    timestamp: "2026-04-28 14:22:08",
    level: "success",
    category: "Exam",
    message: "Exam submitted successfully",
    user: "sarah.williams@school.com",
    ipAddress: "192.168.1.103",
    details: "English Language Quiz - Score: 91/100",
  },
  {
    id: 6,
    timestamp: "2026-04-28 14:18:45",
    level: "info",
    category: "User Management",
    message: "New user created",
    user: "admin@school.com",
    ipAddress: "192.168.1.1",
    details: "Created student account: David Brown (SS3A/005)",
  },
  {
    id: 7,
    timestamp: "2026-04-28 14:15:22",
    level: "warning",
    category: "Security",
    message: "Failed login attempt",
    user: "unknown@test.com",
    ipAddress: "203.45.67.89",
    details: "Invalid credentials - 3rd attempt",
  },
  {
    id: 8,
    timestamp: "2026-04-28 14:12:56",
    level: "success",
    category: "Exam",
    message: "Exam created successfully",
    user: "teacher@school.com",
    ipAddress: "192.168.1.50",
    details: "Physics Final Exam - 60 questions, 120 minutes",
  },
  {
    id: 9,
    timestamp: "2026-04-28 14:10:31",
    level: "info",
    category: "System",
    message: "Backup completed",
    user: "system",
    ipAddress: "127.0.0.1",
    details: "Database backup saved to backup_20260428.sql",
  },
  {
    id: 10,
    timestamp: "2026-04-28 14:08:17",
    level: "error",
    category: "Exam",
    message: "Auto-save failed",
    user: "john.doe@school.com",
    ipAddress: "192.168.1.100",
    details: "Network error during auto-save - retrying...",
  },
];

export default function SystemLogs() {
  const [logs, setLogs] = useState<SystemLog[]>(mockLogs);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLog, setSelectedLog] = useState<SystemLog | null>(null);

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

  const filteredLogs = logs.filter((log) => {
    const matchesLevel = filterLevel === "all" || log.level === filterLevel;
    const matchesCategory =
      filterCategory === "all" || log.category === filterCategory;
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesCategory && matchesSearch;
  });

  const levelConfig: Record<
    string,
    { bg: string; text: string; icon: string }
  > = {
    info: { bg: "rgba(59, 130, 246, 0.1)", text: "#3b82f6", icon: "ℹ️" },
    success: { bg: "rgba(34, 197, 94, 0.1)", text: "#22c55e", icon: "✅" },
    warning: { bg: "rgba(245, 158, 11, 0.1)", text: "#f59e0b", icon: "⚠️" },
    error: { bg: "rgba(239, 68, 68, 0.1)", text: "#ef4444", icon: "❌" },
  };

  const stats = {
    total: logs.length,
    info: logs.filter((l) => l.level === "info").length,
    success: logs.filter((l) => l.level === "success").length,
    warning: logs.filter((l) => l.level === "warning").length,
    error: logs.filter((l) => l.level === "error").length,
  };

  const handleExport = () => {
    alert("Exporting system logs to CSV...");
  };

  const handleClearLogs = () => {
    if (confirm("Are you sure you want to clear all logs?")) {
      setLogs([]);
      alert("All logs cleared successfully!");
    }
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
                📋 System Logs
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                Monitor system activity and security events
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button
                onClick={handleExport}
                style={{
                  background: "hsl(var(--accent))",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                📥 Export Logs
              </button>
              <button
                onClick={handleClearLogs}
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                🗑️ Clear Logs
              </button>
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
            label: "Total Logs",
            value: stats.total,
            icon: "📋",
            color: "hsl(var(--primary))",
          },
          { label: "Info", value: stats.info, icon: "ℹ️", color: "#3b82f6" },
          {
            label: "Success",
            value: stats.success,
            icon: "✅",
            color: "#22c55e",
          },
          {
            label: "Warnings",
            value: stats.warning,
            icon: "⚠️",
            color: "#f59e0b",
          },
          { label: "Errors", value: stats.error, icon: "❌", color: "#ef4444" },
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
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
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

      {/* Filters */}
      <div
        style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}
      >
        <input
          type="text"
          placeholder="Search logs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            minWidth: 250,
            padding: "12px 16px",
            fontSize: 15,
            border: "1px solid hsl(var(--border))",
            borderRadius: 10,
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            fontFamily: "inherit",
          }}
        />
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          style={{
            padding: "12px 16px",
            fontSize: 15,
            border: "1px solid hsl(var(--border))",
            borderRadius: 10,
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          <option value="all">All Levels</option>
          <option value="info">Info</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{
            padding: "12px 16px",
            fontSize: 15,
            border: "1px solid hsl(var(--border))",
            borderRadius: 10,
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          <option value="all">All Categories</option>
          <option value="Authentication">Authentication</option>
          <option value="Exam">Exam</option>
          <option value="Security">Security</option>
          <option value="System">System</option>
          <option value="User Management">User Management</option>
        </select>
      </div>

      {/* Logs Table */}
      <div
        style={{
          background: "hsl(var(--background))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  background: "hsl(var(--secondary))",
                  borderBottom: "1px solid hsl(var(--border))",
                }}
              >
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Timestamp
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Level
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Category
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Message
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  User
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  IP Address
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  style={{ borderBottom: "1px solid hsl(var(--border))" }}
                >
                  <td
                    style={{
                      padding: "16px",
                      fontSize: 13,
                      color: "hsl(var(--muted-foreground))",
                      fontFamily: "monospace",
                    }}
                  >
                    {log.timestamp}
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span
                      style={{
                        background: levelConfig[log.level].bg,
                        color: levelConfig[log.level].text,
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 6,
                        textTransform: "uppercase",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {levelConfig[log.level].icon} {log.level}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {log.category}
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      fontSize: 14,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {log.message}
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      fontSize: 13,
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    {log.user}
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      fontSize: 13,
                      color: "hsl(var(--muted-foreground))",
                      fontFamily: "monospace",
                    }}
                  >
                    {log.ipAddress}
                  </td>
                  <td style={{ padding: "16px", textAlign: "center" }}>
                    <button
                      onClick={() => setSelectedLog(log)}
                      style={{
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                        border: "none",
                        borderRadius: 6,
                        padding: "6px 12px",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Details Dialog */}
      {selectedLog && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedLog(null)}
        >
          <div
            style={{
              background: "hsl(var(--background))",
              borderRadius: 16,
              padding: 32,
              width: "90%",
              maxWidth: 600,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 24,
                color: "hsl(var(--foreground))",
              }}
            >
              Log Details
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "hsl(var(--muted-foreground))",
                    marginBottom: 4,
                  }}
                >
                  TIMESTAMP
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "hsl(var(--foreground))",
                    fontFamily: "monospace",
                  }}
                >
                  {selectedLog.timestamp}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "hsl(var(--muted-foreground))",
                    marginBottom: 4,
                  }}
                >
                  LEVEL
                </div>
                <span
                  style={{
                    background: levelConfig[selectedLog.level].bg,
                    color: levelConfig[selectedLog.level].text,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 6,
                    textTransform: "uppercase",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {levelConfig[selectedLog.level].icon} {selectedLog.level}
                </span>
              </div>

              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "hsl(var(--muted-foreground))",
                    marginBottom: 4,
                  }}
                >
                  CATEGORY
                </div>
                <div style={{ fontSize: 14, color: "hsl(var(--foreground))" }}>
                  {selectedLog.category}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "hsl(var(--muted-foreground))",
                    marginBottom: 4,
                  }}
                >
                  MESSAGE
                </div>
                <div style={{ fontSize: 14, color: "hsl(var(--foreground))" }}>
                  {selectedLog.message}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "hsl(var(--muted-foreground))",
                    marginBottom: 4,
                  }}
                >
                  USER
                </div>
                <div style={{ fontSize: 14, color: "hsl(var(--foreground))" }}>
                  {selectedLog.user}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "hsl(var(--muted-foreground))",
                    marginBottom: 4,
                  }}
                >
                  IP ADDRESS
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "hsl(var(--foreground))",
                    fontFamily: "monospace",
                  }}
                >
                  {selectedLog.ipAddress}
                </div>
              </div>

              {selectedLog.details && (
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "hsl(var(--muted-foreground))",
                      marginBottom: 4,
                    }}
                  >
                    DETAILS
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "hsl(var(--foreground))",
                      background: "hsl(var(--secondary))",
                      padding: 12,
                      borderRadius: 8,
                    }}
                  >
                    {selectedLog.details}
                  </div>
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 24,
              }}
            >
              <button
                onClick={() => setSelectedLog(null)}
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
