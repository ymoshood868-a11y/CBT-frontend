import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const questions = [
  {
    id: 1,
    subject: "Mathematics",
    topic: "Algebra",
    question: "Solve for x: 2x + 5 = 15",
    type: "multiple_choice",
    difficulty: "easy",
    options: ["x = 5", "x = 10", "x = 7.5", "x = 2.5"],
    correctAnswer: "x = 5",
    createdAt: "2026-04-20",
  },
  {
    id: 2,
    subject: "Mathematics",
    topic: "Geometry",
    question: "What is the area of a circle with radius 7cm? (Use π = 22/7)",
    type: "multiple_choice",
    difficulty: "medium",
    options: ["154 cm²", "144 cm²", "164 cm²", "174 cm²"],
    correctAnswer: "154 cm²",
    createdAt: "2026-04-19",
  },
  {
    id: 3,
    subject: "English Language",
    topic: "Grammar",
    question: "Identify the verb in the sentence: 'The cat sleeps on the mat.'",
    type: "multiple_choice",
    difficulty: "easy",
    options: ["cat", "sleeps", "mat", "the"],
    correctAnswer: "sleeps",
    createdAt: "2026-04-18",
  },
  {
    id: 4,
    subject: "Physics",
    topic: "Mechanics",
    question: "What is Newton's Second Law of Motion?",
    type: "essay",
    difficulty: "medium",
    createdAt: "2026-04-17",
  },
  {
    id: 5,
    subject: "Chemistry",
    topic: "Periodic Table",
    question: "What is the atomic number of Carbon?",
    type: "short_answer",
    difficulty: "easy",
    correctAnswer: "6",
    createdAt: "2026-04-16",
  },
];

export default function QuestionBank() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

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

  const subjects = [
    "all",
    ...Array.from(new Set(questions.map((q) => q.subject))),
  ];
  const difficulties = ["all", "easy", "medium", "hard"];

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      filterSubject === "all" || q.subject === filterSubject;
    const matchesDifficulty =
      filterDifficulty === "all" || q.difficulty === filterDifficulty;
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const difficultyColors: Record<string, { bg: string; text: string }> = {
    easy: { bg: "rgba(34, 197, 94, 0.1)", text: "#22c55e" },
    medium: { bg: "rgba(245, 158, 11, 0.1)", text: "#f59e0b" },
    hard: { bg: "rgba(239, 68, 68, 0.1)", text: "#ef4444" },
  };

  const typeLabels: Record<string, string> = {
    multiple_choice: "Multiple Choice",
    essay: "Essay",
    short_answer: "Short Answer",
    true_false: "True/False",
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
                Question Bank
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                Manage your exam questions library
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
                onClick={() => navigate("/teacher/questions/create")}
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
                <span style={{ fontSize: 18 }}>+</span> Add Question
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
            label: "Total Questions",
            value: questions.length.toString(),
            icon: "❓",
            color: "hsl(var(--primary))",
          },
          {
            label: "Multiple Choice",
            value: questions
              .filter((q) => q.type === "multiple_choice")
              .length.toString(),
            icon: "☑️",
            color: "#1b7fc4",
          },
          {
            label: "Essay Questions",
            value: questions
              .filter((q) => q.type === "essay")
              .length.toString(),
            icon: "📝",
            color: "hsl(var(--accent))",
          },
          {
            label: "Subjects",
            value: subjects.length - 1,
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

      {/* Filters */}
      <div
        style={{
          background: "hsl(var(--background))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          padding: "20px 24px",
          marginBottom: 16,
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: 250,
            padding: "10px 16px",
            border: "1px solid hsl(var(--border))",
            borderRadius: 10,
            fontSize: 14,
            fontFamily: "inherit",
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
          }}
        />
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          style={{
            padding: "10px 16px",
            border: "1px solid hsl(var(--border))",
            borderRadius: 10,
            fontSize: 14,
            fontFamily: "inherit",
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            cursor: "pointer",
          }}
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject === "all" ? "All Subjects" : subject}
            </option>
          ))}
        </select>
        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          style={{
            padding: "10px 16px",
            border: "1px solid hsl(var(--border))",
            borderRadius: 10,
            fontSize: 14,
            fontFamily: "inherit",
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            cursor: "pointer",
          }}
        >
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff === "all"
                ? "All Difficulties"
                : diff.charAt(0).toUpperCase() + diff.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Questions List */}
      <div
        style={{
          background: "hsl(var(--background))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "8px" }}>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <div
                key={question.id}
                style={{
                  padding: "20px",
                  margin: "8px",
                  background: "hsl(var(--secondary))",
                  borderRadius: 12,
                  border: "1px solid hsl(var(--border))",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onClick={() => navigate(`/teacher/questions/${question.id}`)}
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
                    alignItems: "start",
                    marginBottom: 12,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          background: "hsl(var(--primary) / 0.1)",
                          color: "hsl(var(--primary))",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: 6,
                        }}
                      >
                        {question.subject}
                      </span>
                      <span
                        style={{
                          background: difficultyColors[question.difficulty].bg,
                          color: difficultyColors[question.difficulty].text,
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: 6,
                          textTransform: "uppercase",
                        }}
                      >
                        {question.difficulty}
                      </span>
                      <span
                        style={{
                          background: "hsl(var(--muted))",
                          color: "hsl(var(--muted-foreground))",
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "4px 10px",
                          borderRadius: 6,
                        }}
                      >
                        {typeLabels[question.type]}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "hsl(var(--foreground))",
                        margin: "0 0 8px",
                      }}
                    >
                      {question.question}
                    </h3>
                    <div
                      style={{
                        fontSize: 13,
                        color: "hsl(var(--muted-foreground))",
                      }}
                    >
                      Topic: {question.topic} · Created:{" "}
                      {new Date(question.createdAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" },
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/teacher/questions/${question.id}/edit`);
                      }}
                      style={{
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 16px",
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
                        // Delete logic
                      }}
                      style={{
                        background: "hsl(var(--destructive) / 0.1)",
                        color: "hsl(var(--destructive))",
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 16px",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>❓</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                No Questions Found
              </h3>
              <p style={{ fontSize: 14, marginBottom: 20 }}>
                {searchTerm ||
                filterSubject !== "all" ||
                filterDifficulty !== "all"
                  ? "Try adjusting your filters"
                  : "Start by adding your first question"}
              </p>
              <button
                onClick={() => navigate("/teacher/questions/create")}
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
                Add Question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
