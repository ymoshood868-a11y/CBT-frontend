import { useAuthStore } from "@/stores/auth.store";
import { useState, useEffect } from "react";

export function StudentProfile() {
  const user = useAuthStore((s) => s.user);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isEditing, setIsEditing] = useState(false);

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

  const profileData = {
    firstName: user?.first_name || "James",
    lastName: user?.last_name || "Anderson",
    email: user?.email || "james.anderson@school.com",
    userCode: user?.user_code || "STU-2024-001",
    class: "SS3A",
    admissionNumber: "ADM/2021/0123",
    dateOfBirth: "2005-03-15",
    gender: "Male",
    phone: "+234 801 234 5678",
    address: "123 School Road, Lagos, Nigeria",
    guardianName: "Mr. John Anderson",
    guardianPhone: "+234 802 345 6789",
    guardianEmail: "john.anderson@email.com",
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
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "hsl(var(--primary-foreground))",
                  border: "4px solid hsl(var(--primary-foreground) / 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "hsl(var(--primary))",
                  fontWeight: 800,
                  fontSize: 40,
                }}
              >
                {profileData.firstName[0]}
                {profileData.lastName[0]}
              </div>
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
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <p
                  style={{
                    color: "hsl(var(--primary-foreground) / 0.9)",
                    fontSize: 15,
                    margin: "0 0 8px",
                  }}
                >
                  {profileData.userCode} · {profileData.class}
                </p>
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
                    padding: "6px 12px",
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: isOnline ? "#22c55e" : "#ef4444",
                      boxShadow: `0 0 8px ${isOnline ? "#22c55e" : "#ef4444"}`,
                    }}
                  />
                  <span
                    style={{
                      color: "hsl(var(--primary-foreground))",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
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
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        {/* Personal Information */}
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
              Personal Information
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "hsl(var(--muted-foreground))",
                margin: 0,
              }}
            >
              Your basic profile details
            </p>
          </div>

          <div style={{ padding: "24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 20,
              }}
            >
              {[
                { label: "First Name", value: profileData.firstName },
                { label: "Last Name", value: profileData.lastName },
                { label: "Email Address", value: profileData.email },
                { label: "Student ID", value: profileData.userCode },
                { label: "Class", value: profileData.class },
                {
                  label: "Admission Number",
                  value: profileData.admissionNumber,
                },
                {
                  label: "Date of Birth",
                  value: new Date(profileData.dateOfBirth).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" },
                  ),
                },
                { label: "Gender", value: profileData.gender },
                { label: "Phone Number", value: profileData.phone },
              ].map((field) => (
                <div key={field.label}>
                  <div
                    style={{
                      fontSize: 12,
                      color: "hsl(var(--muted-foreground))",
                      marginBottom: 6,
                      fontWeight: 500,
                    }}
                  >
                    {field.label}
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={field.value}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        color: "hsl(var(--foreground))",
                        background: "hsl(var(--background))",
                        fontFamily: "inherit",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "hsl(var(--foreground))",
                      }}
                    >
                      {field.value}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1" }}>
                <div
                  style={{
                    fontSize: 12,
                    color: "hsl(var(--muted-foreground))",
                    marginBottom: 6,
                    fontWeight: 500,
                  }}
                >
                  Address
                </div>
                {isEditing ? (
                  <textarea
                    defaultValue={profileData.address}
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                      background: "hsl(var(--background))",
                      fontFamily: "inherit",
                      resize: "vertical",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {profileData.address}
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div
                style={{
                  marginTop: 24,
                  paddingTop: 24,
                  borderTop: "1px solid hsl(var(--border))",
                  display: "flex",
                  gap: 12,
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => setIsEditing(false)}
                  style={{
                    background: "hsl(var(--secondary))",
                    color: "hsl(var(--foreground))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 10,
                    padding: "10px 20px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    // Save logic here
                  }}
                  style={{
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    border: "none",
                    borderRadius: 10,
                    padding: "10px 20px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Guardian Information & Quick Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Guardian Info */}
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
                Guardian Information
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: "hsl(var(--muted-foreground))",
                  margin: 0,
                }}
              >
                Emergency contact details
              </p>
            </div>

            <div style={{ padding: "24px" }}>
              {[
                {
                  label: "Guardian Name",
                  value: profileData.guardianName,
                  icon: "👤",
                },
                {
                  label: "Phone Number",
                  value: profileData.guardianPhone,
                  icon: "📞",
                },
                {
                  label: "Email Address",
                  value: profileData.guardianEmail,
                  icon: "📧",
                },
              ].map((field) => (
                <div
                  key={field.label}
                  style={{
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color: "hsl(var(--muted-foreground))",
                      marginBottom: 6,
                      fontWeight: 500,
                    }}
                  >
                    {field.icon} {field.label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
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
                Academic Stats
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: "hsl(var(--muted-foreground))",
                  margin: 0,
                }}
              >
                Your performance overview
              </p>
            </div>

            <div style={{ padding: "16px" }}>
              {[
                {
                  label: "Total Exams",
                  value: "12",
                  icon: "📝",
                  color: "hsl(var(--primary))",
                },
                {
                  label: "Average Score",
                  value: "74%",
                  icon: "📊",
                  color: "hsl(var(--accent))",
                },
                {
                  label: "Attendance",
                  value: "95%",
                  icon: "✅",
                  color: "#22c55e",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    padding: "16px",
                    margin: "8px",
                    background: "hsl(var(--secondary))",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${stat.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 12,
                        color: "hsl(var(--muted-foreground))",
                        marginBottom: 2,
                      }}
                    >
                      {stat.label}
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: stat.color,
                      }}
                    >
                      {stat.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
