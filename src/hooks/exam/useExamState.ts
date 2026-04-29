import { useState, useEffect, useCallback } from 'react';
import { ExamSessionStatus, ExamState, ExamSession } from '@/types/exam.types';

/**
 * Hook to manage exam state transitions and validations
 */
export function useExamState(session: ExamSession | null) {
  const [examState, setExamState] = useState<ExamState>({
    status: 'not_started',
    canStart: false,
    canResume: false,
    canPause: false,
    canSubmit: false,
    isExpired: false,
    message: 'Loading exam...',
  });

  // Calculate exam state based on session
  const calculateExamState = useCallback((session: ExamSession | null): ExamState => {
    if (!session) {
      return {
        status: 'not_started',
        canStart: false,
        canResume: false,
        canPause: false,
        canSubmit: false,
        isExpired: false,
        message: 'Exam session not found',
      };
    }

    const now = new Date();
    const expiresAt = session.expiresAt ? new Date(session.expiresAt) : null;
    const isExpired = expiresAt ? now > expiresAt : false;

    // Handle expired state
    if (isExpired && session.status !== 'submitted' && session.status !== 'force_submitted') {
      return {
        status: 'expired',
        canStart: false,
        canResume: false,
        canPause: false,
        canSubmit: false,
        isExpired: true,
        message: 'This exam has expired',
      };
    }

    // Handle different states
    switch (session.status) {
      case 'not_started':
        return {
          status: 'not_started',
          canStart: true,
          canResume: false,
          canPause: false,
          canSubmit: false,
          isExpired: false,
          message: 'Ready to start exam',
        };

      case 'in_progress':
        return {
          status: 'in_progress',
          canStart: false,
          canResume: false,
          canPause: true,
          canSubmit: true,
          isExpired: false,
          message: 'Exam in progress',
        };

      case 'paused':
        return {
          status: 'paused',
          canStart: false,
          canResume: true,
          canPause: false,
          canSubmit: false,
          isExpired: false,
          message: 'Exam is paused. Click resume to continue.',
        };

      case 'submitted':
        return {
          status: 'submitted',
          canStart: false,
          canResume: false,
          canPause: false,
          canSubmit: false,
          isExpired: false,
          message: 'Exam has been submitted',
        };

      case 'force_submitted':
        return {
          status: 'force_submitted',
          canStart: false,
          canResume: false,
          canPause: false,
          canSubmit: false,
          isExpired: false,
          message: 'Exam was force submitted by invigilator',
        };

      case 'expired':
        return {
          status: 'expired',
          canStart: false,
          canResume: false,
          canPause: false,
          canSubmit: false,
          isExpired: true,
          message: 'This exam has expired',
        };

      default:
        return {
          status: 'not_started',
          canStart: false,
          canResume: false,
          canPause: false,
          canSubmit: false,
          isExpired: false,
          message: 'Unknown exam state',
        };
    }
  }, []);

  // Update exam state when session changes
  useEffect(() => {
    const newState = calculateExamState(session);
    setExamState(newState);
  }, [session, calculateExamState]);

  // Validate state transition
  const canTransition = useCallback(
    (from: ExamSessionStatus, to: ExamSessionStatus): { allowed: boolean; reason?: string } => {
      // Define allowed transitions
      const allowedTransitions: Record<ExamSessionStatus, ExamSessionStatus[]> = {
        not_started: ['in_progress'],
        in_progress: ['paused', 'submitted', 'expired', 'force_submitted'],
        paused: ['in_progress', 'submitted', 'expired', 'force_submitted'],
        submitted: [],
        expired: [],
        force_submitted: [],
      };

      const allowed = allowedTransitions[from]?.includes(to) || false;

      if (!allowed) {
        return {
          allowed: false,
          reason: `Cannot transition from ${from} to ${to}`,
        };
      }

      return { allowed: true };
    },
    []
  );

  return {
    examState,
    canTransition,
    calculateExamState,
  };
}
