import { BarChart3, Clock, TrendingUp, Activity } from "lucide-react";

export default function Overview() {
  return (
    <div style={{ fontFamily: "var(--font-inter)" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          Overview
        </h1>
        <p style={{ color: "hsl(var(--muted-foreground))" }}>
          Quick overview of your institution
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
          marginBottom: 32,
        }}
      >
        {[
          {
            icon: BarChart3,
            label: "Total Exams",
            value: "156",
            change: "+12%",
            color: "#3b82f6",
          },
          {
            icon: TrendingUp,
            label: "Pass Rate",
            value: "87%",
            change: "+5%",
            color: "#22c55e",
          },
          {
            icon: Clock,
            label: "Active Sessions",
            value: "23",
            change: "+8",
            color: "#f59e0b",
          },
          {
            icon: Activity,
            label: "System Health",
            value: "98%",
            change: "+2%",
            color: "#8b5cf6",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 16,
                padding: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
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
                  }}
                >
                  <Icon size={24} style={{ color: stat.color }} />
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 700 }}>
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: "#22c55e", fontWeight: 600 }}>
                {stat.change} from last month
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          padding: 24,
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
          Recent Activities
        </h2>
        <div style={{ display: "grid", gap: 12 }}>
          {[
            {
              action: "New exam created",
              user: "Mr. Johnson",
              time: "5 mins ago",
              type: "exam",
            },
            {
              action: "Student registered",
              user: "Admin",
              time: "15 mins ago",
              type: "user",
            },
            {
              action: "Results published",
              user: "Mrs. Davis",
              time: "1 hour ago",
              type: "result",
            },
            {
              action: "Exam approved",
              user: "Admin",
              time: "2 hours ago",
              type: "approval",
            },
          ].map((activity, i) => (
            <div
              key={i}
              style={{
                padding: 16,
                background: "hsl(var(--secondary))",
                borderRadius: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                  {activity.action}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "hsl(var(--muted-foreground))",
                  }}
                >
                  By {activity.user}
                </div>
              </div>
              <div
                style={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }}
              >
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
