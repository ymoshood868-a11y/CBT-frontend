import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const examData = {
  1: {
    id: 1,
    name: "Mathematics Mid-Term Exam",
    subject: "Mathematics",
    class: "SS3A",
    duration: 90,
    questions: 50,
    totalMarks: 100,
    passMark: 40,
    instructor: "Mr. Johnson",
    date: "Apr 28, 2026",
    time: "10:00 AM",
    instructions: [
      "Ensure you have a stable internet connection before starting the exam.",
      "The exam must be completed in fullscreen mode. Exiting fullscreen will be flagged.",
      "Do not switch tabs or minimize the browser during the exam.",
      "You can flag questions for review and return to them later.",
      "Your answers are auto-saved every 30 seconds.",
      "Click 'Submit' when you're done or the exam will auto-submit when time expires.",
      "Once submitted, you cannot change your answers.",
      "Ensure your device is fully charged or connected to power.",
      "Use the calculator tool provided for mathematical calculations.",
      "If you lose connection, the exam will pause and resume when reconnected.",
    ],
    rules: [
      "No external materials or devices are allowed.",
      "No communication with other students during the exam.",
      "Cheating or malpractice will result in disqualification.",
      "You must complete the exam in one sitting.",
      "Technical issues must be reported immediately to the invigilator.",
    ],
  },
};

export function ExamInstructions() {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [agreed, setAgreed] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [systemCheck, setSystemCheck] = useState({
    browser: true,
    connection: true,
    fullscreen: true,
  });

  const exam = examId
    ? examData[Number(examId) as keyof typeof examData]
    : undefined;

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

  useEffect(() => {
    // Check if fullscreen is supported
    const fullscreenSupported = document.fullscreenEnabled;
    setSystemCheck((prev) => ({ ...prev, fullscreen: fullscreenSupported }));
  }, []);

  const startExam = async () => {
    if (!agreed) {
      alert("Please agree to the terms and conditions");
      return;
    }

    if (!isOnline) {
      alert("You must be online to start the exam");
      return;
    }

    // Request fullscreen
    try {
      await document.documentElement.requestFullscreen();
      navigate(`/student/exam/${examId}/take`);
    } catch (err) {
      console.error("Fullscreen request failed:", err);
      if (confirm("Fullscreen mode is required. Continue anyway?")) {
        navigate(`/student/exam/${examId}/take`);
      }
    }
  };

  if (!exam) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Exam not found</h2>
        <button onClick={() => navigate("/student/exams")}>
          Back to Exams
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "var(--font-inter)",
        background: "hsl(var(--background))",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
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
                  {exam.name}
                </h1>
                <p
                  style={{
                    color: "hsl(var(--primary-foreground) / 0.9)",
                    fontSize: 15,
                    margin: 0,
                  }}
                >
                  {exam.subject} · {exam.class} · {exam.instructor}
                </p>
              </div>

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

        {/* Exam Details */}
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
              label: "Duration",
              value: `${exam.duration} minutes`,
              icon: "⏱️",
            },
            {
              label: "Questions",
              value: exam.questions.toString(),
              icon: "❓",
            },
            {
              label: "Total Marks",
              value: exam.totalMarks.toString(),
              icon: "💯",
            },
            { label: "Pass Mark", value: exam.passMark.toString(), icon: "✅" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 12,
                padding: "20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "hsl(var(--foreground))",
                  marginBottom: 4,
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "hsl(var(--muted-foreground))",
                  fontWeight: 500,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* System Check */}
        <div
          style={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            padding: "24px",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "hsl(var(--foreground))",
              margin: "0 0 16px",
            }}
          >
            System Check
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Browser Compatibility", status: systemCheck.browser },
              { label: "Internet Connection", status: isOnline },
              { label: "Fullscreen Support", status: systemCheck.fullscreen },
            ].map((check) => (
              <div
                key={check.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px",
                  background: "hsl(var(--secondary))",
                  borderRadius: 8,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: check.status ? "#22c55e" : "#ef4444",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  {check.status ? "✓" : "✗"}
                </div>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  {check.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div
          style={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            padding: "24px",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "hsl(var(--foreground))",
              margin: "0 0 16px",
            }}
          >
            📋 Instructions
          </h2>
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            {exam.instructions.map((instruction, index) => (
              <li
                key={index}
                style={{
                  fontSize: 14,
                  color: "hsl(var(--foreground))",
                  marginBottom: 12,
                  lineHeight: 1.6,
                }}
              >
                {instruction}
              </li>
            ))}
          </ol>
        </div>

        {/* Rules */}
        <div
          style={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            padding: "24px",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "hsl(var(--foreground))",
              margin: "0 0 16px",
            }}
          >
            ⚠️ Exam Rules
          </h2>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {exam.rules.map((rule, index) => (
              <li
                key={index}
                style={{
                  fontSize: 14,
                  color: "hsl(var(--foreground))",
                  marginBottom: 12,
                  lineHeight: 1.6,
                }}
              >
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Agreement */}
        <div
          style={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            padding: "24px",
            marginBottom: 24,
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "start",
              gap: 12,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{
                width: 20,
                height: 20,
                marginTop: 2,
                cursor: "pointer",
              }}
            />
            <span
              style={{
                fontSize: 14,
                color: "hsl(var(--foreground))",
                lineHeight: 1.6,
              }}
            >
              I have read and understood all the instructions and rules. I agree
              to comply with all exam regulations and understand that any
              violation may result in disqualification.
            </span>
          </label>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => navigate("/student/exams")}
            style={{
              background: "hsl(var(--secondary))",
              color: "hsl(var(--foreground))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 10,
              padding: "14px 28px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            ← Back to Exams
          </button>
          <button
            onClick={startExam}
            disabled={!agreed || !isOnline}
            style={{
              background:
                agreed && isOnline
                  ? "hsl(var(--primary))"
                  : "hsl(var(--muted))",
              color:
                agreed && isOnline
                  ? "hsl(var(--primary-foreground))"
                  : "hsl(var(--muted-foreground))",
              border: "none",
              borderRadius: 10,
              padding: "14px 28px",
              fontSize: 15,
              fontWeight: 600,
              cursor: agreed && isOnline ? "pointer" : "not-allowed",
              transition: "all 0.2s",
              opacity: agreed && isOnline ? 1 : 0.6,
            }}
          >
            Start Exam →
          </button>
        </div>
      </div>
    </div>
  );
}
