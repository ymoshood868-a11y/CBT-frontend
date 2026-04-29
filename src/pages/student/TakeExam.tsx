import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

interface Question {
  id: number;
  text: string;
  type: "multiple_choice" | "essay";
  options?: string[];
  answer?: string;
  flagged?: boolean;
}

const mockQuestions: Question[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  text: `Question ${i + 1}: What is the solution to the equation ${i + 1}x + ${i + 2} = ${(i + 1) * 5}?`,
  type: "multiple_choice",
  options: [`x = ${i + 1}`, `x = ${i + 2}`, `x = ${i + 3}`, `x = ${i + 4}`],
}));

export function TakeExam() {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showCalculator, setShowCalculator] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [violations, setViolations] = useState(0); // Track total violations
  const [showWarning, setShowWarning] = useState(false);
  const [warningType, setWarningType] = useState<
    "fullscreen" | "tab" | "offline" | null
  >(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<"saved" | "saving" | "">(
    "",
  );
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showEndExamDialog, setShowEndExamDialog] = useState(false);
  const autoSaveInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-save
  useEffect(() => {
    autoSaveInterval.current = setInterval(() => {
      saveAnswers();
    }, 30000); // Every 30 seconds

    return () => {
      if (autoSaveInterval.current) {
        clearInterval(autoSaveInterval.current);
      }
    };
  }, [answers]);

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowWarning(false);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setWarningType("offline");
      setShowWarning(true);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Fullscreen detection with 3-strike system
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        const newViolations = violations + 1;
        setViolations(newViolations);

        if (newViolations >= 3) {
          alert(
            "You have violated exam rules 3 times. Your exam will be submitted automatically.",
          );
          handleAutoSubmit();
        } else {
          setWarningType("fullscreen");
          setShowWarning(true);
        }
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [violations]);

  // Tab switch detection with 3-strike system
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const newTabSwitches = tabSwitches + 1;
        const newViolations = violations + 1;

        setTabSwitches(newTabSwitches);
        setViolations(newViolations);

        if (newViolations >= 3) {
          // Auto-submit after 3 violations
          alert(
            "You have violated exam rules 3 times. Your exam will be submitted automatically.",
          );
          handleAutoSubmit();
        } else {
          // Show warning
          setWarningType("tab");
          setShowWarning(true);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [tabSwitches, violations]);

  // Prevent right-click and shortcuts
  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => e.preventDefault();
    const preventShortcuts = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === "c" || e.key === "v" || e.key === "x")) ||
        e.key === "F12"
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("keydown", preventShortcuts);
    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("keydown", preventShortcuts);
    };
  }, []);

  const saveAnswers = () => {
    setAutoSaveStatus("saving");
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem(`exam_${examId}_answers`, JSON.stringify(answers));
      localStorage.setItem(
        `exam_${examId}_flagged`,
        JSON.stringify(Array.from(flagged)),
      );
      setAutoSaveStatus("saved");
      setTimeout(() => setAutoSaveStatus(""), 2000);
    }, 500);
  };

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: answer }));
  };

  const toggleFlag = () => {
    setFlagged((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion);
      } else {
        newSet.add(currentQuestion);
      }
      return newSet;
    });
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleJumpTo = (index: number) => {
    setCurrentQuestion(index);
  };

  const handleSubmit = () => {
    setShowSubmitDialog(true);
  };

  const confirmSubmit = () => {
    saveAnswers();
    // Exit fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    navigate(`/student/exam/${examId}/result`);
  };

  const handleAutoSubmit = () => {
    saveAnswers();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    alert("Time's up! Your exam has been auto-submitted.");
    navigate(`/student/exam/${examId}/result`);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = flagged.size;
  const unansweredCount = mockQuestions.length - answeredCount;

  const question = mockQuestions[currentQuestion];

  return (
    <div
      style={{
        fontFamily: "var(--font-inter)",
        background: darkMode ? "#1a1a1a" : "hsl(var(--background))",
        minHeight: "100vh",
        color: darkMode ? "#fff" : "hsl(var(--foreground))",
        transition: "all 0.3s",
      }}
    >
      {/* Warning Overlay */}
      {showWarning && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: darkMode ? "#2a2a2a" : "#fff",
              borderRadius: 16,
              padding: "40px",
              maxWidth: 500,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 20 }}>
              {warningType === "fullscreen" && "⚠️"}
              {warningType === "tab" && "🚫"}
              {warningType === "offline" && "📡"}
            </div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 800,
                marginBottom: 16,
                color: "#ef4444",
              }}
            >
              {warningType === "fullscreen" && "Fullscreen Required!"}
              {warningType === "tab" && "Tab Switch Detected!"}
              {warningType === "offline" && "Connection Lost!"}
            </h2>

            {/* Violation Counter */}
            {warningType !== "offline" && (
              <div
                style={{
                  background:
                    violations >= 2
                      ? "rgba(239, 68, 68, 0.1)"
                      : "rgba(245, 158, 11, 0.1)",
                  border: `2px solid ${violations >= 2 ? "#ef4444" : "#f59e0b"}`,
                  borderRadius: 12,
                  padding: "16px",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: violations >= 2 ? "#ef4444" : "#f59e0b",
                    marginBottom: 8,
                  }}
                >
                  Warning {violations} of 3
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: violations >= 2 ? "#ef4444" : "#f59e0b",
                    fontWeight: 600,
                  }}
                >
                  {violations === 1 &&
                    "First warning! Two more violations will auto-submit your exam."}
                  {violations === 2 &&
                    "Second warning! One more violation will auto-submit your exam."}
                </div>
              </div>
            )}

            <p style={{ fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>
              {warningType === "fullscreen" &&
                "You must remain in fullscreen mode during the exam. This incident has been logged."}
              {warningType === "tab" &&
                `You have switched tabs ${tabSwitches} time(s). This incident has been logged and may affect your exam.`}
              {warningType === "offline" &&
                "Your internet connection was lost. The exam is paused. Please reconnect to continue."}
            </p>
            {warningType !== "offline" && (
              <button
                onClick={async () => {
                  if (warningType === "fullscreen") {
                    await document.documentElement.requestFullscreen();
                  }
                  setShowWarning(false);
                }}
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 32px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {warningType === "fullscreen"
                  ? "Return to Fullscreen"
                  : "Continue Exam"}
              </button>
            )}
            {warningType === "offline" && (
              <div style={{ fontSize: 14, color: "#9ca3af" }}>
                Waiting for connection...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Submit Confirmation Dialog */}
      {showSubmitDialog && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: darkMode ? "#2a2a2a" : "#fff",
              borderRadius: 16,
              padding: "32px",
              maxWidth: 500,
            }}
          >
            <h2
              style={{
                fontSize: 24,
                fontWeight: 800,
                marginBottom: 16,
              }}
            >
              Submit Exam?
            </h2>
            <p style={{ fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>
              You have answered <strong>{answeredCount}</strong> out of{" "}
              <strong>{mockQuestions.length}</strong> questions.
              {unansweredCount > 0 && (
                <span
                  style={{ color: "#ef4444", display: "block", marginTop: 8 }}
                >
                  {unansweredCount} question(s) are still unanswered!
                </span>
              )}
            </p>
            <p style={{ fontSize: 14, marginBottom: 24, color: "#9ca3af" }}>
              Once submitted, you cannot change your answers. Are you sure you
              want to submit?
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setShowSubmitDialog(false)}
                style={{
                  flex: 1,
                  background: darkMode ? "#3a3a3a" : "hsl(var(--secondary))",
                  color: darkMode ? "#fff" : "hsl(var(--foreground))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 10,
                  padding: "12px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                style={{
                  flex: 1,
                  background: "#22c55e",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* End Exam Confirmation Dialog */}
      {showEndExamDialog && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: darkMode ? "#2a2a2a" : "#fff",
              borderRadius: 16,
              padding: "32px",
              maxWidth: 500,
            }}
          >
            <h2
              style={{
                fontSize: 24,
                fontWeight: 800,
                marginBottom: 16,
                color: "#ef4444",
              }}
            >
              🛑 End Exam?
            </h2>
            <p style={{ fontSize: 15, marginBottom: 16, lineHeight: 1.6 }}>
              Are you sure you want to end this exam?
            </p>
            <p style={{ fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>
              You have answered <strong>{answeredCount}</strong> out of{" "}
              <strong>{mockQuestions.length}</strong> questions.
              {unansweredCount > 0 && (
                <span
                  style={{
                    color: "#ef4444",
                    display: "block",
                    marginTop: 8,
                    fontWeight: 600,
                  }}
                >
                  ⚠️ {unansweredCount} question(s) are still unanswered!
                </span>
              )}
            </p>
            <p style={{ fontSize: 14, marginBottom: 24, color: "#9ca3af" }}>
              Once you end the exam, you cannot change your answers. This action
              cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setShowEndExamDialog(false)}
                style={{
                  flex: 1,
                  background: darkMode ? "#3a3a3a" : "hsl(var(--secondary))",
                  color: darkMode ? "#fff" : "hsl(var(--foreground))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 10,
                  padding: "12px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowEndExamDialog(false);
                  confirmSubmit();
                }}
                style={{
                  flex: 1,
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Yes, End Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calculator */}
      {showCalculator && (
        <div
          style={{
            position: "fixed",
            top: 80,
            right: 20,
            background: darkMode ? "#2a2a2a" : "#fff",
            border: "1px solid hsl(var(--border))",
            borderRadius: 12,
            padding: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>
              Calculator
            </h3>
            <button
              onClick={() => setShowCalculator(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: 18,
                cursor: "pointer",
                color: darkMode ? "#fff" : "#000",
              }}
            >
              ×
            </button>
          </div>
          <input
            type="text"
            placeholder="0"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: 20,
              textAlign: "right",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              marginBottom: 12,
              background: darkMode ? "#1a1a1a" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
            }}
          >
            {[
              "7",
              "8",
              "9",
              "/",
              "4",
              "5",
              "6",
              "*",
              "1",
              "2",
              "3",
              "-",
              "0",
              ".",
              "=",
              "+",
            ].map((btn) => (
              <button
                key={btn}
                style={{
                  padding: "12px",
                  fontSize: 16,
                  fontWeight: 600,
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  cursor: "pointer",
                  background: darkMode ? "#3a3a3a" : "hsl(var(--secondary))",
                  color: darkMode ? "#fff" : "#000",
                }}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div
        style={{
          background: darkMode ? "#2a2a2a" : "hsl(var(--background))",
          borderBottom: `1px solid ${darkMode ? "#3a3a3a" : "hsl(var(--border))"}`,
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>
            Mathematics Mid-Term Exam
          </h1>
          <div
            style={{
              fontSize: 13,
              color: darkMode ? "#9ca3af" : "hsl(var(--muted-foreground))",
            }}
          >
            Question {currentQuestion + 1} of {mockQuestions.length}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Auto-save indicator */}
          {autoSaveStatus && (
            <div
              style={{
                fontSize: 12,
                color: autoSaveStatus === "saved" ? "#22c55e" : "#f59e0b",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {autoSaveStatus === "saving" ? "💾 Saving..." : "✓ Saved"}
            </div>
          )}

          {/* Connection status */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: isOnline ? "#22c55e" : "#ef4444",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: isOnline ? "#22c55e" : "#ef4444",
              }}
            />
            {isOnline ? "Online" : "Offline"}
          </div>

          {/* Timer */}
          <div
            style={{
              background:
                timeLeft < 300
                  ? "#ef4444"
                  : darkMode
                    ? "#3a3a3a"
                    : "hsl(var(--primary))",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            ⏱️ {formatTime(timeLeft)}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Calculator */}
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            style={{
              background: darkMode ? "#3a3a3a" : "hsl(var(--secondary))",
              border: "none",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            🔢
          </button>

          {/* End Exam Button */}
          <button
            onClick={() => setShowEndExamDialog(true)}
            style={{
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 20px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#dc2626";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ef4444";
            }}
          >
            🛑 End Exam
          </button>
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 73px)" }}>
        {/* Question Navigation Sidebar */}
        <div
          style={{
            width: 280,
            background: darkMode ? "#2a2a2a" : "hsl(var(--background))",
            borderRight: `1px solid ${darkMode ? "#3a3a3a" : "hsl(var(--border))"}`,
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>
            Question Navigator
          </h3>

          {/* Stats */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                marginBottom: 8,
              }}
            >
              <span>Answered:</span>
              <span style={{ fontWeight: 700, color: "#22c55e" }}>
                {answeredCount}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                marginBottom: 8,
              }}
            >
              <span>Flagged:</span>
              <span style={{ fontWeight: 700, color: "#f59e0b" }}>
                {flaggedCount}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
              }}
            >
              <span>Unanswered:</span>
              <span style={{ fontWeight: 700, color: "#ef4444" }}>
                {unansweredCount}
              </span>
            </div>
          </div>

          {/* Question Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 8,
            }}
          >
            {mockQuestions.map((_, index) => {
              const isAnswered = answers[index] !== undefined;
              const isFlagged = flagged.has(index);
              const isCurrent = index === currentQuestion;

              return (
                <button
                  key={index}
                  onClick={() => handleJumpTo(index)}
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    border: isCurrent
                      ? "2px solid hsl(var(--primary))"
                      : `1px solid ${darkMode ? "#3a3a3a" : "hsl(var(--border))"}`,
                    borderRadius: 8,
                    background: isAnswered
                      ? "#22c55e"
                      : darkMode
                        ? "#3a3a3a"
                        : "hsl(var(--secondary))",
                    color: isAnswered ? "#fff" : darkMode ? "#fff" : "#000",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.2s",
                  }}
                >
                  {index + 1}
                  {isFlagged && (
                    <span
                      style={{
                        position: "absolute",
                        top: -4,
                        right: -4,
                        fontSize: 12,
                      }}
                    >
                      🚩
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            padding: "32px",
            overflowY: "auto",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            {/* Question */}
            <div
              style={{
                background: darkMode ? "#2a2a2a" : "hsl(var(--background))",
                border: `1px solid ${darkMode ? "#3a3a3a" : "hsl(var(--border))"}`,
                borderRadius: 16,
                padding: "32px",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: 24,
                }}
              >
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  Question {currentQuestion + 1}
                </h2>
                <button
                  onClick={toggleFlag}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: 24,
                    cursor: "pointer",
                    opacity: flagged.has(currentQuestion) ? 1 : 0.3,
                  }}
                >
                  🚩
                </button>
              </div>

              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  marginBottom: 32,
                }}
              >
                {question.text}
              </p>

              {/* Options */}
              {question.type === "multiple_choice" && question.options && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {question.options.map((option, index) => (
                    <label
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "16px",
                        background:
                          answers[currentQuestion] === option
                            ? darkMode
                              ? "#3a3a3a"
                              : "hsl(var(--primary) / 0.1)"
                            : darkMode
                              ? "#1a1a1a"
                              : "hsl(var(--secondary))",
                        border: `2px solid ${
                          answers[currentQuestion] === option
                            ? "hsl(var(--primary))"
                            : darkMode
                              ? "#3a3a3a"
                              : "hsl(var(--border))"
                        }`,
                        borderRadius: 12,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value={option}
                        checked={answers[currentQuestion] === option}
                        onChange={() => handleAnswer(option)}
                        style={{
                          width: 20,
                          height: 20,
                          cursor: "pointer",
                        }}
                      />
                      <span style={{ fontSize: 15 }}>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                style={{
                  flex: 1,
                  background: darkMode ? "#3a3a3a" : "hsl(var(--secondary))",
                  color: darkMode ? "#fff" : "hsl(var(--foreground))",
                  border: "none",
                  borderRadius: 10,
                  padding: "14px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
                  opacity: currentQuestion === 0 ? 0.5 : 1,
                }}
              >
                ← Previous
              </button>

              {currentQuestion === mockQuestions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  style={{
                    flex: 1,
                    background: "#22c55e",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "14px",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Submit Exam
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  style={{
                    flex: 1,
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    border: "none",
                    borderRadius: 10,
                    padding: "14px",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
