import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const mockResults = {
  1: {
    examId: 1,
    examName: "Mathematics Mid-Term Exam",
    subject: "Mathematics",
    class: "SS3A",
    instructor: "Mr. Johnson",
    date: "Apr 20, 2026",
    duration: 90,
    totalQuestions: 50,
    answeredQuestions: 48,
    correctAnswers: 39,
    wrongAnswers: 9,
    unansweredQuestions: 2,
    score: 78,
    grade: "B",
    passMark: 40,
    totalMarks: 100,
    obtainedMarks: 78,
    timeTaken: 85,
    submittedAt: "11:25 AM",
    status: "passed",
  },
  2: {
    examId: 2,
    examName: "English Language Quiz",
    subject: "English Language",
    class: "SS3A",
    instructor: "Mrs. Smith",
    date: "Apr 18, 2026",
    duration: 60,
    totalQuestions: 40,
    answeredQuestions: 40,
    correctAnswers: 36,
    wrongAnswers: 4,
    unansweredQuestions: 0,
    score: 91,
    grade: "A",
    passMark: 40,
    totalMarks: 100,
    obtainedMarks: 91,
    timeTaken: 55,
    submittedAt: "10:55 AM",
    status: "passed",
  },
  3: {
    examId: 3,
    examName: "Physics Final Exam",
    subject: "Physics",
    class: "SS3A",
    instructor: "Dr. Williams",
    date: "Apr 15, 2026",
    duration: 120,
    totalQuestions: 60,
    answeredQuestions: 60,
    correctAnswers: 27,
    wrongAnswers: 33,
    unansweredQuestions: 0,
    score: 45,
    grade: "F",
    passMark: 50,
    totalMarks: 100,
    obtainedMarks: 45,
    timeTaken: 118,
    submittedAt: "4:58 PM",
    status: "failed",
  },
  4: {
    examId: 4,
    examName: "Chemistry Test",
    subject: "Chemistry",
    class: "SS3A",
    instructor: "Dr. Brown",
    date: "Apr 12, 2026",
    duration: 90,
    totalQuestions: 50,
    answeredQuestions: 50,
    correctAnswers: 42,
    wrongAnswers: 8,
    unansweredQuestions: 0,
    score: 85,
    grade: "A",
    passMark: 40,
    totalMarks: 100,
    obtainedMarks: 85,
    timeTaken: 82,
    submittedAt: "11:22 AM",
    status: "passed",
  },
  5: {
    examId: 5,
    examName: "Biology Mid-Term Exam",
    subject: "Biology",
    class: "SS3A",
    instructor: "Mrs. Davis",
    date: "Apr 10, 2026",
    duration: 90,
    totalQuestions: 50,
    answeredQuestions: 50,
    correctAnswers: 36,
    wrongAnswers: 14,
    unansweredQuestions: 0,
    score: 72,
    grade: "B",
    passMark: 40,
    totalMarks: 100,
    obtainedMarks: 72,
    timeTaken: 87,
    submittedAt: "2:27 PM",
    status: "passed",
  },
  6: {
    examId: 6,
    examName: "Economics Quiz",
    subject: "Economics",
    class: "SS3A",
    instructor: "Mr. Thompson",
    date: "Apr 8, 2026",
    duration: 60,
    totalQuestions: 40,
    answeredQuestions: 40,
    correctAnswers: 35,
    wrongAnswers: 5,
    unansweredQuestions: 0,
    score: 88,
    grade: "A",
    passMark: 40,
    totalMarks: 100,
    obtainedMarks: 88,
    timeTaken: 58,
    submittedAt: "10:58 AM",
    status: "passed",
  },
  7: {
    examId: 7,
    examName: "Government Final Exam",
    subject: "Government",
    class: "SS3A",
    instructor: "Mrs. Anderson",
    date: "Apr 5, 2026",
    duration: 90,
    totalQuestions: 50,
    answeredQuestions: 50,
    correctAnswers: 32,
    wrongAnswers: 18,
    unansweredQuestions: 0,
    score: 65,
    grade: "C",
    passMark: 40,
    totalMarks: 100,
    obtainedMarks: 65,
    timeTaken: 88,
    submittedAt: "3:28 PM",
    status: "passed",
  },
  8: {
    examId: 8,
    examName: "Literature in English Test",
    subject: "Literature",
    class: "SS3A",
    instructor: "Dr. Martinez",
    date: "Apr 3, 2026",
    duration: 90,
    totalQuestions: 50,
    answeredQuestions: 50,
    correctAnswers: 39,
    wrongAnswers: 11,
    unansweredQuestions: 0,
    score: 79,
    grade: "B",
    passMark: 40,
    totalMarks: 100,
    obtainedMarks: 79,
    timeTaken: 84,
    submittedAt: "11:24 AM",
    status: "passed",
  },
  9: {
    examId: 9,
    examName: "Geography Mid-Term Exam",
    subject: "Geography",
    class: "SS3A",
    instructor: "Mr. Wilson",
    date: "Mar 30, 2026",
    duration: 90,
    totalQuestions: 50,
    answeredQuestions: 50,
    correctAnswers: 41,
    wrongAnswers: 9,
    unansweredQuestions: 0,
    score: 82,
    grade: "A",
    passMark: 40,
    totalMarks: 100,
    obtainedMarks: 82,
    timeTaken: 86,
    submittedAt: "2:26 PM",
    status: "passed",
  },
  10: {
    examId: 10,
    examName: "Computer Science Quiz",
    subject: "Computer Science",
    class: "SS3A",
    instructor: "Dr. Lee",
    date: "Mar 28, 2026",
    duration: 60,
    totalQuestions: 40,
    answeredQuestions: 40,
    correctAnswers: 38,
    wrongAnswers: 2,
    unansweredQuestions: 0,
    score: 95,
    grade: "A",
    passMark: 40,
    totalMarks: 100,
    obtainedMarks: 95,
    timeTaken: 52,
    submittedAt: "10:52 AM",
    status: "passed",
  },
  11: {
    examId: 11,
    examName: "Agricultural Science Test",
    subject: "Agricultural Science",
    class: "SS3A",
    instructor: "Mr. Garcia",
    date: "Mar 25, 2026",
    duration: 90,
    totalQuestions: 50,
    answeredQuestions: 50,
    correctAnswers: 35,
    wrongAnswers: 15,
    unansweredQuestions: 0,
    score: 70,
    grade: "B",
    passMark: 40,
    totalMarks: 100,
    obtainedMarks: 70,
    timeTaken: 89,
    submittedAt: "3:29 PM",
    status: "passed",
  },
  12: {
    examId: 12,
    examName: "Civic Education Quiz",
    subject: "Civic Education",
    class: "SS3A",
    instructor: "Mrs. Robinson",
    date: "Mar 22, 2026",
    duration: 60,
    totalQuestions: 40,
    answeredQuestions: 40,
    correctAnswers: 34,
    wrongAnswers: 6,
    unansweredQuestions: 0,
    score: 86,
    grade: "A",
    passMark: 40,
    totalMarks: 100,
    obtainedMarks: 86,
    timeTaken: 57,
    submittedAt: "10:57 AM",
    status: "passed",
  },
  13: {
    examId: 13,
    examName: "Further Mathematics Exam",
    subject: "Further Mathematics",
    class: "SS3A",
    instructor: "Dr. Patel",
    date: "Mar 20, 2026",
    duration: 120,
    totalQuestions: 60,
    answeredQuestions: 60,
    correctAnswers: 35,
    wrongAnswers: 25,
    unansweredQuestions: 0,
    score: 58,
    grade: "C",
    passMark: 40,
    totalMarks: 100,
    obtainedMarks: 58,
    timeTaken: 115,
    submittedAt: "4:55 PM",
    status: "passed",
  },
  14: {
    examId: 14,
    examName: "Technical Drawing Test",
    subject: "Technical Drawing",
    class: "SS3A",
    instructor: "Mr. Clark",
    date: "Mar 18, 2026",
    duration: 90,
    totalQuestions: 50,
    answeredQuestions: 50,
    correctAnswers: 37,
    wrongAnswers: 13,
    unansweredQuestions: 0,
    score: 75,
    grade: "B",
    passMark: 40,
    totalMarks: 100,
    obtainedMarks: 75,
    timeTaken: 88,
    submittedAt: "2:28 PM",
    status: "passed",
  },
  15: {
    examId: 15,
    examName: "Financial Accounting Quiz",
    subject: "Financial Accounting",
    class: "SS3A",
    instructor: "Mrs. Taylor",
    date: "Mar 15, 2026",
    duration: 90,
    totalQuestions: 50,
    answeredQuestions: 50,
    correctAnswers: 40,
    wrongAnswers: 10,
    unansweredQuestions: 0,
    score: 81,
    grade: "A",
    passMark: 40,
    totalMarks: 100,
    obtainedMarks: 81,
    timeTaken: 85,
    submittedAt: "11:25 AM",
    status: "passed",
  },
};

