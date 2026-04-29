import { useState, useEffect } from "react";

interface Subscription {
  id: number;
  schoolName: string;
  plan: "basic" | "premium" | "enterprise";
  amount: string;
  status: "active" | "expired" | "pending";
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentMethod: string;
}

const mockSubscriptions: Subscription[] = [
  {
    id: 1,
    schoolName: "Greenfield College",
    plan: "enterprise",
    amount: "₦2,400,000",
    status: "active",
    startDate: "Jan 15, 2025",
    endDate: "Jan 15, 2027",
    autoRenew: true,
    paymentMethod: "Bank Transfer",
  },
  {
    id: 2,
    schoolName: "Starlight Academy",
    plan: "premium",
    amount: "₦1,800,000",
    status: "active",
    startDate: "Feb 20, 2025",
    endDate: "Feb 20, 2026",
    autoRenew: true,
    paymentMethod: "Card",
  },
  {
    id: 3,
    schoolName: "Bright Future School",
    plan: "basic",
    amount: "₦450,000",
    status: "pending",
    startDate: "Apr 10, 2026",
    endDate: "May 10, 2026",
    autoRenew: false,
    paymentMethod: "Pending",
  },
  {
    id: 4,
    schoolName: "Excellence High School",
    plan: "premium",
    amount: "₦1,800,000",
    status: "expired",
    startDate: "Mar 5, 2025",
    endDate: "Mar 5, 2026",
    autoRenew: false,
    paymentMethod: "Bank Transfer",
  },
];

export default function BillingManagement() {
  const [subscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPlan, setFilterPlan] = useState<string>("all");

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

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesStatus = filterStatus === "all" || sub.status === filterStatus;
    const matchesPlan = filterPlan === "all" || sub.plan === filterPlan;
    return matchesStatus && matchesPlan;
  });

  const stats = {
    totalRevenue: "₦6.45M",
    activeSubscriptions: subscriptions.filter((s) => s.status === "active")
      .length,
    pendingPayments: subscriptions.filter((s) => s.status === "pending").length,
    expiringSoon: 2,
  };

  const planConfig: Record<
    string,
    { bg: string; text: string; price: string }
  > = {
    basic: {
      bg: "rgba(156, 163, 175, 0.1)",
      text: "#9ca3af",
      price: "₦450K/year",
    },
    premium: {
      bg: "rgba(59, 130, 246, 0.1)",
      text: "#3b82f6",
      price: "₦1.8M/year",
    },
    enterprise: {
      bg: "rgba(168, 85, 247, 0.1)",
      text: "#a855f7",
      price: "₦2.4M/year",
    },
  };

  const statusConfig: Record<string, { bg: string; text: string }> = {
    active: { bg: "rgba(34, 197, 94, 0.1)", text: "#22c55e" },
    pending: { bg: "rgba(245, 158, 11, 0.1)", text: "#f59e0b" },
    expired: { bg: "rgba(239, 68, 68, 0.1)", text: "#ef4444" },
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
                💳 Billing Management
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                Manage subscriptions and payments
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button
                onClick={() => alert("Exporting billing data...")}
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
            label: "Total Revenue",
            value: stats.totalRevenue,
            icon: "💰",
            color: "hsl(var(--accent))",
          },
          {
            label: "Active Subscriptions",
            value: stats.activeSubscriptions,
            icon: "✅",
            color: "#22c55e",
          },
          {
            label: "Pending Payments",
            value: stats.pendingPayments,
            icon: "⏳",
            color: "#f59e0b",
          },
          {
            label: "Expiring Soon",
            value: stats.expiringSoon,
            icon: "⚠️",
            color: "#ef4444",
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

      {/* Pricing Plans */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          marginBottom: 24,
        }}
      >
        {[
          {
            name: "Basic",
            price: "₦450K",
            period: "/year",
            features: [
              "Up to 100 users",
              "10 GB storage",
              "Basic support",
              "Email notifications",
            ],
            color: "#9ca3af",
          },
          {
            name: "Premium",
            price: "₦1.8M",
            period: "/year",
            features: [
              "Up to 500 users",
              "50 GB storage",
              "Priority support",
              "Advanced analytics",
              "Custom branding",
            ],
            color: "#3b82f6",
            popular: true,
          },
          {
            name: "Enterprise",
            price: "₦2.4M",
            period: "/year",
            features: [
              "Unlimited users",
              "Unlimited storage",
              "24/7 dedicated support",
              "Advanced analytics",
              "Custom branding",
              "API access",
              "White-label option",
            ],
            color: "#a855f7",
          },
        ].map((plan) => (
          <div
            key={plan.name}
            style={{
              background: "hsl(var(--background))",
              border: plan.popular
                ? "2px solid hsl(var(--primary))"
                : "1px solid hsl(var(--border))",
              borderRadius: 16,
              padding: 24,
              position: "relative",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {plan.popular && (
              <div
                style={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "4px 16px",
                  borderRadius: 100,
                  textTransform: "uppercase",
                }}
              >
                Most Popular
              </div>
            )}

            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: plan.color,
                marginBottom: 8,
              }}
            >
              {plan.name}
            </h3>
            <div style={{ marginBottom: 20 }}>
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: "hsl(var(--foreground))",
                }}
              >
                {plan.price}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                {plan.period}
              </span>
            </div>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 20px",
              }}
            >
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  style={{
                    fontSize: 13,
                    color: "hsl(var(--foreground))",
                    marginBottom: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ color: "#22c55e" }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}
      >
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
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="expired">Expired</option>
        </select>
        <select
          value={filterPlan}
          onChange={(e) => setFilterPlan(e.target.value)}
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
          <option value="all">All Plans</option>
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </div>

      {/* Subscriptions Table */}
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
                  School
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
                  Plan
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
                  Amount
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
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Period
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
                  Auto-Renew
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
              {filteredSubscriptions.map((sub) => (
                <tr
                  key={sub.id}
                  style={{ borderBottom: "1px solid hsl(var(--border))" }}
                >
                  <td
                    style={{
                      padding: "16px",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {sub.schoolName}
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span
                      style={{
                        background: planConfig[sub.plan].bg,
                        color: planConfig[sub.plan].text,
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 6,
                        textTransform: "uppercase",
                      }}
                    >
                      {sub.plan}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "hsl(var(--accent))",
                    }}
                  >
                    {sub.amount}
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span
                      style={{
                        background: statusConfig[sub.status].bg,
                        color: statusConfig[sub.status].text,
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 6,
                        textTransform: "uppercase",
                      }}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      fontSize: 13,
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    {sub.startDate} - {sub.endDate}
                  </td>
                  <td style={{ padding: "16px", textAlign: "center" }}>
                    <span
                      style={{
                        fontSize: 18,
                        color: sub.autoRenew ? "#22c55e" : "#9ca3af",
                      }}
                    >
                      {sub.autoRenew ? "✓" : "✗"}
                    </span>
                  </td>
                  <td style={{ padding: "16px", textAlign: "center" }}>
                    <button
                      onClick={() =>
                        alert(`Viewing details for ${sub.schoolName}`)
                      }
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
    </div>
  );
}
