import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface School {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  plan: "basic" | "premium" | "enterprise";
  status: "active" | "suspended" | "trial";
  users: number;
  exams: number;
  revenue: string;
  joinedDate: string;
  expiryDate: string;
}

const mockSchools: School[] = [
  {
    id: 1,
    name: "Greenfield College",
    email: "admin@greenfield.edu",
    phone: "+234 801 234 5678",
    address: "123 Education Road, Lagos",
    plan: "enterprise",
    status: "active",
    users: 320,
    exams: 45,
    revenue: "₦2.4M",
    joinedDate: "Jan 15, 2025",
    expiryDate: "Jan 15, 2027",
  },
  {
    id: 2,
    name: "Starlight Academy",
    email: "info@starlight.edu",
    phone: "+234 802 345 6789",
    address: "456 Learning Street, Abuja",
    plan: "premium",
    status: "active",
    users: 210,
    exams: 32,
    revenue: "₦1.8M",
    joinedDate: "Feb 20, 2025",
    expiryDate: "Feb 20, 2026",
  },
  {
    id: 3,
    name: "Bright Future School",
    email: "contact@brightfuture.edu",
    phone: "+234 803 456 7890",
    address: "789 Knowledge Avenue, Port Harcourt",
    plan: "basic",
    status: "trial",
    users: 85,
    exams: 12,
    revenue: "₦450K",
    joinedDate: "Apr 10, 2026",
    expiryDate: "May 10, 2026",
  },
  {
    id: 4,
    name: "Excellence High School",
    email: "admin@excellence.edu",
    phone: "+234 804 567 8901",
    address: "321 Scholar Road, Kano",
    plan: "premium",
    status: "suspended",
    users: 0,
    exams: 0,
    revenue: "₦0",
    joinedDate: "Mar 5, 2025",
    expiryDate: "Mar 5, 2026",
  },
];

