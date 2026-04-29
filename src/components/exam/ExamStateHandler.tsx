import { ExamSessionStatus } from "@/types/exam.types";

interface ExamStateHandlerProps {
  status: ExamSessionStatus;
  onStart?: () => void;
  onResume?: () => void;
  onPause?: () => void;
  examTitle: string;
  timeRemaining?: number;
  message?: string;
}

export function ExamStateHandler({
  status,
  onStart,
  onResume,
  examTitle,
  timeRemaining,
  message,
}: ExamStateHandlerProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  // Not Started State
  if (status === "not_started") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "hsl(var(--background))",
          fontFamily: "var(--font-inter)",
        }}
      >
        <div
          style={{
            maxWidth: 600,
            width: "90%",
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            padding: 48,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "hsl(var(--primary) / 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: 40,
            }}
          >
            📝
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "hsl(var(--foreground))",
              marginBottom: 12,
            }}
          >
            {examTitle}
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "hsl(var(--muted-foreground))",
              marginBottom: 32,
            }}
          >
            {message || "Click the button below to start your exam"}
          </p>
          {timeRemaining && (
            <div
              style={{
                background: "hsl(var(--secondary))",
                borderRadius: 12,
                padding: 16,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  color: "hsl(var(--muted-foreground))",
                  marginBottom: 8,
                }}
              >
                Duration
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "hsl(var(--foreground))",
                }}
              >
                {formatTime(timeRemaining)}
              </div>
            </div>
          )}
          <button
            onClick={onStart}
            style={{
              width: "100%",
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              border: "none",
              borderRadius: 12,
              padding: "16px 32px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  // Paused State
  if (status === "paused") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "hsl(var(--background))",
          fontFamily: "var(--font-inter)",
        }}
      >
        <div
          style={{
            maxWidth: 600,
            width: "90%",
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            padding: 48,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(245, 158, 11, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: 40,
            }}
          >
            ⏸️
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "hsl(var(--foreground))",
              marginBottom: 12,
            }}
          >
            Exam Paused
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "hsl(var(--muted-foreground))",
              marginBottom: 32,
            }}
          >
            {message || "Your exam has been paused. Click resume to continue."}
          </p>
          {timeRemaining && (
            <div
              style={{
                background: "rgba(245, 158, 11, 0.1)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                borderRadius: 12,
                padding: 16,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  color: "hsl(var(--muted-foreground))",
                  marginBottom: 8,
                }}
              >
                Time Remaining
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#f59e0b",
                }}
              >
                {formatTime(timeRemaining)}
              </div>
            </div>
          )}
          <button
            onClick={onResume}
            style={{
              width: "100%",
              background: "#f59e0b",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "16px 32px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Resume Exam
          </button>
        </div>
      </div>
    );
  }

  // Submitted State
  if (status === "submitted" || status === "force_submitted") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "hsl(var(--background))",
          fontFamily: "var(--font-inter)",
        }}
      >
        <div
          style={{
            maxWidth: 600,
            width: "90%",
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            padding: 48,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(34, 197, 94, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: 40,
            }}
          >
            ✅
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "hsl(var(--foreground))",
              marginBottom: 12,
            }}
          >
            Exam Submitted
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "hsl(var(--muted-foreground))",
              marginBottom: 32,
            }}
          >
            {status === "force_submitted"
              ? "Your exam was submitted by the invigilator."
              : "Your exam has been submitted successfully. You can now close this window."}
          </p>
          <div
            style={{
              background: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: 12,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: "hsl(var(--muted-foreground))",
                marginBottom: 8,
              }}
            >
              Status
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#22c55e",
              }}
            >
              {status === "force_submitted"
                ? "Force Submitted"
                : "Successfully Submitted"}
            </div>
          </div>
          <button
            onClick={() => (window.location.href = "/student/dashboard")}
            style={{
              width: "100%",
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              border: "none",
              borderRadius: 12,
              padding: "16px 32px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Expired State
  if (status === "expired") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "hsl(var(--background))",
          fontFamily: "var(--font-inter)",
        }}
      >
        <div
          style={{
            maxWidth: 600,
            width: "90%",
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            padding: 48,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(239, 68, 68, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: 40,
            }}
          >
            ⏰
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "hsl(var(--foreground))",
              marginBottom: 12,
            }}
          >
            Exam Expired
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "hsl(var(--muted-foreground))",
              marginBottom: 32,
            }}
          >
            {message ||
              "This exam has expired. The time limit has been reached and your answers have been automatically submitted."}
          </p>
          <div
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: 12,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: "hsl(var(--muted-foreground))",
                marginBottom: 8,
              }}
            >
              Status
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#ef4444",
              }}
            >
              Time Expired - Auto Submitted
            </div>
          </div>
          <button
            onClick={() => (window.location.href = "/student/dashboard")}
            style={{
              width: "100%",
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              border: "none",
              borderRadius: 12,
              padding: "16px 32px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // In Progress - return null as the exam interface will be shown
  return null;
}
