import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const teachers = [
  {
    id: 1,
    name: "Mr. Johnson",
    email: "johnson@school.com",
    subject: "Mathematics",
    classes: ["SS3A", "SS3B"],
    exams: 12,
    status: "active",
  },
  {
    id: 2,
    name: "Dr. Williams",
    email: "williams@school.com",
    subject: "Physics",
    classes: ["SS3B", "SS2A"],
    exams: 8,
    status: "active",
  },
  {
    id: 3,
    name: "Mrs. Davis",
    email: "davis@school.com",
    subject: "Chemistry",
    classes: ["SS3A"],
    exams: 10,
    status: "active",
  },
];

export default function AdminTeachers() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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
                Teachers
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                Manage teaching staff
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
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

              <button
                onClick={() => navigate("/admin/teachers/create")}
                style={{
                  background: "hsl(var(--primary-foreground))",
                  color: "hsl(var(--primary))",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <span style={{ fontSize: 18 }}>+</span> Add Teacher
              </button>
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
            label: "Total Teachers",
            value: teachers.length.toString(),
            icon: "👨‍🏫",
            color: "hsl(var(--primary))",
          },
          {
            label: "Active",
            value: teachers
              .filter((t) => t.status === "active")
              .length.toString(),
            icon: "✅",
            color: "#22c55e",
          },
          {
            label: "Total Exams",
            value: teachers.reduce((sum, t) => sum + t.exams, 0).toString(),
            icon: "📝",
            color: "hsl(var(--accent))",
          },
          {
            label: "Subjects",
            value: new Set(teachers.map((t) => t.subject)).size.toString(),
            icon: "📚",
            color: "#9333ea",
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

      {/* Teachers List */}
      <div
        style={{
          background: "hsl(var(--background))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "8px" }}>
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              style={{
                padding: "20px",
                margin: "8px",
                background: "hsl(var(--secondary))",
                borderRadius: 12,
                border: "1px solid hsl(var(--border))",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onClick={() => navigate(`/admin/teachers/${teacher.id}`)}
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
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "hsl(var(--primary) / 0.1)",
                      border: "2px solid hsl(var(--primary) / 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "hsl(var(--primary))",
                      fontWeight: 700,
                      fontSize: 20,
                    }}
                  >
                    {teacher.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "hsl(var(--foreground))",
                        margin: "0 0 4px",
                      }}
                    >
                      {teacher.name}
                    </h3>
                    <div
                      style={{
                        fontSize: 13,
                        color: "hsl(var(--muted-foreground))",
                        marginBottom: 8,
                      }}
                    >
                      {teacher.email} · {teacher.subject}
                    </div>
                    <div style={{ display: "flex", gap: 16 }}>
                      <div>
                        <span
                          style={{
                            fontSize: 12,
                            color: "hsl(var(--muted-foreground))",
                          }}
                        >
                          Classes:
                        </span>{" "}
                        <span style={{ fontSize: 13, fontWeight: 600 }}>
                          {teacher.classes.join(", ")}
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: 12,
                            color: "hsl(var(--muted-foreground))",
                          }}
                        >
                          Exams:
                        </span>{" "}
                        <span style={{ fontSize: 13, fontWeight: 600 }}>
                          {teacher.exams}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/teachers/${teacher.id}/edit`);
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
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Remove ${teacher.name}?`)) {
                        alert("Teacher removed!");
                      }
                    }}
                    style={{
                      background: "hsl(var(--destructive) / 0.1)",
                      color: "hsl(var(--destructive))",
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Remove
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
