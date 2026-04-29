import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useState, useEffect } from "react";

const schools = [
  {
    id: 1,
    name: "Greenfield College",
    status: "Active",
    users: 320,
    exams: 45,
    revenue: "₦2.4M",
  },
  {
    id: 2,
    name: "Starlight Academy",
    status: "Active",
    users: 210,
    exams: 32,
    revenue: "₦1.8M",
  },
  {
    id: 3,
    name: "Bright Future School",
    status: "Inactive",
    users: 0,
    exams: 0,
    revenue: "₦0",
  },
];

export default function SuperDashboard() {
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
                Super Admin Dashboard
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                Managing <strong>{schools.length} schools</strong> across the
                platform
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
            label: "Total Schools",
            value: "128",
            icon: "🏫",
            color: "hsl(var(--primary))",
            change: "+12 this month",
          },
          {
            label: "Active Exams",
            value: "42",
            icon: "📝",
            color: "#1b7fc4",
            change: "Across platform",
          },
          {
            label: "Revenue (₦)",
            value: "12.4M",
            icon: "💰",
            color: "hsl(var(--accent))",
            change: "+18% from last month",
          },
          {
            label: "System Health",
            value: "98%",
            icon: "✅",
            color: "#22c55e",
            change: "All systems operational",
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
        {/* School Health */}
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
                School Health
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: "hsl(var(--muted-foreground))",
                  margin: 0,
                }}
              >
                Active schools overview
              </p>
            </div>
            <button
              onClick={() => navigate("/super-admin/schools")}
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
            {schools.map((school) => (
              <div
                key={school.id}
                style={{
                  padding: "16px",
                  margin: "8px",
                  background: "hsl(var(--secondary))",
                  borderRadius: 12,
                  border: "1px solid hsl(var(--border))",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onClick={() => navigate(`/super-admin/schools/${school.id}`)}
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
                        {school.name}
                      </h3>
                      <span
                        style={{
                          background:
                            school.status === "Active"
                              ? "rgba(34, 197, 94, 0.1)"
                              : "rgba(156, 163, 175, 0.1)",
                          color:
                            school.status === "Active" ? "#22c55e" : "#9ca3af",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: 6,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {school.status}
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
                          Users
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "hsl(var(--foreground))",
                          }}
                        >
                          {school.users}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "hsl(var(--muted-foreground))",
                          }}
                        >
                          Exams
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "hsl(var(--foreground))",
                          }}
                        >
                          {school.exams}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "hsl(var(--muted-foreground))",
                          }}
                        >
                          Revenue
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "hsl(var(--foreground))",
                          }}
                        >
                          {school.revenue}
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
              Platform management
            </p>
          </div>

          <div style={{ padding: "16px" }}>
            {[
              {
                label: "Manage Schools",
                icon: "🏫",
                color: "hsl(var(--primary))",
                action: () => navigate("/super-admin/schools"),
              },
              {
                label: "System Config",
                icon: "⚙️",
                color: "#1b7fc4",
                action: () => navigate("/super-admin/configuration"),
              },
              {
                label: "Billing",
                icon: "💳",
                color: "hsl(var(--accent))",
                action: () => navigate("/super-admin/billing"),
              },
              {
                label: "Analytics",
                icon: "📊",
                color: "#22c55e",
                action: () => navigate("/super-admin/analytics"),
              },
              {
                label: "Audit Logs",
                icon: "📋",
                color: "#9333ea",
                action: () => navigate("/super-admin/audit-logs"),
              },
              {
                label: "Backup & Restore",
                icon: "💾",
                color: "#ef4444",
                action: () => navigate("/super-admin/backup"),
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
