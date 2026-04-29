import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/auth.store";
import { demoMockUsers } from "@/demo/mock-data";

const roles = [
  { key: "student", label: "Student", icon: "🎓", desc: "Take your exams" },
  { key: "teacher", label: "Teacher", icon: "📝", desc: "Manage questions" },
  {
    key: "invigilator",
    label: "Invigilator",
    icon: "👁️",
    desc: "Monitor sessions",
  },
  {
    key: "school_admin",
    label: "School Admin",
    icon: "🏫",
    desc: "Manage school",
  },
  {
    key: "super_admin",
    label: "Super Admin",
    icon: "🛡️",
    desc: "System control",
  },
];

export function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit } = useForm();

  const handleLogin = async (data: any) => {
    setLoading(true);
    setError("");

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Check if user entered something
      if (
        data.identifier &&
        data.identifier.trim() !== "" &&
        data.password &&
        data.password.trim() !== ""
      ) {
        // Get mock user based on role
        const mockUser = demoMockUsers[role] || {
          id: `${role}_${Date.now()}`,
          user_code: data.identifier.includes("@")
            ? data.identifier.split("@")[0].toUpperCase()
            : data.identifier.toUpperCase(),
          email: data.identifier.includes("@")
            ? data.identifier
            : `${data.identifier}@demo.com`,
          role: role,
          school_id: role === "super_admin" ? "" : "school-1",
          must_change_password: false,
          first_name: data.identifier.split("@")[0] || "Demo",
          last_name: "User",
          school: {
            name:
              role === "super_admin" ? "CBT Platform" : "Greenfield Academy",
            logo_url: "",
            primary_color: "#167d1c",
            accent_color: "#ff9001",
          },
        };

        // Use auth store to set authentication
        useAuthStore.getState().setAuth(mockUser, "demo-token", "demo-refresh");

        console.log("✅ User logged in:", mockUser);

        // Navigate based on role
        const rolePath =
          role === "super_admin"
            ? "super-admin"
            : role === "school_admin"
              ? "admin"
              : role;
        navigate(`/${rolePath}/dashboard`);
      } else {
        setError("Please enter both identifier and password");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "var(--font-inter)",
        background: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg) } }
        .role-card {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid hsl(var(--border));
          cursor: pointer;
          background: hsl(var(--secondary));
          animation: fadeIn 0.4s ease forwards;
        }
        .role-card:hover {
          background: hsl(var(--accent) / 0.1);
          border-color: hsl(var(--primary));
          transform: translateY(-3px);
          box-shadow: 0 4px 12px hsl(var(--primary) / 0.15);
        }
        .role-card.active {
          background: hsl(var(--primary) / 0.1);
          border-color: hsl(var(--primary));
          box-shadow: 0 4px 16px hsl(var(--primary) / 0.2);
        }
        .input-focus:focus {
          border-color: hsl(var(--primary)) !important;
          box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1) !important;
          outline: none;
        }
        .login-btn:hover:not(:disabled) {
          background: hsl(var(--primary) / 0.9) !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px hsl(var(--primary) / 0.3);
        }
      `}</style>

      {/* LEFT SIDE — Brand Identity */}
      <div
        style={{
          width: "40%",
          background:
            "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)",
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Elements */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-10%",
            width: "400px",
            height: "400px",
            background: "hsl(var(--accent))",
            filter: "blur(120px)",
            opacity: 0.2,
          }}
        />

        {/* LOGO SECTION */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: "auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              background: "hsl(var(--primary-foreground))",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontWeight: 800,
                fontSize: 28,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: "hsl(var(--primary-foreground))",
              }}
            >
              CBT Platform
            </div>
            <div
              style={{
                color: "hsl(var(--primary-foreground) / 0.7)",
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginTop: 4,
                fontWeight: 600,
              }}
            >
              Enterprise Edition
            </div>
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 24,
              letterSpacing: "-0.03em",
              color: "hsl(var(--primary-foreground))",
            }}
          >
            Secure Digital <br />
            <span style={{ color: "hsl(var(--accent))" }}>
              Examination
            </span>{" "}
            Platform
          </h1>
          <p
            style={{
              color: "hsl(var(--primary-foreground) / 0.8)",
              fontSize: 17,
              lineHeight: 1.6,
              maxWidth: "420px",
            }}
          >
            A comprehensive solution for schools, teachers, and students to
            conduct secure, efficient, and modern computer-based tests.
          </p>
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: 40,
            borderTop: "1px solid hsl(var(--primary-foreground) / 0.2)",
            color: "hsl(var(--primary-foreground) / 0.6)",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          © 2026 CBT Platform. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE — Login Form */}
      <div
        style={{
          flex: 1,
          padding: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        <div style={{ width: "100%", maxWidth: "580px" }}>
          <div style={{ marginBottom: 40 }}>
            <h2
              style={{
                fontSize: 36,
                fontWeight: 800,
                marginBottom: 8,
                letterSpacing: "-0.02em",
                color: "hsl(var(--foreground))",
              }}
            >
              Welcome Back
            </h2>
            <p
              style={{
                color: "hsl(var(--muted-foreground))",
                fontSize: 16,
              }}
            >
              Select your role and sign in to continue
            </p>
          </div>

          {/* ROLE SELECTOR GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 12,
              marginBottom: 32,
            }}
          >
            {roles.map((r) => (
              <div
                key={r.key}
                onClick={() => setRole(r.key)}
                className={`role-card ${role === r.key ? "active" : ""}`}
                style={{
                  padding: "20px 12px",
                  borderRadius: 12,
                  textAlign: "center",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{r.icon}</div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 12,
                    color:
                      role === r.key
                        ? "hsl(var(--primary))"
                        : "hsl(var(--foreground))",
                  }}
                >
                  {r.label.split(" ")[0]}
                </div>

                {role === r.key && (
                  <div
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      width: 18,
                      height: 18,
                      background: "hsl(var(--primary))",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* LOGIN FORM SECTION */}
          <div
            style={{
              background: "hsl(var(--background))",
              padding: "40px",
              borderRadius: 20,
              border: "1px solid hsl(var(--border))",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            <form
              onSubmit={handleSubmit(handleLogin)}
              style={{ display: "flex", flexDirection: "column", gap: 24 }}
            >
              {error && (
                <div
                  style={{
                    color: "hsl(var(--destructive))",
                    background: "hsl(var(--destructive) / 0.1)",
                    padding: "14px 16px",
                    borderRadius: 12,
                    fontSize: 14,
                    border: "1px solid hsl(var(--destructive) / 0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span>⚠️</span> {error}
                </div>
              )}

              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <label
                    style={{
                      fontSize: 13,
                      color: "hsl(var(--foreground))",
                      fontWeight: 600,
                    }}
                  >
                    Email or User ID
                  </label>
                  <input
                    {...register("identifier", { required: true })}
                    placeholder="Enter your email or user ID"
                    className="input-focus"
                    autoComplete="username"
                    style={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      height: 48,
                      borderRadius: 12,
                      padding: "0 16px",
                      color: "hsl(var(--foreground))",
                      fontSize: 15,
                      transition: "all 0.2s",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label
                      style={{
                        fontSize: 13,
                        color: "hsl(var(--foreground))",
                        fontWeight: 600,
                      }}
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "hsl(var(--primary))",
                        fontSize: 12,
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      {showPass ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                  <input
                    {...register("password", { required: true })}
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    className="input-focus"
                    autoComplete="current-password"
                    style={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      height: 48,
                      borderRadius: 12,
                      padding: "0 16px",
                      color: "hsl(var(--foreground))",
                      fontSize: 15,
                      transition: "all 0.2s",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="login-btn"
                style={{
                  height: 52,
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  border: "none",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: loading ? "not-allowed" : "pointer",
                  marginTop: 8,
                  transition: "all 0.2s",
                  opacity: loading ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                {loading ? (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ animation: "spin 0.8s linear infinite" }}
                    >
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in as {role.replace("_", " ")}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Demo credentials hint */}
            <div
              style={{
                marginTop: 24,
                padding: "14px",
                background: "hsl(var(--accent) / 0.1)",
                borderRadius: 12,
                border: "1px solid hsl(var(--accent) / 0.2)",
              }}
            >
              <p
                style={{
                  color: "hsl(var(--muted-foreground))",
                  fontSize: 13,
                  margin: 0,
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                <strong style={{ color: "hsl(var(--accent))" }}>
                  💡 Demo Mode:
                </strong>{" "}
                Enter any email and password to sign in
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <a
              href="/forgot-password"
              style={{
                color: "hsl(var(--muted-foreground))",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "hsl(var(--primary))")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "hsl(var(--muted-foreground))")
              }
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
