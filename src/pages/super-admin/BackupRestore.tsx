import { useState, useEffect } from "react";

interface Backup {
  id: number;
  name: string;
  size: string;
  date: string;
  time: string;
  type: "automatic" | "manual";
  status: "completed" | "in_progress" | "failed";
}

const mockBackups: Backup[] = [
  {
    id: 1,
    name: "backup_20260428_143000.sql",
    size: "2.4 GB",
    date: "Apr 28, 2026",
    time: "2:30 PM",
    type: "automatic",
    status: "completed",
  },
  {
    id: 2,
    name: "backup_20260427_143000.sql",
    size: "2.3 GB",
    date: "Apr 27, 2026",
    time: "2:30 PM",
    type: "automatic",
    status: "completed",
  },
  {
    id: 3,
    name: "backup_manual_20260426.sql",
    size: "2.3 GB",
    date: "Apr 26, 2026",
    time: "10:15 AM",
    type: "manual",
    status: "completed",
  },
  {
    id: 4,
    name: "backup_20260426_143000.sql",
    size: "2.2 GB",
    date: "Apr 26, 2026",
    time: "2:30 PM",
    type: "automatic",
    status: "completed",
  },
  {
    id: 5,
    name: "backup_20260425_143000.sql",
    size: "2.2 GB",
    date: "Apr 25, 2026",
    time: "2:30 PM",
    type: "automatic",
    status: "failed",
  },
];

export default function BackupRestore() {
  const [backups, setBackups] = useState<Backup[]>(mockBackups);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

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

  const filteredBackups = backups.filter((backup) => {
    const matchesType = filterType === "all" || backup.type === filterType;
    const matchesStatus =
      filterStatus === "all" || backup.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const stats = {
    totalBackups: backups.length,
    totalSize: "11.4 GB",
    lastBackup: "2 hours ago",
    nextBackup: "In 22 hours",
  };

  const typeConfig: Record<string, { bg: string; text: string }> = {
    automatic: { bg: "rgba(59, 130, 246, 0.1)", text: "#3b82f6" },
    manual: { bg: "rgba(168, 85, 247, 0.1)", text: "#a855f7" },
  };

  const statusConfig: Record<
    string,
    { bg: string; text: string; icon: string }
  > = {
    completed: { bg: "rgba(34, 197, 94, 0.1)", text: "#22c55e", icon: "✅" },
    in_progress: { bg: "rgba(245, 158, 11, 0.1)", text: "#f59e0b", icon: "⏳" },
    failed: { bg: "rgba(239, 68, 68, 0.1)", text: "#ef4444", icon: "❌" },
  };

  const handleCreateBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      const newBackup: Backup = {
        id: backups.length + 1,
        name: `backup_manual_${new Date().toISOString().split("T")[0].replace(/-/g, "")}.sql`,
        size: "2.4 GB",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        type: "manual",
        status: "completed",
      };
      setBackups([newBackup, ...backups]);
      setIsBackingUp(false);
      alert("Backup created successfully!");
    }, 3000);
  };

  const handleRestoreBackup = (backup: Backup) => {
    if (
      confirm(
        `Are you sure you want to restore from "${backup.name}"? This will overwrite current data.`,
      )
    ) {
      alert("Restoring backup... This may take several minutes.");
    }
  };

  const handleDownloadBackup = (backup: Backup) => {
    alert(`Downloading ${backup.name}...`);
  };

  const handleDeleteBackup = (id: number) => {
    if (confirm("Are you sure you want to delete this backup?")) {
      setBackups(backups.filter((b) => b.id !== id));
      alert("Backup deleted successfully!");
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
                💾 Backup & Restore
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                Manage system backups and data recovery
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button
                onClick={handleCreateBackup}
                disabled={isBackingUp}
                style={{
                  background: isBackingUp
                    ? "hsl(var(--secondary))"
                    : "hsl(var(--accent))",
                  color: isBackingUp ? "hsl(var(--muted-foreground))" : "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: isBackingUp ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {isBackingUp ? "⏳ Creating..." : "💾 Create Backup"}
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
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Total Backups",
            value: stats.totalBackups,
            icon: "💾",
            color: "hsl(var(--primary))",
          },
          {
            label: "Total Size",
            value: stats.totalSize,
            icon: "📦",
            color: "#3b82f6",
          },
          {
            label: "Last Backup",
            value: stats.lastBackup,
            icon: "🕐",
            color: "#22c55e",
          },
          {
            label: "Next Backup",
            value: stats.nextBackup,
            icon: "⏰",
            color: "#f59e0b",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 12,
              padding: "20px",
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

      {/* Backup Schedule Info */}
      <div
        style={{
          background: "hsl(var(--accent) / 0.1)",
          border: "1px solid hsl(var(--accent) / 0.3)",
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 24 }}>⚙️</div>
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "hsl(var(--foreground))",
                marginBottom: 4,
              }}
            >
              Automatic Backup Schedule
            </div>
            <div
              style={{
                fontSize: 13,
                color: "hsl(var(--muted-foreground))",
              }}
            >
              Daily backups at 2:30 PM • Retention: 30 days • Storage: AWS S3
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div
        style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}
      >
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
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
          <option value="all">All Types</option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
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
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="in_progress">In Progress</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Backups Table */}
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
                  Backup Name
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
                  Size
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
                  Date & Time
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
                  Type
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
                  Status
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
              {filteredBackups.map((backup) => (
                <tr
                  key={backup.id}
                  style={{ borderBottom: "1px solid hsl(var(--border))" }}
                >
                  <td
                    style={{
                      padding: "16px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                      fontFamily: "monospace",
                    }}
                  >
                    {backup.name}
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    {backup.size}
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      fontSize: 13,
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    {backup.date} • {backup.time}
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span
                      style={{
                        background: typeConfig[backup.type].bg,
                        color: typeConfig[backup.type].text,
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 6,
                        textTransform: "uppercase",
                      }}
                    >
                      {backup.type}
                    </span>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span
                      style={{
                        background: statusConfig[backup.status].bg,
                        color: statusConfig[backup.status].text,
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
                      {statusConfig[backup.status].icon} {backup.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        justifyContent: "center",
                      }}
                    >
                      {backup.status === "completed" && (
                        <>
                          <button
                            onClick={() => handleRestoreBackup(backup)}
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
                            Restore
                          </button>
                          <button
                            onClick={() => handleDownloadBackup(backup)}
                            style={{
                              background: "hsl(var(--secondary))",
                              color: "hsl(var(--foreground))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: 6,
                              padding: "6px 12px",
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            Download
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDeleteBackup(backup.id)}
                        style={{
                          background: "#ef4444",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          padding: "6px 12px",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
