import { useState, useEffect } from "react";

interface AnalyticsData {
  passRate: number;
  averageScore: number;
  totalExams: number;
  totalStudents: number;
  subjectPerformance: {
    subject: string;
    averageScore: number;
    passRate: number;
    totalStudents: number;
  }[];
  recentActivity: {
    id: number;
    type: string;
    description: string;
    timestamp: string;
    user: string;
  }[];
}

const mockAnalytics: AnalyticsData = {
  passRate: 78.5,
  averageScore: 72.3,
  totalExams: 156,
  totalStudents: 450,
  subjectPerformance: [
    {
      subject: "Mathematics",
      averageScore: 75.2,
      passRate: 82,
      totalStudents: 120,
    },
    {
      subject: "English Language",
      averageScore: 78.5,
      passRate: 88,
      totalStudents: 120,
    },
    { subject: "Physics", averageScore: 68.3, passRate: 72, totalStudents: 95 },
    {
      subject: "Chemistry",
      averageScore: 71.8,
      passRate: 76,
      totalStudents: 95,
    },
    {
      subject: "Biology",
      averageScore: 73.5,
      passRate: 80,
      totalStudents: 100,
    },
    {
      subject: "Economics",
      averageScore: 76.2,
      passRate: 84,
      totalStudents: 85,
    },
    {
      subject: "Government",
      averageScore: 69.8,
      passRate: 74,
      totalStudents: 80,
    },
    {
      subject: "Literature",
      averageScore: 74.5,
      passRate: 79,
      totalStudents: 75,
    },
  ],
  recentActivity: [
    {
      id: 1,
      type: "exam_created",
      description: "Mathematics Mid-Term Exam created",
      timestamp: "2 hours ago",
      user: "Jane Teacher",
    },
    {
      id: 2,
      type: "exam_submitted",
      description: "John Doe submitted Physics Final Exam",
      timestamp: "3 hours ago",
      user: "John Doe",
    },
    {
      id: 3,
      type: "user_created",
      description: "New student Sarah Williams added",
      timestamp: "5 hours ago",
      user: "Admin User",
    },
    {
      id: 4,
      type: "exam_graded",
      description: "Chemistry Test graded for SS3A",
      timestamp: "6 hours ago",
      user: "Dr. Brown",
    },
    {
      id: 5,
      type: "exam_started",
      description: "Mike Johnson started English Language Quiz",
      timestamp: "8 hours ago",
      user: "Mike Johnson",
    },
  ],
};

export default function AnalyticsDashboard() {
  const [analytics] = useState<AnalyticsData>(mockAnalytics);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [selectedPeriod, setSelectedPeriod] = useState("this_month");

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

  const handleExport = () => {
    alert("Exporting analytics data to CSV...");
  };

  const activityIcons: Record<string, string> = {
    exam_created: "📝",
    exam_submitted: "✅",
    user_created: "👤",
    exam_graded: "📊",
    exam_started: "🚀",
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
                📊 Analytics Dashboard
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                Performance insights and system analytics
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "hsl(var(--primary-foreground))",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: 10,
                  padding: "10px 16px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <option value="today">Today</option>
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
                <option value="this_year">This Year</option>
              </select>
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
                📥 Export Data
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

      {/* Key Metrics */}
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
            label: "Overall Pass Rate",
            value: `${analytics.passRate}%`,
            icon: "✅",
            color: "#22c55e",
          },
          {
            label: "Average Score",
            value: `${analytics.averageScore}%`,
            icon: "📈",
            color: "#3b82f6",
          },
          {
            label: "Total Exams",
            value: analytics.totalExams,
            icon: "📝",
            color: "hsl(var(--primary))",
          },
          {
            label: "Total Students",
            value: analytics.totalStudents,
            icon: "👥",
            color: "#f59e0b",
          },
        ].map((metric) => (
          <div
            key={metric.label}
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
            <div style={{ fontSize: 36, marginBottom: 12 }}>{metric.icon}</div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: metric.color,
                marginBottom: 6,
              }}
            >
              {metric.value}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "hsl(var(--muted-foreground))",
                fontWeight: 500,
              }}
            >
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Subject Performance & Recent Activity */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 24,
          marginBottom: 24,
        }}
      >
        {/* Subject Performance */}
        <div
          style={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 20,
              color: "hsl(var(--foreground))",
            }}
          >
            📚 Subject Performance
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {analytics.subjectPerformance.map((subject) => (
              <div key={subject.subject}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {subject.subject}
                  </span>
                  <div style={{ display: "flex", gap: 16 }}>
                    <span
                      style={{
                        fontSize: 13,
                        color: "hsl(var(--muted-foreground))",
                      }}
                    >
                      Avg: {subject.averageScore}%
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: subject.passRate >= 75 ? "#22c55e" : "#f59e0b",
                        fontWeight: 600,
                      }}
                    >
                      Pass: {subject.passRate}%
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 8,
                    background: "hsl(var(--secondary))",
                    borderRadius: 100,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${subject.passRate}%`,
                      height: "100%",
                      background:
                        subject.passRate >= 75
                          ? "linear-gradient(90deg, #22c55e, #16a34a)"
                          : "linear-gradient(90deg, #f59e0b, #d97706)",
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div
          style={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 20,
              color: "hsl(var(--foreground))",
            }}
          >
            🔔 Recent Activity
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {analytics.recentActivity.map((activity) => (
              <div
                key={activity.id}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: 12,
                  background: "hsl(var(--secondary) / 0.5)",
                  borderRadius: 10,
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "hsl(var(--secondary) / 0.8)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "hsl(var(--secondary) / 0.5)";
                }}
              >
                <div style={{ fontSize: 24 }}>
                  {activityIcons[activity.type]}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                      marginBottom: 4,
                    }}
                  >
                    {activity.description}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    {activity.user} • {activity.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pass Rate Chart */}
      <div
        style={{
          background: "hsl(var(--background))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          padding: 24,
        }}
      >
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 20,
            color: "hsl(var(--foreground))",
          }}
        >
          📊 Pass Rate Trends
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 16,
            height: 200,
            padding: "20px 0",
          }}
        >
          {[
            { month: "Jan", rate: 72 },
            { month: "Feb", rate: 75 },
            { month: "Mar", rate: 78 },
            { month: "Apr", rate: 82 },
            { month: "May", rate: 79 },
            { month: "Jun", rate: 85 },
            { month: "Jul", rate: 88 },
            { month: "Aug", rate: 84 },
          ].map((data) => (
            <div
              key={data.month}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "hsl(var(--primary))",
                }}
              >
                {data.rate}%
              </div>
              <div
                style={{
                  width: "100%",
                  height: `${(data.rate / 100) * 150}px`,
                  background:
                    "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--primary) / 0.6))",
                  borderRadius: "8px 8px 0 0",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scaleY(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scaleY(1)";
                }}
              />
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                {data.month}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
