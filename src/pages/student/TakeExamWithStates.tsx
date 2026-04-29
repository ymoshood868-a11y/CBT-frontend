import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ExamStateHandler } from "@/components/exam/ExamStateHandler";
import { useExamState } from "@/hooks/exam/useExamState";
import { ExamSession, ExamSessionStatus } from "@/types/exam.types";

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

export function TakeExamWithStates() {
  const navigate = useNavigate();
  const { examId } = useParams();

  // Exam Session State
  const [session, setSession] = useState<ExamSession>({
    id: 1,
    examId: parseInt(examId || "1"),
    studentId: 1,
    status: "not_started",
    startedAt: null,
    pausedAt: null,
    resumedAt: null,
    submittedAt: null,
    expiresAt: null,
    timeRemaining: 90 * 60, // 90 minutes
    progress: 0,
    answeredQuestions: 0,
    totalQuestions: 50,
    flaggedQuestions: [],
    suspiciousActivities: [],
    tabSwitches: 0,
    violations: 0,
    connectionStatus: "online",
    lastActivity: new Date().toISOString(),
  });

  const { examState, canTransition } = useExamState(session);

  // Exam UI State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [showCalculator, setShowCalculator] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
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

  // Start Exam
  const handleStartExam = () => {
    const transition = canTransition(session.status, "in_progress");
    if (!transition.allowed) {
      alert(transition.reason);
      return;
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + session.timeRemaining * 1000);

    setSession({
      ...session,
      status: "in_progress",
      startedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    });

    // Request fullscreen
    document.documentElement.requestFullscreen().catch((err) => {
      console.error("Failed to enter fullscreen:", err);
    });
  };

  // Pause Exam
  const handlePauseExam = () => {
    const transition = canTransition(session.status, "paused");
    if (!transition.allowed) {
      alert(transition.reason);
      return;
    }

    setSession({
      ...session,
      status: "paused",
      pausedAt: new Date().toISOString(),
    });
  };

  // Resume Exam
  const handleResumeExam = () => {
    const transition = canTransition(session.status, "in_progress");
    if (!transition.allowed) {
      alert(transition.reason);
      return;
    }

    setSession({
      ...session,
      status: "in_progress",
      resumedAt: new Date().toISOString(),
    });

    // Request fullscreen again
    document.documentElement.requestFullscreen().catch((err) => {
      console.error("Failed to enter fullscreen:", err);
    });
  };

  // Submit Exam
  const handleSubmitExam = () => {
    const transition = canTransition(session.status, "submitted");
    if (!transition.allowed) {
      alert(transition.reason);
      return;
    }

    setSession({
      ...session,
      status: "submitted",
      submittedAt: new Date().toISOString(),
    });

    // Exit fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    // Navigate to results after a delay
    setTimeout(() => {
      navigate(`/student/results/${examId}`);
    }, 2000);
  };

  // Auto Submit (when time expires)
  const handleAutoSubmit = () => {
    setSession({
      ...session,
      status: "expired",
      submittedAt: new Date().toISOString(),
    });

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    setTimeout(() => {
      navigate(`/student/results/${examId}`);
    }, 3000);
  };

  // Force Submit (by invigilator or violations)
  const handleForceSubmit = (reason: string) => {
    setSession({
      ...session,
      status: "force_submitted",
      submittedAt: new Date().toISOString(),
      suspiciousActivities: [...session.suspiciousActivities, reason],
    });

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    setTimeout(() => {
      navigate(`/student/results/${examId}`);
    }, 2000);
  };

  // Timer - only runs when exam is in progress
  useEffect(() => {
    if (session.status !== "in_progress") return;

    const timer = setInterval(() => {
      setSession((prev) => {
        const newTimeRemaining = prev.timeRemaining - 1;

        if (newTimeRemaining <= 0) {
          handleAutoSubmit();
          return { ...prev, timeRemaining: 0 };
        }

        return { ...prev, timeRemaining: newTimeRemaining };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [session.status]);

  // Auto-save - only when exam is in progress
  useEffect(() => {
    if (session.status !== "in_progress") return;

    autoSaveInterval.current = setInterval(() => {
      saveAnswers();
    }, 30000); // Every 30 seconds

    return () => {
      if (autoSaveInterval.current) {
        clearInterval(autoSaveInterval.current);
      }
    };
  }, [session.status, answers]);

  // Save answers
  const saveAnswers = () => {
    setAutoSaveStatus("saving");
    // Simulate API call
    setTimeout(() => {
      setAutoSaveStatus("saved");
      setTimeout(() => setAutoSaveStatus(""), 2000);
    }, 500);
  };

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => {
      setSession((prev) => ({ ...prev, connectionStatus: "online" }));
      setShowWarning(false);
    };
    const handleOffline = () => {
      setSession((prev) => ({ ...prev, connectionStatus: "offline" }));
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
    if (session.status !== "in_progress") return;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        const newViolations = session.violations + 1;
        setSession((prev) => ({
          ...prev,
          violations: newViolations,
          suspiciousActivities: [
            ...prev.suspiciousActivities,
            `Exited fullscreen at ${new Date().toLocaleTimeString()}`,
          ],
        }));

        if (newViolations >= 3) {
          handleForceSubmit("Exceeded maximum violations (3 strikes)");
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
  }, [session.status, session.violations]);

  // Tab switch detection
  useEffect(() => {
    if (session.status !== "in_progress") return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const newTabSwitches = session.tabSwitches + 1;
        const newViolations = session.violations + 1;

        setSession((prev) => ({
          ...prev,
          tabSwitches: newTabSwitches,
          violations: newViolations,
          suspiciousActivities: [
            ...prev.suspiciousActivities,
            `Tab switched at ${new Date().toLocaleTimeString()}`,
          ],
        }));

        if (newViolations >= 3) {
          handleForceSubmit("Exceeded maximum violations (3 strikes)");
        } else {
          setWarningType("tab");
          setShowWarning(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [session.status, session.tabSwitches, session.violations]);

  // Format time
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    setSession((prev) => ({
      ...prev,
      answeredQuestions: Object.keys({ ...answers, [currentQuestion]: answer })
        .length,
      progress:
        (Object.keys({ ...answers, [currentQuestion]: answer }).length /
          prev.totalQuestions) *
        100,
    }));
  };

  // Toggle flag
  const toggleFlag = () => {
    const newFlagged = new Set(flagged);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlagged(newFlagged);
    setSession((prev) => ({
      ...prev,
      flaggedQuestions: Array.from(newFlagged),
    }));
  };

  // Show state handler for non-in-progress states
  if (session.status !== "in_progress") {
    return (
      <ExamStateHandler
        status={session.status}
        onStart={handleStartExam}
        onResume={handleResumeExam}
        examTitle="Mathematics Mid-Term Exam"
        timeRemaining={session.timeRemaining}
        message={examState.message}
      />
    );
  }

  // Exam Interface (when in progress)
  return (
    <div
      style={{
        fontFamily: "var(--font-inter)",
        background: darkMode ? "#1a1a1a" : "hsl(var(--background))",
        minHeight: "100vh",
        color: darkMode ? "#fff" : "hsl(var(--foreground))",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          background: darkMode ? "#2a2a2a" : "hsl(var(--card))",
          borderBottom: `1px solid ${darkMode ? "#3a3a3a" : "hsl(var(--border))"}`,
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
            Mathematics Mid-Term Exam
          </h1>
          <div
            style={{
              fontSize: 13,
              color: darkMode ? "#999" : "hsl(var(--muted-foreground))",
              marginTop: 4,
            }}
          >
            Question {currentQuestion + 1} of {mockQuestions.length}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {/* Timer */}
          <div
            style={{
              background:
                session.timeRemaining < 300
                  ? "rgba(239, 68, 68, 0.1)"
                  : darkMode
                    ? "#3a3a3a"
                    : "hsl(var(--secondary))",
              border: `1px solid ${session.timeRemaining < 300 ? "#ef4444" : darkMode ? "#4a4a4a" : "hsl(var(--border))"}`,
              borderRadius: 8,
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 18 }}>⏱️</span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "monospace",
                color:
                  session.timeRemaining < 300
                    ? "#ef4444"
                    : darkMode
                      ? "#fff"
                      : "hsl(var(--foreground))",
              }}
            >
              {formatTime(session.timeRemaining)}
            </span>
          </div>

          {/* Violations Counter */}
          {session.violations > 0 && (
            <div
              style={{
                background:
                  session.violations === 1
                    ? "rgba(245, 158, 11, 0.1)"
                    : session.violations === 2
                      ? "rgba(239, 68, 68, 0.1)"
                      : "rgba(239, 68, 68, 0.2)",
                border: `1px solid ${session.violations === 1 ? "#f59e0b" : "#ef4444"}`,
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                color: session.violations === 1 ? "#f59e0b" : "#ef4444",
              }}
            >
              ⚠️ Warning {session.violations} of 3
            </div>
          )}

          {/* Auto-save indicator */}
          {autoSaveStatus && (
            <div style={{ fontSize: 13, color: "#22c55e" }}>
              {autoSaveStatus === "saving" ? "💾 Saving..." : "✅ Saved"}
            </div>
          )}

          {/* Calculator */}
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            style={{
              background: showCalculator
                ? "hsl(var(--primary))"
                : darkMode
                  ? "#3a3a3a"
                  : "hsl(var(--secondary))",
              color: showCalculator
                ? "hsl(var(--primary-foreground))"
                : darkMode
                  ? "#fff"
                  : "hsl(var(--foreground))",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            🔢 Calculator
          </button>

          {/* Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: darkMode ? "#3a3a3a" : "hsl(var(--secondary))",
              color: darkMode ? "#fff" : "hsl(var(--foreground))",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Pause Button */}
          <button
            onClick={handlePauseExam}
            style={{
              background: "#f59e0b",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ⏸️ Pause
          </button>

          {/* End Exam */}
          <button
            onClick={() => setShowEndExamDialog(true)}
            style={{
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            End Exam
          </button>
        </div>
      </div>

      {/* Warning Banner */}
      {showWarning && (
        <div
          style={{
            background:
              session.violations === 1
                ? "rgba(245, 158, 11, 0.9)"
                : "rgba(239, 68, 68, 0.9)",
            color: "#fff",
            padding: "16px 24px",
            textAlign: "center",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {warningType === "fullscreen" && (
            <>
              ⚠️ Warning {session.violations} of 3: You exited fullscreen mode!{" "}
              {session.violations === 1 &&
                "Two more violations will auto-submit your exam."}
              {session.violations === 2 &&
                "One more violation will auto-submit your exam!"}
            </>
          )}
          {warningType === "tab" && (
            <>
              ⚠️ Warning {session.violations} of 3: You switched tabs!{" "}
              {session.violations === 1 &&
                "Two more violations will auto-submit your exam."}
              {session.violations === 2 &&
                "One more violation will auto-submit your exam!"}
            </>
          )}
          {warningType === "offline" &&
            "⚠️ You are offline. Your answers will be saved locally."}
          <button
            onClick={() => setShowWarning(false)}
            style={{
              marginLeft: 16,
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              borderRadius: 6,
              padding: "4px 12px",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Content */}
      <div style={{ padding: 24 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Question */}
          <div
            style={{
              background: darkMode ? "#2a2a2a" : "hsl(var(--card))",
              border: `1px solid ${darkMode ? "#3a3a3a" : "hsl(var(--border))"}`,
              borderRadius: 12,
              padding: 32,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>
                Question {currentQuestion + 1}
              </h2>
              <button
                onClick={toggleFlag}
                style={{
                  background: flagged.has(currentQuestion)
                    ? "#f59e0b"
                    : darkMode
                      ? "#3a3a3a"
                      : "hsl(var(--secondary))",
                  color: flagged.has(currentQuestion)
                    ? "#fff"
                    : darkMode
                      ? "#fff"
                      : "hsl(var(--foreground))",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {flagged.has(currentQuestion) ? "🚩 Flagged" : "🏳️ Flag"}
              </button>
            </div>

            <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
              {mockQuestions[currentQuestion].text}
            </p>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {mockQuestions[currentQuestion].options?.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(option)}
                  style={{
                    background:
                      answers[currentQuestion] === option
                        ? "hsl(var(--primary))"
                        : darkMode
                          ? "#3a3a3a"
                          : "hsl(var(--secondary))",
                    color:
                      answers[currentQuestion] === option
                        ? "hsl(var(--primary-foreground))"
                        : darkMode
                          ? "#fff"
                          : "hsl(var(--foreground))",
                    border: `2px solid ${answers[currentQuestion] === option ? "hsl(var(--primary))" : darkMode ? "#4a4a4a" : "hsl(var(--border))"}`,
                    borderRadius: 10,
                    padding: "16px 20px",
                    fontSize: 15,
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {String.fromCharCode(65 + idx)}. {option}
                </button>
              ))}
            </div>
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
              onClick={() =>
                setCurrentQuestion(Math.max(0, currentQuestion - 1))
              }
              disabled={currentQuestion === 0}
              style={{
                background: darkMode ? "#3a3a3a" : "hsl(var(--secondary))",
                color: darkMode ? "#fff" : "hsl(var(--foreground))",
                border: "none",
                borderRadius: 10,
                padding: "12px 24px",
                fontSize: 15,
                fontWeight: 600,
                cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
                opacity: currentQuestion === 0 ? 0.5 : 1,
              }}
            >
              ← Previous
            </button>

            <button
              onClick={() => setShowSubmitDialog(true)}
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                border: "none",
                borderRadius: 10,
                padding: "12px 32px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Submit Exam
            </button>

            <button
              onClick={() =>
                setCurrentQuestion(
                  Math.min(mockQuestions.length - 1, currentQuestion + 1),
                )
              }
              disabled={currentQuestion === mockQuestions.length - 1}
              style={{
                background: darkMode ? "#3a3a3a" : "hsl(var(--secondary))",
                color: darkMode ? "#fff" : "hsl(var(--foreground))",
                border: "none",
                borderRadius: 10,
                padding: "12px 24px",
                fontSize: 15,
                fontWeight: 600,
                cursor:
                  currentQuestion === mockQuestions.length - 1
                    ? "not-allowed"
                    : "pointer",
                opacity: currentQuestion === mockQuestions.length - 1 ? 0.5 : 1,
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Submit Dialog */}
      {showSubmitDialog && (
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
          onClick={() => setShowSubmitDialog(false)}
        >
          <div
            style={{
              background: darkMode ? "#2a2a2a" : "hsl(var(--card))",
              borderRadius: 16,
              padding: 32,
              maxWidth: 500,
              width: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
              Submit Exam?
            </h2>
            <p
              style={{
                fontSize: 15,
                marginBottom: 24,
                color: darkMode ? "#999" : "hsl(var(--muted-foreground))",
              }}
            >
              You have answered {session.answeredQuestions} out of{" "}
              {session.totalQuestions} questions.
              {session.totalQuestions - session.answeredQuestions > 0 && (
                <>
                  {" "}
                  You have {session.totalQuestions -
                    session.answeredQuestions}{" "}
                  unanswered questions.
                </>
              )}
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setShowSubmitDialog(false)}
                style={{
                  flex: 1,
                  background: darkMode ? "#3a3a3a" : "hsl(var(--secondary))",
                  color: darkMode ? "#fff" : "hsl(var(--foreground))",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitExam}
                style={{
                  flex: 1,
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* End Exam Dialog */}
      {showEndExamDialog && (
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
          onClick={() => setShowEndExamDialog(false)}
        >
          <div
            style={{
              background: darkMode ? "#2a2a2a" : "hsl(var(--card))",
              borderRadius: 16,
              padding: 32,
              maxWidth: 500,
              width: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
              End Exam?
            </h2>
            <p
              style={{
                fontSize: 15,
                marginBottom: 24,
                color: darkMode ? "#999" : "hsl(var(--muted-foreground))",
              }}
            >
              Are you sure you want to end the exam? This action cannot be
              undone.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setShowEndExamDialog(false)}
                style={{
                  flex: 1,
                  background: darkMode ? "#3a3a3a" : "hsl(var(--secondary))",
                  color: darkMode ? "#fff" : "hsl(var(--foreground))",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitExam}
                style={{
                  flex: 1,
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                End Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
