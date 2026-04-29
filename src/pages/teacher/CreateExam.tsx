// Complete Teacher Exam Creation System
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Question {
  id: string;
  type: "multiple_choice" | "theory";
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  points: number;
}

interface ExamData {
  title: string;
  subject: string;
  class: string;
  duration: number;
  instructions: string;
  passMark: number;
  totalMarks: number;
  questions: Question[];
  assignedTo: string[];
  scheduledDate: string;
  scheduledTime: string;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
}

export default function CreateExam() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [examData, setExamData] = useState<ExamData>({
    title: "",
    subject: "",
    class: "",
    duration: 60,
    instructions: "",
    passMark: 40,
    totalMarks: 100,
    questions: [],
    assignedTo: [],
    scheduledDate: "",
    scheduledTime: "",
    randomizeQuestions: false,
    randomizeOptions: false,
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: Date.now().toString(),
    type: "multiple_choice",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    points: 1,
  });

  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null,
  );

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleAddQuestion = () => {
    if (editingQuestionId) {
      setExamData({
        ...examData,
        questions: examData.questions.map((q) =>
          q.id === editingQuestionId ? currentQuestion : q,
        ),
      });
      setEditingQuestionId(null);
    } else {
      setExamData({
        ...examData,
        questions: [...examData.questions, currentQuestion],
      });
    }
    setCurrentQuestion({
      id: Date.now().toString(),
      type: "multiple_choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      points: 1,
    });
    setShowQuestionForm(false);
  };

  const handleEditQuestion = (question: Question) => {
    setCurrentQuestion(question);
    setEditingQuestionId(question.id);
    setShowQuestionForm(true);
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm("Are you sure you want to delete this question?")) {
      setExamData({
        ...examData,
        questions: examData.questions.filter((q) => q.id !== id),
      });
    }
  };

  const handlePublish = () => {
    console.log("Publishing exam:", examData);
    alert("Exam created successfully!");
    navigate("/teacher/exams");
  };

  const totalPoints = examData.questions.reduce((sum, q) => sum + q.points, 0);

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
          <h1
            style={{
              color: "hsl(var(--primary-foreground))",
              fontSize: 32,
              fontWeight: 800,
              margin: "0 0 8px",
              letterSpacing: "-0.02em",
            }}
          >
            Create New Exam
          </h1>
          <p
            style={{
              color: "hsl(var(--primary-foreground) / 0.9)",
              fontSize: 15,
              margin: 0,
            }}
          >
            Step {step} of 4: {step === 1 && "Basic Information"}
            {step === 2 && "Add Questions"}
            {step === 3 && "Assign & Schedule"}
            {step === 4 && "Preview & Publish"}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          background: "hsl(var(--background))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          padding: "24px",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                flex: 1,
                textAlign: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background:
                    s <= step ? "hsl(var(--primary))" : "hsl(var(--secondary))",
                  color:
                    s <= step
                      ? "hsl(var(--primary-foreground))"
                      : "hsl(var(--muted-foreground))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 8px",
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                {s}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color:
                    s <= step
                      ? "hsl(var(--foreground))"
                      : "hsl(var(--muted-foreground))",
                }}
              >
                {s === 1 && "Basic Info"}
                {s === 2 && "Questions"}
                {s === 3 && "Assign"}
                {s === 4 && "Preview"}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            width: "100%",
            height: 8,
            background: "hsl(var(--secondary))",
            borderRadius: 100,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(step / 4) * 100}%`,
              height: "100%",
              background: "hsl(var(--primary))",
              transition: "width 0.3s",
            }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div
        style={{
          background: "hsl(var(--background))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          padding: "32px",
          marginBottom: 24,
          minHeight: 400,
        }}
      >
        {/* STEP 1: Basic Information */}
        {step === 1 && (
          <div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 24,
                color: "hsl(var(--foreground))",
              }}
            >
              📋 Basic Information
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Exam Title *
                </label>
                <input
                  type="text"
                  value={examData.title}
                  onChange={(e) =>
                    setExamData({ ...examData, title: e.target.value })
                  }
                  placeholder="e.g., Mathematics Mid-Term Exam"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: 15,
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 10,
                    background: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 8,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    Subject *
                  </label>
                  <select
                    value={examData.subject}
                    onChange={(e) =>
                      setExamData({ ...examData, subject: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: 15,
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 10,
                      background: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      fontFamily: "inherit",
                    }}
                  >
                    <option value="">Select Subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="English Language">English Language</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Economics">Economics</option>
                    <option value="Government">Government</option>
                    <option value="Literature">Literature</option>
                    <option value="Geography">Geography</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 8,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    Class *
                  </label>
                  <select
                    value={examData.class}
                    onChange={(e) =>
                      setExamData({ ...examData, class: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: 15,
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 10,
                      background: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      fontFamily: "inherit",
                    }}
                  >
                    <option value="">Select Class</option>
                    <option value="SS1A">SS1A</option>
                    <option value="SS1B">SS1B</option>
                    <option value="SS2A">SS2A</option>
                    <option value="SS2B">SS2B</option>
                    <option value="SS3A">SS3A</option>
                    <option value="SS3B">SS3B</option>
                  </select>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 20,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 8,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    value={examData.duration}
                    onChange={(e) =>
                      setExamData({
                        ...examData,
                        duration: parseInt(e.target.value) || 0,
                      })
                    }
                    min="1"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: 15,
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 10,
                      background: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 8,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    Total Marks *
                  </label>
                  <input
                    type="number"
                    value={examData.totalMarks}
                    onChange={(e) =>
                      setExamData({
                        ...examData,
                        totalMarks: parseInt(e.target.value) || 0,
                      })
                    }
                    min="1"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: 15,
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 10,
                      background: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 8,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    Pass Mark *
                  </label>
                  <input
                    type="number"
                    value={examData.passMark}
                    onChange={(e) =>
                      setExamData({
                        ...examData,
                        passMark: parseInt(e.target.value) || 0,
                      })
                    }
                    min="1"
                    max={examData.totalMarks}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: 15,
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 10,
                      background: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Instructions
                </label>
                <textarea
                  value={examData.instructions}
                  onChange={(e) =>
                    setExamData({ ...examData, instructions: e.target.value })
                  }
                  placeholder="Enter exam instructions for students..."
                  rows={6}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: 15,
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 10,
                    background: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Add Questions */}
        {step === 2 && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  margin: 0,
                  color: "hsl(var(--foreground))",
                }}
              >
                ❓ Add Questions ({examData.questions.length} questions,{" "}
                {totalPoints} points)
              </h2>
              <button
                onClick={() => setShowQuestionForm(!showQuestionForm)}
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 18 }}>+</span>{" "}
                {editingQuestionId ? "Edit Question" : "Add Question"}
              </button>
            </div>

            {/* Question Form */}
            {showQuestionForm && (
              <div
                style={{
                  background: "hsl(var(--secondary))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12,
                  padding: 24,
                  marginBottom: 24,
                }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 16,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  {editingQuestionId ? "Edit Question" : "New Question"}
                </h3>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr",
                      gap: 16,
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 14,
                          fontWeight: 600,
                          marginBottom: 8,
                          color: "hsl(var(--foreground))",
                        }}
                      >
                        Question Type *
                      </label>
                      <select
                        value={currentQuestion.type}
                        onChange={(e) =>
                          setCurrentQuestion({
                            ...currentQuestion,
                            type: e.target.value as
                              | "multiple_choice"
                              | "theory",
                            options:
                              e.target.value === "multiple_choice"
                                ? ["", "", "", ""]
                                : undefined,
                            correctAnswer:
                              e.target.value === "multiple_choice"
                                ? 0
                                : undefined,
                          })
                        }
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          fontSize: 15,
                          border: "1px solid hsl(var(--border))",
                          borderRadius: 10,
                          background: "hsl(var(--background))",
                          color: "hsl(var(--foreground))",
                          fontFamily: "inherit",
                        }}
                      >
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="theory">Theory/Essay</option>
                      </select>
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 14,
                          fontWeight: 600,
                          marginBottom: 8,
                          color: "hsl(var(--foreground))",
                        }}
                      >
                        Points *
                      </label>
                      <input
                        type="number"
                        value={currentQuestion.points}
                        onChange={(e) =>
                          setCurrentQuestion({
                            ...currentQuestion,
                            points: parseInt(e.target.value) || 1,
                          })
                        }
                        min="1"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          fontSize: 15,
                          border: "1px solid hsl(var(--border))",
                          borderRadius: 10,
                          background: "hsl(var(--background))",
                          color: "hsl(var(--foreground))",
                          fontFamily: "inherit",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 14,
                        fontWeight: 600,
                        marginBottom: 8,
                        color: "hsl(var(--foreground))",
                      }}
                    >
                      Question Text *
                    </label>
                    <textarea
                      value={currentQuestion.question}
                      onChange={(e) =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          question: e.target.value,
                        })
                      }
                      placeholder="Enter your question here..."
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        fontSize: 15,
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 10,
                        background: "hsl(var(--background))",
                        color: "hsl(var(--foreground))",
                        fontFamily: "inherit",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  {currentQuestion.type === "multiple_choice" &&
                    currentQuestion.options && (
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: 8,
                            color: "hsl(var(--foreground))",
                          }}
                        >
                          Options *
                        </label>
                        {currentQuestion.options.map((option, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              gap: 12,
                              marginBottom: 12,
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="radio"
                              name="correctAnswer"
                              checked={currentQuestion.correctAnswer === index}
                              onChange={() =>
                                setCurrentQuestion({
                                  ...currentQuestion,
                                  correctAnswer: index,
                                })
                              }
                              style={{
                                width: 20,
                                height: 20,
                                cursor: "pointer",
                              }}
                            />
                            <span
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: "hsl(var(--foreground))",
                                minWidth: 20,
                              }}
                            >
                              {String.fromCharCode(65 + index)}.
                            </span>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [
                                  ...currentQuestion.options!,
                                ];
                                newOptions[index] = e.target.value;
                                setCurrentQuestion({
                                  ...currentQuestion,
                                  options: newOptions,
                                });
                              }}
                              placeholder={`Option ${String.fromCharCode(65 + index)}`}
                              style={{
                                flex: 1,
                                padding: "12px 16px",
                                fontSize: 15,
                                border: "1px solid hsl(var(--border))",
                                borderRadius: 10,
                                background: "hsl(var(--background))",
                                color: "hsl(var(--foreground))",
                                fontFamily: "inherit",
                              }}
                            />
                          </div>
                        ))}
                        <p
                          style={{
                            fontSize: 12,
                            color: "hsl(var(--muted-foreground))",
                            marginTop: 8,
                          }}
                        >
                          Select the radio button next to the correct answer
                        </p>
                      </div>
                    )}

                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      onClick={() => {
                        setShowQuestionForm(false);
                        setEditingQuestionId(null);
                        setCurrentQuestion({
                          id: Date.now().toString(),
                          type: "multiple_choice",
                          question: "",
                          options: ["", "", "", ""],
                          correctAnswer: 0,
                          points: 1,
                        });
                      }}
                      style={{
                        background: "hsl(var(--secondary))",
                        color: "hsl(var(--foreground))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 10,
                        padding: "10px 20px",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddQuestion}
                      disabled={
                        !currentQuestion.question ||
                        (currentQuestion.type === "multiple_choice" &&
                          currentQuestion.options?.some((o) => !o))
                      }
                      style={{
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                        border: "none",
                        borderRadius: 10,
                        padding: "10px 20px",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        opacity:
                          !currentQuestion.question ||
                          (currentQuestion.type === "multiple_choice" &&
                            currentQuestion.options?.some((o) => !o))
                            ? 0.5
                            : 1,
                      }}
                    >
                      {editingQuestionId ? "Update Question" : "Add Question"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Questions List */}
            {examData.questions.length > 0 ? (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {examData.questions.map((q, index) => (
                  <div
                    key={q.id}
                    style={{
                      background: "hsl(var(--secondary))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 12,
                      padding: 20,
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
                            gap: 12,
                            marginBottom: 8,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: "hsl(var(--primary))",
                            }}
                          >
                            Q{index + 1}
                          </span>
                          <span
                            style={{
                              background:
                                q.type === "multiple_choice"
                                  ? "rgba(34, 197, 94, 0.1)"
                                  : "rgba(59, 130, 246, 0.1)",
                              color:
                                q.type === "multiple_choice"
                                  ? "#22c55e"
                                  : "#3b82f6",
                              fontSize: 11,
                              fontWeight: 700,
                              padding: "4px 10px",
                              borderRadius: 6,
                              textTransform: "uppercase",
                            }}
                          >
                            {q.type === "multiple_choice"
                              ? "Multiple Choice"
                              : "Theory"}
                          </span>
                          <span
                            style={{
                              fontSize: 12,
                              color: "hsl(var(--muted-foreground))",
                            }}
                          >
                            {q.points} {q.points === 1 ? "point" : "points"}
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: 15,
                            color: "hsl(var(--foreground))",
                            marginBottom: 12,
                            lineHeight: 1.6,
                          }}
                        >
                          {q.question}
                        </p>
                        {q.type === "multiple_choice" && q.options && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 8,
                            }}
                          >
                            {q.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                  padding: "8px 12px",
                                  background:
                                    q.correctAnswer === optIndex
                                      ? "rgba(34, 197, 94, 0.1)"
                                      : "hsl(var(--background))",
                                  border: `1px solid ${q.correctAnswer === optIndex ? "#22c55e" : "hsl(var(--border))"}`,
                                  borderRadius: 8,
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "hsl(var(--foreground))",
                                  }}
                                >
                                  {String.fromCharCode(65 + optIndex)}.
                                </span>
                                <span
                                  style={{
                                    fontSize: 13,
                                    color: "hsl(var(--foreground))",
                                  }}
                                >
                                  {option}
                                </span>
                                {q.correctAnswer === optIndex && (
                                  <span
                                    style={{
                                      marginLeft: "auto",
                                      fontSize: 12,
                                      color: "#22c55e",
                                      fontWeight: 600,
                                    }}
                                  >
                                    ✓ Correct
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: 8, marginLeft: 16 }}>
                        <button
                          onClick={() => handleEditQuestion(q)}
                          style={{
                            background: "hsl(var(--primary))",
                            color: "hsl(var(--primary-foreground))",
                            border: "none",
                            borderRadius: 8,
                            padding: "8px 12px",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(q.id)}
                          style={{
                            background: "#ef4444",
                            color: "#fff",
                            border: "none",
                            borderRadius: 8,
                            padding: "8px 12px",
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
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>❓</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                  No Questions Added
                </h3>
                <p style={{ fontSize: 14 }}>
                  Click "Add Question" to start building your exam
                </p>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Assign & Schedule */}
        {step === 3 && (
          <div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 24,
                color: "hsl(var(--foreground))",
              }}
            >
              👥 Assign & Schedule
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 12,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Assign to Students/Groups *
                </label>
                <div
                  style={{
                    background: "hsl(var(--secondary))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  {[
                    "All Students in " + examData.class,
                    "Group A",
                    "Group B",
                    "Individual Students",
                  ].map((group) => (
                    <label
                      key={group}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px",
                        cursor: "pointer",
                        borderRadius: 8,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "hsl(var(--background))")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <input
                        type="checkbox"
                        checked={examData.assignedTo.includes(group)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setExamData({
                              ...examData,
                              assignedTo: [...examData.assignedTo, group],
                            });
                          } else {
                            setExamData({
                              ...examData,
                              assignedTo: examData.assignedTo.filter(
                                (g) => g !== group,
                              ),
                            });
                          }
                        }}
                        style={{ width: 20, height: 20, cursor: "pointer" }}
                      />
                      <span
                        style={{
                          fontSize: 15,
                          color: "hsl(var(--foreground))",
                        }}
                      >
                        {group}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 8,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    Schedule Date *
                  </label>
                  <input
                    type="date"
                    value={examData.scheduledDate}
                    onChange={(e) =>
                      setExamData({
                        ...examData,
                        scheduledDate: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: 15,
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 10,
                      background: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 8,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    Schedule Time *
                  </label>
                  <input
                    type="time"
                    value={examData.scheduledTime}
                    onChange={(e) =>
                      setExamData({
                        ...examData,
                        scheduledTime: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: 15,
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 10,
                      background: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
              </div>

              <div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 16,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  ⚙️ Advanced Settings
                </h3>
                <div
                  style={{
                    background: "hsl(var(--secondary))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 12,
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: "hsl(var(--foreground))",
                          marginBottom: 4,
                        }}
                      >
                        Randomize Question Order
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "hsl(var(--muted-foreground))",
                        }}
                      >
                        Questions will appear in random order for each student
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={examData.randomizeQuestions}
                      onChange={(e) =>
                        setExamData({
                          ...examData,
                          randomizeQuestions: e.target.checked,
                        })
                      }
                      style={{ width: 44, height: 24, cursor: "pointer" }}
                    />
                  </label>
                  <div
                    style={{ height: 1, background: "hsl(var(--border))" }}
                  />
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: "hsl(var(--foreground))",
                          marginBottom: 4,
                        }}
                      >
                        Randomize Options Order
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "hsl(var(--muted-foreground))",
                        }}
                      >
                        Multiple choice options will appear in random order
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={examData.randomizeOptions}
                      onChange={(e) =>
                        setExamData({
                          ...examData,
                          randomizeOptions: e.target.checked,
                        })
                      }
                      style={{ width: 44, height: 24, cursor: "pointer" }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Preview & Publish */}
        {step === 4 && (
          <div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 24,
                color: "hsl(var(--foreground))",
              }}
            >
              👁️ Preview & Publish
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Exam Summary */}
              <div
                style={{
                  background: "hsl(var(--secondary))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 16,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  📋 Exam Summary
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 16,
                  }}
                >
                  {[
                    { label: "Title", value: examData.title || "Not set" },
                    { label: "Subject", value: examData.subject || "Not set" },
                    { label: "Class", value: examData.class || "Not set" },
                    {
                      label: "Duration",
                      value: `${examData.duration} minutes`,
                    },
                    {
                      label: "Total Marks",
                      value: examData.totalMarks.toString(),
                    },
                    { label: "Pass Mark", value: examData.passMark.toString() },
                    {
                      label: "Questions",
                      value: examData.questions.length.toString(),
                    },
                    { label: "Total Points", value: totalPoints.toString() },
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

              {/* Schedule Info */}
              <div
                style={{
                  background: "hsl(var(--secondary))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 16,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  📅 Schedule & Assignment
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 16,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "hsl(var(--muted-foreground))",
                        marginBottom: 4,
                      }}
                    >
                      Scheduled Date
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "hsl(var(--foreground))",
                      }}
                    >
                      {examData.scheduledDate || "Not scheduled"}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "hsl(var(--muted-foreground))",
                        marginBottom: 4,
                      }}
                    >
                      Scheduled Time
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "hsl(var(--foreground))",
                      }}
                    >
                      {examData.scheduledTime || "Not scheduled"}
                    </div>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <div
                      style={{
                        fontSize: 12,
                        color: "hsl(var(--muted-foreground))",
                        marginBottom: 4,
                      }}
                    >
                      Assigned To
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "hsl(var(--foreground))",
                      }}
                    >
                      {examData.assignedTo.length > 0
                        ? examData.assignedTo.join(", ")
                        : "Not assigned"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Questions Preview */}
              <div
                style={{
                  background: "hsl(var(--secondary))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 16,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  ❓ Questions Preview ({examData.questions.length})
                </h3>
                {examData.questions.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      maxHeight: 400,
                      overflowY: "auto",
                    }}
                  >
                    {examData.questions.map((q, index) => (
                      <div
                        key={q.id}
                        style={{
                          background: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: 8,
                          padding: 16,
                        }}
                      >
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
                              fontSize: 13,
                              fontWeight: 700,
                              color: "hsl(var(--primary))",
                            }}
                          >
                            Q{index + 1}
                          </span>
                          <span
                            style={{
                              fontSize: 12,
                              color: "hsl(var(--muted-foreground))",
                            }}
                          >
                            ({q.points} pts)
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: 14,
                            color: "hsl(var(--foreground))",
                            marginBottom: 8,
                          }}
                        >
                          {q.question}
                        </p>
                        {q.type === "multiple_choice" && q.options && (
                          <div
                            style={{
                              fontSize: 13,
                              color: "hsl(var(--muted-foreground))",
                            }}
                          >
                            {q.options.length} options • Correct:{" "}
                            {String.fromCharCode(
                              65 + (q.correctAnswer as number),
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p
                    style={{
                      fontSize: 14,
                      color: "hsl(var(--muted-foreground))",
                      textAlign: "center",
                      padding: 20,
                    }}
                  >
                    No questions added yet
                  </p>
                )}
              </div>

              {/* Settings */}
              <div
                style={{
                  background: "hsl(var(--secondary))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 16,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  ⚙️ Settings
                </h3>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <span style={{ fontSize: 20 }}>
                      {examData.randomizeQuestions ? "✅" : "❌"}
                    </span>
                    <span
                      style={{ fontSize: 14, color: "hsl(var(--foreground))" }}
                    >
                      Randomize Question Order
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <span style={{ fontSize: 20 }}>
                      {examData.randomizeOptions ? "✅" : "❌"}
                    </span>
                    <span
                      style={{ fontSize: 14, color: "hsl(var(--foreground))" }}
                    >
                      Randomize Options Order
                    </span>
                  </div>
                </div>
              </div>

              {/* Validation Warnings */}
              {(!examData.title ||
                !examData.subject ||
                !examData.class ||
                examData.questions.length === 0 ||
                examData.assignedTo.length === 0 ||
                !examData.scheduledDate ||
                !examData.scheduledTime) && (
                <div
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid #ef4444",
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      marginBottom: 12,
                      color: "#ef4444",
                    }}
                  >
                    ⚠️ Please Complete Required Fields
                  </h3>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 20,
                      color: "#ef4444",
                      fontSize: 14,
                    }}
                  >
                    {!examData.title && <li>Exam title is required</li>}
                    {!examData.subject && <li>Subject is required</li>}
                    {!examData.class && <li>Class is required</li>}
                    {examData.questions.length === 0 && (
                      <li>At least one question is required</li>
                    )}
                    {examData.assignedTo.length === 0 && (
                      <li>Assign to at least one group</li>
                    )}
                    {!examData.scheduledDate && (
                      <li>Schedule date is required</li>
                    )}
                    {!examData.scheduledTime && (
                      <li>Schedule time is required</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <button
          onClick={() => navigate("/teacher/exams")}
          style={{
            background: "hsl(var(--secondary))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 10,
            padding: "14px 28px",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        <div style={{ display: "flex", gap: 16 }}>
          {step > 1 && (
            <button
              onClick={handlePrevious}
              style={{
                background: "hsl(var(--secondary))",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 10,
                padding: "14px 28px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ← Previous
            </button>
          )}

          {step < 4 ? (
            <button
              onClick={handleNext}
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                border: "none",
                borderRadius: 10,
                padding: "14px 28px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handlePublish}
              style={{
                background: "#22c55e",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "14px 28px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Publish Exam
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
