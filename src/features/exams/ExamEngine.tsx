import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useExamSession } from "@/hooks/exam/useExamSession";
import { useExamTimer } from "@/hooks/exam/useExamTimer";
import { useAutoSave } from "@/hooks/exam/useAutoSave";
import { usePassageOverlay } from "@/hooks/exam/usePassageOverlay";
import { useAntiCheat } from "@/hooks/exam/useAntiCheat";
import { useProctoring } from "@/hooks/exam/useProctoring";
import { useOfflineSync } from "@/hooks/exam/useOfflineSync";
import { useExamStore } from "@/stores/exam.store";
import { ExamTopbar } from "./ExamTopbar";
import { QuestionCard } from "@/components/exam/QuestionCard";
import { AnswerStatusPanel } from "./AnswerStatusPanel";
import { AutoSaveIndicator } from "@/components/exam/AutoSaveIndicator";
import { PassageOverlay } from "./PassageOverlay";
import { SubmitReviewDialog } from "@/components/exam/SubmitReviewDialog";
import { LogoutConfirmDialog } from "@/components/exam/LogoutConfirmDialog";
import { ReconnectingOverlay } from "@/components/exam/ReconnectingOverlay";

export function ExamEngine() {
  const { sessionId } = useParams();

  const [reviewOpen, setReviewOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const session = useExamSession(sessionId ?? "");
  const examStore = useExamStore();
  const { isOnline } = useOfflineSync(sessionId ?? "");

  const currentQuestion = useMemo(() => {
    return session?.questions?.[examStore.currentIndex];
  }, [session, examStore.currentIndex]);

  const timer = useExamTimer(session?.remainingSeconds ?? 0, handleAutoSubmit);
  const autoSave = useAutoSave(sessionId ?? "");

  const { passageOpen, openPassage, closePassage } = usePassageOverlay();
  useAntiCheat(sessionId ?? "");
  const proctor = useProctoring(sessionId ?? "", false);

  // Auto-close passage on question navigation
  useEffect(() => {
    closePassage();
  }, [examStore.currentIndex, closePassage]);

  // Fullscreen
  useEffect(() => {
    document.documentElement.requestFullscreen?.();
  }, []);

  function handleAnswer(optionIds: string[]) {
    if (!currentQuestion) return;

    examStore.setAnswer(currentQuestion.id, optionIds);
    autoSave.saveAnswer(currentQuestion.id, optionIds);
  }

  function handleLogout() {
    setLogoutOpen(true);
  }

  function handleManualSubmit() {
    console.log("Submitting exam...");
  }

  function handleAutoSubmit() {
    console.log("Auto submitting exam...");
  }

  function handlePause() {
    setLogoutOpen(false);
  }

  if (!session || !currentQuestion) {
    return <div className="p-6">Loading exam...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* TOPBAR */}
      <ExamTopbar
        examName={session.examName}
        currentQuestion={currentQuestion}
        timer={timer}
        onLogout={handleLogout}
        onPassageOpen={openPassage}
      />

      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        {/* QUESTION AREA */}
        <div className="flex-1 overflow-y-auto p-6">
          <QuestionCard
            question={currentQuestion}
            questionNumber={examStore.currentIndex + 1}
            totalQuestions={session.questions.length}
            selectedAnswer={examStore.answers[currentQuestion.id]}
            isFlagged={examStore.flagged[currentQuestion.id]}
            onAnswer={handleAnswer}
            onFlag={() => examStore.toggleFlag(currentQuestion.id)}
          />

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => examStore.prev()}
              disabled={examStore.currentIndex === 0}
            >
              ← Previous
            </Button>

            <Button
              onClick={() => examStore.next()}
              disabled={examStore.currentIndex === session.questions.length - 1}
            >
              Next →
            </Button>
          </div>
        </div>

        {/* ANSWER STATUS PANEL */}
        <AnswerStatusPanel
          questions={session.questions}
          answers={examStore.answers}
          flagged={examStore.flagged}
          currentIndex={examStore.currentIndex}
          onNavigate={examStore.goTo}
          onOpenReview={() => setReviewOpen(true)}
        />
      </div>

      {/* STATUS BAR */}
      <AutoSaveIndicator
        lastSaved={autoSave.lastSaved}
        status={autoSave.status}
      />

      {/* PASSAGE OVERLAY */}
      <PassageOverlay
        open={passageOpen}
        partKey={currentQuestion.passage_part_key}
        title={currentQuestion.passage_title}
        content={currentQuestion.passage_content}
        onClose={closePassage}
      />

      {/* SUBMIT REVIEW */}
      <SubmitReviewDialog
        open={reviewOpen}
        questions={session.questions}
        answers={examStore.answers}
        flagged={examStore.flagged}
        onNavigate={(i) => {
          setReviewOpen(false);
          examStore.goTo(i);
        }}
        onSubmit={handleManualSubmit}
      />

      {/* LOGOUT */}
      <LogoutConfirmDialog
        open={logoutOpen}
        onConfirm={handlePause}
        onCancel={() => setLogoutOpen(false)}
      />

      {/* OFFLINE */}
      {!isOnline && <ReconnectingOverlay />}

      {/* PROCTORING */}
      <video ref={proctor.videoRef} className="hidden" autoPlay muted />
    </div>
  );
}
