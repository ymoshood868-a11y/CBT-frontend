import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { demoMockUsers } from "@/demo/mock-data";

const rolePath = (role: string) => {
  if (role === "super_admin") return "super-admin";
  if (role === "school_admin") return "admin";
  return role;
};

const roles = [
  {
    key: "super_admin",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    label: "Super Admin",
    tag: "Platform Owner",
    description:
      "Oversee all institutions, billing cycles, and platform health from a single command center.",
    path: "/super-admin/dashboard",
    accent: "#1a1a2e",
    highlight: "#e8e4ff",
    tagColor: "#6c63ff",
  },
  {
    key: "school_admin",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
    label: "School Admin",
    tag: "Institution",
    description:
      "Manage teachers, students, and exam approvals. View analytics across your entire school.",
    path: "/admin/dashboard",
    accent: "#0f4c75",
    highlight: "#e0f0ff",
    tagColor: "#1b7fc4",
  },
  {
    key: "teacher",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    label: "Teacher",
    tag: "Educator",
    description:
      "Build question banks, design timed exams, and release results with detailed performance reports.",
    path: "/teacher/dashboard",
    accent: "#1b4332",
    highlight: "#d8f3dc",
    tagColor: "#2d6a4f",
  },
  {
    key: "invigilator",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    label: "Invigilator",
    tag: "Monitor",
    description:
      "Supervise live exams in real time, flag irregularities, and manage student access.",
    path: "/invigilator/dashboard",
    accent: "#7c2d12",
    highlight: "#ffedd5",
    tagColor: "#c2410c",
  },
  {
    key: "student",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    label: "Student",
    tag: "Candidate",
    description:
      "Take CBT exams in a secure, distraction-free environment and view results instantly.",
    path: "/student/dashboard",
    accent: "#4a1942",
    highlight: "#fce7f3",
    tagColor: "#9d174d",
  },
];

export function DemoPage() {
  const navigate = useNavigate();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  function startDemo(roleKey: string) {
    const mockUser = demoMockUsers[roleKey];
    if (mockUser) {
      useAuthStore.getState().setAuth(mockUser, "demo-token", "demo-refresh");
      navigate(`/${rolePath(roleKey)}/dashboard`);
    }
  }

  useEffect(() => {
    const cards = cardsRef.current;
    cards.forEach((card, i) => {
      if (!card) return;
      card.style.opacity = "0";
      card.style.transform = "translateY(32px)";
      setTimeout(
        () => {
          card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        },
        120 + i * 80,
      );
    });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f6f3",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          padding: "20px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e5e2db",
          background: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "#1a1a2e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: 17,
              color: "#1a1a2e",
              fontFamily: "Georgia, serif",
            }}
          >
            CBT Platform
          </span>
        </div>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "8px 20px",
            borderRadius: 8,
            border: "1.5px solid #1a1a2e",
            background: "transparent",
            color: "#1a1a2e",
            fontSize: 14,
            fontFamily: "Georgia, serif",
            cursor: "pointer",
            fontWeight: 600,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.background = "#1a1a2e";
            (e.target as HTMLButtonElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.background = "transparent";
            (e.target as HTMLButtonElement).style.color = "#1a1a2e";
          }}
        >
          Sign In
        </button>
      </nav>

      {/* Hero */}
      <div
        style={{
          textAlign: "center",
          padding: "72px 24px 48px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "#1a1a2e",
            color: "#a89cff",
            fontSize: 12,
            fontFamily: "monospace",
            letterSpacing: "0.12em",
            padding: "6px 16px",
            borderRadius: 100,
            marginBottom: 24,
            textTransform: "uppercase",
          }}
        >
          Interactive Demo · No account required
        </div>
        <h1
          style={{
            fontSize: "clamp(36px, 5vw, 58px)",
            fontWeight: 700,
            color: "#1a1a2e",
            margin: "0 0 16px",
            lineHeight: 1.15,
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.02em",
          }}
        >
          Explore the CBT Platform
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#6b6860",
            maxWidth: 480,
            margin: "0 auto",
            lineHeight: 1.7,
            fontFamily: "Georgia, serif",
          }}
        >
          Choose a role below to experience a live, fully interactive preview of
          the platform.
        </p>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 32px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {roles.map((role, i) => (
          <div
            key={role.key}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            onClick={() => startDemo(role.key)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") startDemo(role.key);
            }}
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #e5e2db",
              padding: "28px 28px 24px",
              cursor: "pointer",
              transition:
                "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(-4px)";
              el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.10)";
              el.style.borderColor = role.tagColor;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
              el.style.borderColor = "#e5e2db";
            }}
          >
            {/* Accent bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: role.tagColor,
                borderRadius: "16px 16px 0 0",
              }}
            />

            {/* Icon */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                background: role.highlight,
                color: role.tagColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              {role.icon}
            </div>

            {/* Tag */}
            <div
              style={{
                display: "inline-block",
                fontSize: 11,
                fontFamily: "monospace",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: role.tagColor,
                background: role.highlight,
                padding: "3px 10px",
                borderRadius: 100,
                marginBottom: 10,
              }}
            >
              {role.tag}
            </div>

            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#1a1a2e",
                margin: "0 0 8px",
                fontFamily: "Georgia, serif",
              }}
            >
              {role.label}
            </h2>

            <p
              style={{
                fontSize: 14,
                color: "#6b6860",
                lineHeight: 1.65,
                margin: "0 0 20px",
                fontFamily: "Georgia, serif",
              }}
            >
              {role.description}
            </p>

            {/* CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: role.tagColor,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "Georgia, serif",
              }}
            >
              Explore as {role.label}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "24px",
          borderTop: "1px solid #e5e2db",
          color: "#aaa",
          fontSize: 13,
          fontFamily: "Georgia, serif",
          background: "#fff",
        }}
      >
        CBT Platform · Demo Mode · All data is simulated
      </div>
    </div>
  );
}
