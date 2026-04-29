export interface StudentExam {
  id: string
  name: string
  subject_name: string
  duration_minutes: number
  question_count: number
  pass_mark: number
  status: 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  starts_at?: string
  ends_at?: string
  session?: {
    id: string
    status: 'IN_PROGRESS' | 'PAUSED' | 'SUBMITTED' | 'EXPIRED'
  }
  retake_status?: 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED'
  retake_note?: string
  granted_minutes?: number
  result?: {
    id: string
    percentage: number
    pass_fail: 'PASS' | 'FAIL'
    result_status: 'PENDING' | 'RELEASED'
  }
}

export interface ExamCardState {
  borderClass: string
  badgeVariant: 'default' | 'success' | 'warning' | 'destructive' | 'secondary' | 'outline'
  statusLabel: string
  actionLabel?: string
  actionVariant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline' | 'accent'
  action?: boolean
  onClick?: () => void
}

export function getExamCardState(exam: StudentExam): ExamCardState {
  // Paused session - highest priority
  if (exam.session?.status === 'PAUSED') {
    return {
      borderClass: 'border-l-4 border-warning',
      badgeVariant: 'warning',
      statusLabel: 'Paused',
      actionLabel: 'Resume Exam',
      actionVariant: 'warning',
      action: true,
    }
  }

  // Retake approved
  if (exam.retake_status === 'APPROVED') {
    return {
      borderClass: 'border-l-4 border-accent',
      badgeVariant: 'default',
      statusLabel: 'Retake Approved',
      actionLabel: 'Start Retake',
      actionVariant: 'accent',
      action: true,
    }
  }

  // Retake pending
  if (exam.retake_status === 'PENDING') {
    return {
      borderClass: 'border-l-4 border-muted',
      badgeVariant: 'secondary',
      statusLabel: 'Retake Pending',
      actionLabel: 'Awaiting Approval...',
      action: false,
    }
  }

  // Active exam (can start)
  if (exam.status === 'ACTIVE' && !exam.session) {
    return {
      borderClass: 'border-l-4 border-success',
      badgeVariant: 'success',
      statusLabel: 'Active Now',
      actionLabel: 'Start Exam',
      actionVariant: 'success',
      action: true,
    }
  }

  // In progress
  if (exam.session?.status === 'IN_PROGRESS') {
    return {
      borderClass: 'border-l-4 border-primary',
      badgeVariant: 'default',
      statusLabel: 'In Progress',
      actionLabel: 'Continue Exam',
      actionVariant: 'default',
      action: true,
    }
  }

  // Result available
  if (exam.result?.result_status === 'RELEASED') {
    return {
      borderClass: 'border-l-4 border-primary',
      badgeVariant: exam.result.pass_fail === 'PASS' ? 'success' : 'destructive',
      statusLabel: 'Result Available',
      actionLabel: 'View Result',
      actionVariant: 'outline',
      action: true,
    }
  }

  // Submitted (awaiting results)
  if (exam.session?.status === 'SUBMITTED') {
    return {
      borderClass: '',
      badgeVariant: 'secondary',
      statusLabel: 'Submitted',
      actionLabel: 'Awaiting Results',
      action: false,
    }
  }

  // Expired
  if (exam.session?.status === 'EXPIRED') {
    return {
      borderClass: '',
      badgeVariant: 'destructive',
      statusLabel: 'Expired',
      action: false,
    }
  }

  // Upcoming
  return {
    borderClass: '',
    badgeVariant: 'outline',
    statusLabel: 'Upcoming',
    action: false,
  }
}
