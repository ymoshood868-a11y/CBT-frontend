import { useState } from "react";
import {
  Building2,
  User,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export default function SchoolCreate() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // School Info
    schoolName: "",
    email: "",
    phone: "",
    address: "",
    // Admin Info
    adminName: "",
    adminEmail: "",
    adminPhone: "",
    // Plan
    plan: "basic",
  });

  const steps = [
    { number: 1, title: "School Info", icon: Building2 },
    { number: 2, title: "Admin Setup", icon: User },
    { number: 3, title: "Plan Selection", icon: CreditCard },
    { number: 4, title: "Review", icon: CheckCircle },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    alert("School created successfully!");
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "hsl(var(--foreground))",
            marginBottom: 8,
          }}
        >
          Create New Organization
        </h1>
        <p style={{ color: "hsl(var(--muted-foreground))", fontSize: 14 }}>
          Set up a new school or organization on the platform
        </p>
      </div>

      {/* Step Indicator */}
      <div
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 12,
          padding: 24,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isActive = step === s.number;
            const isCompleted = step > s.number;

            return (
              <div
                key={s.number}
                style={{ display: "flex", alignItems: "center", flex: 1 }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: isActive
                        ? "hsl(var(--primary))"
                        : isCompleted
                          ? "hsl(var(--primary) / 0.2)"
                          : "hsl(var(--muted))",
                      color: isActive
                        ? "hsl(var(--primary-foreground))"
                        : isCompleted
                          ? "hsl(var(--primary))"
                          : "hsl(var(--muted-foreground))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 600,
                      marginBottom: 8,
                      transition: "all 0.3s",
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircle size={24} />
                    ) : (
                      <Icon size={24} />
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: isActive ? 600 : 500,
                      color: isActive
                        ? "hsl(var(--primary))"
                        : "hsl(var(--muted-foreground))",
                      textAlign: "center",
                    }}
                  >
                    {s.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: 2,
                      background: isCompleted
                        ? "hsl(var(--primary))"
                        : "hsl(var(--border))",
                      marginTop: -24,
                      transition: "all 0.3s",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 12,
          padding: 32,
          marginBottom: 24,
        }}
      >
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>
              School Information
            </h2>
            <div style={{ display: "grid", gap: 20 }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: 8,
                  }}
                >
                  School Name *
                </label>
                <input
                  type="text"
                  value={formData.schoolName}
                  onChange={(e) =>
                    setFormData({ ...formData, schoolName: e.target.value })
                  }
                  placeholder="Enter school name"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 14,
                    background: "hsl(var(--background))",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 500,
                      marginBottom: 8,
                    }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="school@example.com"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 14,
                      background: "hsl(var(--background))",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 500,
                      marginBottom: 8,
                    }}
                  >
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+234 801 234 5678"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 14,
                      background: "hsl(var(--background))",
                    }}
                  />
                </div>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: 8,
                  }}
                >
                  Address *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Enter school address"
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 14,
                    background: "hsl(var(--background))",
                    resize: "vertical",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>
              Administrator Setup
            </h2>
            <div style={{ display: "grid", gap: 20 }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: 8,
                  }}
                >
                  Admin Full Name *
                </label>
                <input
                  type="text"
                  value={formData.adminName}
                  onChange={(e) =>
                    setFormData({ ...formData, adminName: e.target.value })
                  }
                  placeholder="Enter admin name"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 14,
                    background: "hsl(var(--background))",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 500,
                      marginBottom: 8,
                    }}
                  >
                    Admin Email *
                  </label>
                  <input
                    type="email"
                    value={formData.adminEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, adminEmail: e.target.value })
                    }
                    placeholder="admin@example.com"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 14,
                      background: "hsl(var(--background))",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 500,
                      marginBottom: 8,
                    }}
                  >
                    Admin Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.adminPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, adminPhone: e.target.value })
                    }
                    placeholder="+234 801 234 5678"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 14,
                      background: "hsl(var(--background))",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>
              Select Subscription Plan
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
              }}
            >
              {[
                {
                  id: "basic",
                  name: "Basic",
                  price: "₦450,000/year",
                  users: "100 users",
                  exams: "20 exams",
                },
                {
                  id: "premium",
                  name: "Premium",
                  price: "₦1,800,000/year",
                  users: "300 users",
                  exams: "50 exams",
                },
                {
                  id: "enterprise",
                  name: "Enterprise",
                  price: "₦2,400,000/year",
                  users: "Unlimited",
                  exams: "Unlimited",
                },
              ].map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setFormData({ ...formData, plan: plan.id })}
                  style={{
                    padding: 20,
                    border: `2px solid ${formData.plan === plan.id ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
                    borderRadius: 12,
                    cursor: "pointer",
                    background:
                      formData.plan === plan.id
                        ? "hsl(var(--primary) / 0.05)"
                        : "transparent",
                    transition: "all 0.2s",
                  }}
                >
                  <h3
                    style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: "hsl(var(--primary))",
                      marginBottom: 12,
                    }}
                  >
                    {plan.price}
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      color: "hsl(var(--muted-foreground))",
                      marginBottom: 4,
                    }}
                  >
                    {plan.users}
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    {plan.exams}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>
              Review & Submit
            </h2>
            <div style={{ display: "grid", gap: 24 }}>
              <div>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "hsl(var(--muted-foreground))",
                    marginBottom: 12,
                  }}
                >
                  School Information
                </h3>
                <div style={{ display: "grid", gap: 8 }}>
                  <p>
                    <strong>Name:</strong>{" "}
                    {formData.schoolName || "Not provided"}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email || "Not provided"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phone || "Not provided"}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {formData.address || "Not provided"}
                  </p>
                </div>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "hsl(var(--muted-foreground))",
                    marginBottom: 12,
                  }}
                >
                  Administrator
                </h3>
                <div style={{ display: "grid", gap: 8 }}>
                  <p>
                    <strong>Name:</strong>{" "}
                    {formData.adminName || "Not provided"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {formData.adminEmail || "Not provided"}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {formData.adminPhone || "Not provided"}
                  </p>
                </div>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "hsl(var(--muted-foreground))",
                    marginBottom: 12,
                  }}
                >
                  Subscription Plan
                </h3>
                <p
                  style={{
                    textTransform: "capitalize",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {formData.plan} Plan
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 16 }}
      >
        <button
          onClick={handleBack}
          disabled={step === 1}
          style={{
            padding: "12px 24px",
            borderRadius: 8,
            border: "1px solid hsl(var(--border))",
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            fontSize: 14,
            fontWeight: 500,
            cursor: step === 1 ? "not-allowed" : "pointer",
            opacity: step === 1 ? 0.5 : 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <ArrowLeft size={16} />
          Back
        </button>
        {step < 4 ? (
          <button
            onClick={handleNext}
            style={{
              padding: "12px 24px",
              borderRadius: 8,
              border: "none",
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Next
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            style={{
              padding: "12px 24px",
              borderRadius: 8,
              border: "none",
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <CheckCircle size={16} />
            Create Organization
          </button>
        )}
      </div>
    </div>
  );
}