export default function SchoolManagement() {
  const navigate = useNavigate();
  const [schools, setSchools] = useState<School[]>(mockSchools);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPlan, setFilterPlan] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSchoolDialog, setShowSchoolDialog] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);

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

  const filteredSchools = schools.filter((school) => {
    const matchesStatus =
      filterStatus === "all" || school.status === filterStatus;
    const matchesPlan = filterPlan === "all" || school.plan === filterPlan;
    const matchesSearch =
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPlan && matchesSearch;
  });

  const stats = {
    total: schools.length,
    active: schools.filter((s) => s.status === "active").length,
    trial: schools.filter((s) => s.status === "trial").length,
    suspended: schools.filter((s) => s.status === "suspended").length,
    totalRevenue: "₦4.65M",
  };

  const planConfig: Record<string, { bg: string; text: string }> = {
    basic: { bg: "rgba(156, 163, 175, 0.1)", text: "#9ca3af" },
    premium: { bg: "rgba(59, 130, 246, 0.1)", text: "#3b82f6" },
    enterprise: { bg: "rgba(168, 85, 247, 0.1)", text: "#a855f7" },
  };

  const statusConfig: Record<string, { bg: string; text: string }> = {
    active: { bg: "rgba(34, 197, 94, 0.1)", text: "#22c55e" },
    trial: { bg: "rgba(245, 158, 11, 0.1)", text: "#f59e0b" },
    suspended: { bg: "rgba(239, 68, 68, 0.1)", text: "#ef4444" },
  };

  const handleAddSchool = () => {
    setEditingSchool(null);
    setShowSchoolDialog(true);
  };

  const handleEditSchool = (school: School) => {
    setEditingSchool(school);
    setShowSchoolDialog(true);
  };

  const handleSuspendSchool = (id: number) => {
    if (confirm("Are you sure you want to suspend this school?")) {
      setSchools(
        schools.map((s) =>
          s.id === id ? { ...s, status: "suspended" as const } : s,
        ),
      );
      alert("School suspended successfully!");
    }
  };

  const handleActivateSchool = (id: number) => {
    setSchools(
      schools.map((s) =>
        s.id === id ? { ...s, status: "active" as const } : s,
      ),
    );
    alert("School activated successfully!");
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
                🏫 School Management
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                Manage schools and organizations
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button
                onClick={handleAddSchool}
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
                <span style={{ fontSize: 18 }}>+</span> Add School
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
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Total Schools",
            value: stats.total,
            icon: "🏫",
            color: "hsl(var(--primary))",
          },
          {
            label: "Active",
            value: stats.active,
            icon: "✅",
            color: "#22c55e",
          },
          {
            label: "Trial",
            value: stats.trial,
            icon: "⏳",
            color: "#f59e0b",
          },
          {
            label: "Suspended",
            value: stats.suspended,
            icon: "⛔",
            color: "#ef4444",
          },
          {
            label: "Total Revenue",
            value: stats.totalRevenue,
            icon: "💰",
            color: "hsl(var(--accent))",
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
          placeholder="Search schools..."
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
          <option value="trial">Trial</option>
          <option value="suspended">Suspended</option>
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

      {/* Schools Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
          gap: 20,
        }}
      >
        {filteredSchools.map((school) => (
          <div
            key={school.id}
            style={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 16,
              padding: 24,
              transition: "all 0.2s",
              cursor: "pointer",
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: 16,
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                    margin: "0 0 8px",
                  }}
                >
                  {school.name}
                </h3>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span
                    style={{
                      background: statusConfig[school.status].bg,
                      color: statusConfig[school.status].text,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "4px 8px",
                      borderRadius: 6,
                      textTransform: "uppercase",
                    }}
                  >
                    {school.status}
                  </span>
                  <span
                    style={{
                      background: planConfig[school.plan].bg,
                      color: planConfig[school.plan].text,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "4px 8px",
                      borderRadius: 6,
                      textTransform: "uppercase",
                    }}
                  >
                    {school.plan}
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "hsl(var(--primary) / 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
              >
                🏫
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginBottom: 16,
                paddingBottom: 16,
                borderBottom: "1px solid hsl(var(--border))",
              }}
            >
              <div
                style={{ fontSize: 13, color: "hsl(var(--muted-foreground))" }}
              >
                📧 {school.email}
              </div>
              <div
                style={{ fontSize: 13, color: "hsl(var(--muted-foreground))" }}
              >
                📞 {school.phone}
              </div>
              <div
                style={{ fontSize: 13, color: "hsl(var(--muted-foreground))" }}
              >
                📍 {school.address}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: "hsl(var(--muted-foreground))",
                    marginBottom: 4,
                  }}
                >
                  Users
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
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
                    marginBottom: 4,
                  }}
                >
                  Exams
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
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
                    marginBottom: 4,
                  }}
                >
                  Revenue
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "hsl(var(--accent))",
                  }}
                >
                  {school.revenue}
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: 12,
                color: "hsl(var(--muted-foreground))",
                marginBottom: 16,
              }}
            >
              Joined: {school.joinedDate} • Expires: {school.expiryDate}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => navigate(`/super-admin/schools/${school.id}`)}
                style={{
                  flex: 1,
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
              <button
                onClick={() => handleEditSchool(school)}
                style={{
                  flex: 1,
                  background: "hsl(var(--secondary))",
                  color: "hsl(var(--foreground))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  padding: "10px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              {school.status === "active" ? (
                <button
                  onClick={() => handleSuspendSchool(school.id)}
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
                  Suspend
                </button>
              ) : (
                <button
                  onClick={() => handleActivateSchool(school.id)}
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
                  Activate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* School Dialog */}
      {showSchoolDialog && (
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
          onClick={() => setShowSchoolDialog(false)}
        >
          <div
            style={{
              background: "hsl(var(--background))",
              borderRadius: 16,
              padding: 32,
              width: "90%",
              maxWidth: 600,
              maxHeight: "90vh",
              overflowY: "auto",
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
              {editingSchool ? "Edit School" : "Add New School"}
            </h2>

            <div
              style={{ fontSize: 14, color: "hsl(var(--muted-foreground))" }}
            >
              School form would go here with fields for name, email, phone,
              address, plan selection, etc.
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 24,
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setShowSchoolDialog(false)}
                style={{
                  background: "hsl(var(--secondary))",
                  color: "hsl(var(--foreground))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 10,
                  padding: "12px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("School saved!");
                  setShowSchoolDialog(false);
                }}
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
                {editingSchool ? "Update School" : "Create School"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
