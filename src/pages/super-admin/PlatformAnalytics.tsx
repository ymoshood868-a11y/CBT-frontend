import { useState, useEffect } from "react";

export default function PlatformAnalytics() {
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

  const platformStats = {
    totalSchools: 128,
    totalUsers: 45230,
    totalExams: 8542,
    totalRevenue: "₦12.4M",
    activeUsers: 12450,
    systemUptime: "99.8%",
  };

  const schoolGrowth = [
    { month: "Jan", schools: 95 },
    { month: "Feb", schools: 102 },
    { month: "Mar", schools: 108 },
    { month: "Apr", schools: 115 },
    { month: "May", schools: 120 },
    { month: "Jun", schools: 125 },
    { month: "Jul", schools: 128 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 8.2 },
    { month: "Feb", revenue: 9.1 },
    { month: "Mar", revenue: 9.8 },
    { month: "Apr", revenue: 10.5 },
    { month: "May", revenue: 11.2 },
    { month: "Jun", revenue: 11.8 },
    { month: "Jul", revenue: 12.4 },
  ];

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
                📊 Platform Analytics
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                System-wide performance and insights
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
                onClick={() => alert("Exporting analytics...")}
                style={{
                  background: "hsl(var(--accent))",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                📥 Export
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
            label: "Total Schools",
            value: platformStats.totalSchools,
            icon: "🏫",
            color: "hsl(var(--primary))",
            change: "+12 this month",
          },
          {
            label: "Total Users",
            value: platformStats.totalUsers.toLocaleString(),
            icon: "👥",
            color: "#3b82f6",
            change: "+2.3K this month",
          },
          {
            label: "Total Exams",
            value: platformStats.totalExams.toLocaleString(),
            icon: "📝",
            color: "#f59e0b",
            change: "+542 this month",
          },
          {
            label: "Total Revenue",
            value: platformStats.totalRevenue,
            icon: "💰",
            color: "hsl(var(--accent))",
            change: "+18% growth",
          },
          {
            label: "Active Users",
            value: platformStats.activeUsers.toLocaleString(),
            icon: "✅",
            color: "#22c55e",
            change: "27.5% of total",
          },
          {
            label: "System Uptime",
            value: platformStats.systemUptime,
            icon: "⚡",
            color: "#a855f7",
            change: "Last 30 days",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 12,
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
            <div style={{ fontSize: 32, marginBottom: 12 }}>{stat.icon}</div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: stat.color,
                marginBottom: 6,
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
                fontSize: 11,
                color: stat.color,
                fontWeight: 600,
              }}
            >
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* School Growth Chart */}
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
            🏫 School Growth
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
            {schoolGrowth.map((data) => (
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
                  {data.schools}
                </div>
                <div
                  style={{
                    width: "100%",
                    height: `${(data.schools / 128) * 150}px`,
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

        {/* Revenue Growth Chart */}
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
            💰 Revenue Growth (₦M)
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
            {revenueData.map((data) => (
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
                    color: "hsl(var(--accent))",
                  }}
                >
                  {data.revenue}
                </div>
                <div
                  style={{
                    width: "100%",
                    height: `${(data.revenue / 12.4) * 150}px`,
                    background:
                      "linear-gradient(180deg, hsl(var(--accent)), hsl(var(--accent) / 0.6))",
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
    </div>
  );
}
