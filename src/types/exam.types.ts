// Exam State Types
export type ExamStatus = 
  | 'not_started'
  | 'in_progress'
  | 'paused'
  | 'submitted'
  | 'expired'
  | 'scheduled';

export type ExamSessionStatus = 
  | 'not_started'
  | 'in_progress'
  | 'paused'
  | 'submitted'
  | 'expired'
  | 'force_submitted';

export interface ExamState {
  status: ExamSessionStatus;
  canStart: boolean;
  canResume: boolean;
  canPause: boolean;
  canSubmit: boolean;
  isExpired: boolean;
  message: string;
}

export interface Exam {
  id: number;
  title: string;
  subject: string;
  class: string;
  duration: number; // in minutes
  totalMarks: number;
  passMark: number;
  instructions: string;
  scheduledDate: string;
  scheduledTime: string;
  status: ExamStatus;
  createdBy: number;
  createdAt: string;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
}

export interface ExamSession {
  id: number;
  examId: number;
  studentId: number;
  status: ExamSessionStatus;
  startedAt: string | null;
  pausedAt: string | null;
  resumedAt: string | null;
  submittedAt: string | null;
  expiresAt: string | null;
  timeRemaining: number; // in seconds
  progress: number; // percentage
  answeredQuestions: number;
  totalQuestions: number;
  flaggedQuestions: number[];
  suspiciousActivities: string[];
  tabSwitches: number;
  violations: number;
  connectionStatus: 'online' | 'offline';
  lastActivity: string;
}

export interface ExamStateTransition {
  from: ExamSessionStatus;
  to: ExamSessionStatus;
  action: string;
  allowed: boolean;
  reason?: string;
}