export function ExamResult() {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const result = examId
    ? mockResults[Number(examId) as keyof typeof mockResults]
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

  if (!result) {
    return (
      <div
        style={{
          fontFamily: "var(--font-inter)",
          background: "hsl(var(--background))",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>❌</div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 16,
              color: "hsl(var(--foreground))",
            }}
          >
            Result Not Found
          </h2>
          <button
            onClick={() => navigate("/student/exams")}
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
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  const isPassed = result.status === "passed";
  const accuracy = Math.round(
    (result.correctAnswers / result.answeredQuestions) * 100,
  );

  return (
    <div
      style={{
        fontFamily: "var(--font-inter)",
        background: "hsl(var(--background))",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            background: isPassed
              ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
              : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            borderRadius: 16,
            padding: "40px",
            marginBottom: 32,
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
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
              background: "rgba(255, 255, 255, 0.1)",
              filter: "blur(60px)",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>
              {isPassed ? "🎉" : "😔"}
            </div>
            <h1
              style={{
                color: "#fff",
                fontSize: 36,
                fontWeight: 800,
                margin: "0 0 8px",
                letterSpacing: "-0.02em",
              }}
            >
              {isPassed ? "Congratulations!" : "Keep Trying!"}
            </h1>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: 16,
                margin: "0 0 24px",
              }}
            >
              {isPassed
                ? "You have successfully passed the exam"
                : "You didn't pass this time, but you can do better next time"}
            </p>

            {/* Score Circle */}
            <div
              style={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                border: "8px solid rgba(255, 255, 255, 0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {result.score}%
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#fff",
                  marginTop: 8,
                }}
              >
                {result.grade}
              </div>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
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
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* Exam Details */}
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
              margin: "0 0 20px",
            }}
          >
            📋 Exam Details
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {[
              { label: "Exam Name", value: result.examName },
              { label: "Subject", value: result.subject },
              { label: "Class", value: result.class },
              { label: "Instructor", value: result.instructor },
              { label: "Date", value: result.date },
              { label: "Submitted At", value: result.submittedAt },
              {
                label: "Time Taken",
                value: `${result.timeTaken} / ${result.duration} mins`,
              },
              {
                label: "Pass Mark",
                value: `${result.passMark}/${result.totalMarks}`,
              },
            ].map((item) => (
              <div key={item.label}>
                <div
                  style={{
                    fontSize: 12,
                    color: "hsl(var(--muted-foreground))",
                    marginBottom: 4,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Stats */}
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
              label: "Total Questions",
              value: result.totalQuestions.toString(),
              icon: "❓",
              color: "#1b7fc4",
            },
            {
              label: "Answered",
              value: result.answeredQuestions.toString(),
              icon: "✍️",
              color: "#f59e0b",
            },
            {
              label: "Correct",
              value: result.correctAnswers.toString(),
              icon: "✅",
              color: "#22c55e",
            },
            {
              label: "Wrong",
              value: result.wrongAnswers.toString(),
              icon: "❌",
              color: "#ef4444",
            },
            {
              label: "Unanswered",
              value: result.unansweredQuestions.toString(),
              icon: "⚠️",
              color: "#9ca3af",
            },
            {
              label: "Accuracy",
              value: `${accuracy}%`,
              icon: "🎯",
              color: "hsl(var(--primary))",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 16,
                padding: "20px",
                textAlign: "center",
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
              <div style={{ fontSize: 32, marginBottom: 8 }}>{stat.icon}</div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: stat.color,
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

        {/* Score Breakdown */}
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
              margin: "0 0 20px",
            }}
          >
            📊 Score Breakdown
          </h2>
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "hsl(var(--foreground))",
                }}
              >
                Obtained Marks
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "hsl(var(--primary))",
                }}
              >
                {result.obtainedMarks} / {result.totalMarks}
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 12,
                background: "hsl(var(--secondary))",
                borderRadius: 100,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${result.score}%`,
                  height: "100%",
                  background: isPassed
                    ? "linear-gradient(90deg, #22c55e 0%, #16a34a 100%)"
                    : "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)",
                  transition: "width 1s ease-out",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "hsl(var(--foreground))",
                }}
              >
                Pass Mark
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#f59e0b",
                }}
              >
                {result.passMark} / {result.totalMarks}
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 12,
                background: "hsl(var(--secondary))",
                borderRadius: 100,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(result.passMark / result.totalMarks) * 100}%`,
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
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
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ← Back to Exams
          </button>
          <button
            onClick={() => navigate("/student/results")}
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              border: "none",
              borderRadius: 10,
              padding: "14px 28px",
              fontSize: 15,
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
            View All Results →
          </button>
        </div>
      </div>
    </div>
  );
}
