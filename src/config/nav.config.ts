import { 
  LayoutDashboard, 
  Building2, 
  CreditCard, 
  BarChart3, 
  Megaphone, 
  Settings, 
  ScrollText, 
  Users, 
  GraduationCap,
  BookOpen, 
  FileText, 
  ClipboardList, 
  Eye, 
  BookMarked,
  TrendingUp,
  Activity,
  Clock,
  Shield,
  Database,
  Bell,
  Globe,
  UserCog,
  Key,
  Lock,
  LogIn,
  FileQuestion,
  Brain,
  Upload,
  Download,
  Flag,
  PieChart,
  Trophy,
  DollarSign,
  Receipt,
  Tag,
  RefreshCw,
  List,
  Server,
  HardDrive,
  ShieldAlert,
  Archive,
  AlertTriangle,
  Pause,
  Play,
  Ban,
  CheckCircle,
  XCircle
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  path?: string
  icon: LucideIcon
  badge?: number
  children?: NavItem[]
}

export const navConfig: Record<string, NavItem[]> = {
  super_admin: [
    { 
      label: 'Dashboard', 
      path: '/super-admin/dashboard', 
      icon: LayoutDashboard 
    },
    { 
      label: 'Organizations', 
      icon: Building2,
      children: [
        { label: 'All Organizations', path: '/super-admin/schools', icon: Building2 },
        { label: 'Create Organization', path: '/super-admin/schools/create', icon: Building2 },
      ]
    },
    { 
      label: 'User Management', 
      icon: Users,
      children: [
        { label: 'All Users', path: '/super-admin/users', icon: Users },
        { label: 'Students', path: '/super-admin/users/students', icon: GraduationCap },
        { label: 'Teachers', path: '/super-admin/users/teachers', icon: BookOpen },
        { label: 'Invigilators', path: '/super-admin/users/invigilators', icon: Eye },
        { label: 'Admins', path: '/super-admin/users/admins', icon: UserCog },
      ]
    },
    { 
      label: 'Exams', 
      icon: FileText,
      children: [
        { label: 'All Exams', path: '/super-admin/exams', icon: FileText },
        { label: 'Active Exams', path: '/super-admin/exams/active', icon: CheckCircle },
        { label: 'Scheduled Exams', path: '/super-admin/exams/scheduled', icon: Clock },
        { label: 'Archived Exams', path: '/super-admin/exams/archived', icon: Archive },
      ]
    },
    { 
      label: 'Live Monitoring', 
      icon: Eye,
      children: [
        { label: 'Live Candidates', path: '/super-admin/monitoring/live', icon: Users, badge: 45 },
        { label: 'Suspicious Activities', path: '/super-admin/monitoring/suspicious', icon: Flag, badge: 3 },
        { label: 'Tab Switches', path: '/super-admin/monitoring/tab-switches', icon: AlertTriangle },
        { label: 'Exam Logs', path: '/super-admin/monitoring/logs', icon: ScrollText },
      ]
    },
    { 
      label: 'Question Bank', 
      icon: FileQuestion,
      children: [
        { label: 'All Questions', path: '/super-admin/questions', icon: FileQuestion },
        { label: 'Categories', path: '/super-admin/questions/categories', icon: List },
        { label: 'AI Generator', path: '/super-admin/questions/ai-generator', icon: Brain },
        { label: 'Import/Export', path: '/super-admin/questions/import-export', icon: Upload },
      ]
    },
    { 
      label: 'Results & Analytics', 
      icon: TrendingUp,
      children: [
        { label: 'Platform Analytics', path: '/super-admin/analytics', icon: BarChart3 },
        { label: 'Global Results', path: '/super-admin/results', icon: TrendingUp },
        { label: 'Leaderboards', path: '/super-admin/results/leaderboards', icon: Trophy },
        { label: 'Reports', path: '/super-admin/results/reports', icon: FileText },
      ]
    },
    { 
      label: 'Billing', 
      icon: DollarSign,
      children: [
        { label: 'Subscription Plans', path: '/super-admin/billing', icon: CreditCard },
        { label: 'Payment History', path: '/super-admin/billing/payments', icon: Receipt },
        { label: 'Revenue', path: '/super-admin/billing/revenue', icon: DollarSign },
        { label: 'Invoices', path: '/super-admin/billing/invoices', icon: FileText },
      ]
    },
    { 
      label: 'System', 
      icon: Settings,
      children: [
        { label: 'Configuration', path: '/super-admin/configuration', icon: Settings },
        { label: 'Audit Logs', path: '/super-admin/audit-logs', icon: ScrollText },
        { label: 'Backup & Restore', path: '/super-admin/backup', icon: Archive },
        { label: 'Security', path: '/super-admin/system/security', icon: ShieldAlert },
        { label: 'Notifications', path: '/super-admin/system/notifications', icon: Bell },
      ]
    },
  ],
  school_admin: [
    { 
      label: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: LayoutDashboard 
    },
    { 
      label: 'Overview', 
      icon: Activity,
      children: [
        { label: 'Exam Statistics', path: '/admin/overview/statistics', icon: BarChart3 },
        { label: 'Recent Activities', path: '/admin/overview/activities', icon: Clock },
        { label: 'Performance Summary', path: '/admin/overview/performance', icon: TrendingUp },
        { label: 'Quick Actions', path: '/admin/overview/actions', icon: Settings },
      ]
    },
    { 
      label: 'Student Management', 
      icon: GraduationCap,
      children: [
        { label: 'All Students', path: '/admin/students', icon: GraduationCap },
        { label: 'Register Student', path: '/admin/students/register', icon: GraduationCap },
        { label: 'Bulk Import', path: '/admin/students/import', icon: Upload },
        { label: 'Student Performance', path: '/admin/students/performance', icon: TrendingUp },
        { label: 'Suspended Students', path: '/admin/students/suspended', icon: Ban },
        { label: 'Attendance', path: '/admin/students/attendance', icon: CheckCircle },
        { label: 'Student Profiles', path: '/admin/students/profiles', icon: Users },
      ]
    },
    { 
      label: 'Teacher Management', 
      icon: BookOpen,
      children: [
        { label: 'All Teachers', path: '/admin/teachers', icon: BookOpen },
        { label: 'Add Teacher', path: '/admin/teachers/add', icon: BookOpen },
        { label: 'Assign Subjects', path: '/admin/teachers/subjects', icon: BookMarked },
        { label: 'Teacher Performance', path: '/admin/teachers/performance', icon: TrendingUp },
        { label: 'Teacher Schedules', path: '/admin/teachers/schedules', icon: Clock },
        { label: 'Activity Logs', path: '/admin/teachers/logs', icon: ScrollText },
      ]
    },
    { 
      label: 'Exam Management', 
      icon: FileText,
      children: [
        { label: 'Create Exam', path: '/admin/exams/create', icon: FileText },
        { label: 'All Exams', path: '/admin/exams', icon: FileText },
        { label: 'Scheduled Exams', path: '/admin/exams/scheduled', icon: Clock },
        { label: 'Active Exams', path: '/admin/exams/active', icon: Play },
        { label: 'Draft Exams', path: '/admin/exams/drafts', icon: FileText },
        { label: 'Archived Exams', path: '/admin/exams/archived', icon: Archive },
        { label: 'Exam Instructions', path: '/admin/exams/instructions', icon: ScrollText },
        { label: 'Exam Policies', path: '/admin/exams/policies', icon: Shield },
      ]
    },
    { 
      label: 'Question Bank', 
      icon: FileQuestion,
      children: [
        { label: 'All Questions', path: '/admin/questions', icon: FileQuestion },
        { label: 'Add Questions', path: '/admin/questions/add', icon: FileQuestion },
        { label: 'Categories', path: '/admin/questions/categories', icon: List },
        { label: 'Import Questions', path: '/admin/questions/import', icon: Upload },
        { label: 'Export Questions', path: '/admin/questions/export', icon: Download },
        { label: 'Difficulty Levels', path: '/admin/questions/difficulty', icon: TrendingUp },
        { label: 'Question Review', path: '/admin/questions/review', icon: Eye },
      ]
    },
    { 
      label: 'Live Monitoring', 
      icon: Eye,
      children: [
        { label: 'Live Candidates', path: '/admin/monitoring/live', icon: Users },
        { label: 'Active Sessions', path: '/admin/monitoring/sessions', icon: Activity },
        { label: 'Tab Switch Detection', path: '/admin/monitoring/tab-switches', icon: AlertTriangle },
        { label: 'Suspicious Activities', path: '/admin/monitoring/suspicious', icon: Flag },
        { label: 'Pause Candidate', path: '/admin/monitoring/pause', icon: Pause },
        { label: 'Force Submit', path: '/admin/monitoring/force-submit', icon: Ban },
        { label: 'Monitoring Logs', path: '/admin/monitoring/logs', icon: ScrollText },
      ]
    },
    { 
      label: 'Results Management', 
      icon: TrendingUp,
      children: [
        { label: 'View Results', path: '/admin/results', icon: TrendingUp },
        { label: 'Approve Results', path: '/admin/results/approve', icon: CheckCircle },
        { label: 'Publish Results', path: '/admin/results/publish', icon: Upload },
        { label: 'Result Analytics', path: '/admin/results/analytics', icon: BarChart3 },
        { label: 'Pass/Fail Reports', path: '/admin/results/reports', icon: FileText },
        { label: 'Leaderboards', path: '/admin/results/leaderboards', icon: Trophy },
        { label: 'Export Results', path: '/admin/results/export', icon: Download },
      ]
    },
    { 
      label: 'Invigilator Management', 
      icon: Eye,
      children: [
        { label: 'All Invigilators', path: '/admin/invigilators', icon: Eye },
        { label: 'Assign Invigilators', path: '/admin/invigilators/assign', icon: UserCog },
        { label: 'Exam Hall Monitoring', path: '/admin/invigilators/monitoring', icon: Activity },
        { label: 'Invigilator Reports', path: '/admin/invigilators/reports', icon: FileText },
        { label: 'Attendance Tracking', path: '/admin/invigilators/attendance', icon: CheckCircle },
      ]
    },
    { 
      label: 'Reports & Analytics', 
      icon: BarChart3,
      children: [
        { label: 'Student Reports', path: '/admin/reports/students', icon: GraduationCap },
        { label: 'Exam Reports', path: '/admin/reports/exams', icon: FileText },
        { label: 'Performance Charts', path: '/admin/reports/performance', icon: PieChart },
        { label: 'Attendance Reports', path: '/admin/reports/attendance', icon: CheckCircle },
        { label: 'Generate PDF', path: '/admin/reports/pdf', icon: FileText },
        { label: 'Export CSV', path: '/admin/reports/csv', icon: Download },
      ]
    },
    { 
      label: 'Settings', 
      icon: Settings,
      children: [
        { label: 'Institution Settings', path: '/admin/settings/institution', icon: Building2 },
        { label: 'Exam Settings', path: '/admin/settings/exams', icon: FileText },
        { label: 'Notification Settings', path: '/admin/settings/notifications', icon: Bell },
        { label: 'Branding', path: '/admin/settings/branding', icon: Globe },
        { label: 'User Permissions', path: '/admin/settings/permissions', icon: Lock },
        { label: 'Security Settings', path: '/admin/settings/security', icon: ShieldAlert },
      ]
    },
  ],
  teacher: [
    { 
      label: 'Dashboard', 
      path: '/teacher/dashboard', 
      icon: LayoutDashboard 
    },
    { 
      label: 'Question Bank', 
      icon: FileQuestion,
      children: [
        { label: 'All Questions', path: '/teacher/questions', icon: FileQuestion },
        { label: 'Add Question', path: '/teacher/questions/add', icon: FileQuestion },
        { label: 'Categories', path: '/teacher/questions/categories', icon: List },
        { label: 'Import Questions', path: '/teacher/questions/import', icon: Upload },
      ]
    },
    { 
      label: 'Exams', 
      icon: FileText,
      children: [
        { label: 'Create Exam', path: '/teacher/exams/create', icon: FileText },
        { label: 'My Exams', path: '/teacher/exams', icon: FileText },
        { label: 'Draft Exams', path: '/teacher/exams/drafts', icon: FileText },
        { label: 'Active Exams', path: '/teacher/exams/active', icon: Play },
      ]
    },
    { 
      label: 'Results', 
      icon: BarChart3,
      children: [
        { label: 'View Results', path: '/teacher/results', icon: TrendingUp },
        { label: 'Grade Exams', path: '/teacher/results/grade', icon: CheckCircle },
        { label: 'Analytics', path: '/teacher/results/analytics', icon: BarChart3 },
      ]
    },
    { 
      label: 'Students', 
      icon: GraduationCap,
      children: [
        { label: 'My Students', path: '/teacher/students', icon: GraduationCap },
        { label: 'Performance', path: '/teacher/students/performance', icon: TrendingUp },
        { label: 'Attendance', path: '/teacher/students/attendance', icon: CheckCircle },
      ]
    },
  ],
  invigilator: [
    { 
      label: 'Dashboard', 
      path: '/invigilator/dashboard', 
      icon: LayoutDashboard 
    },
    { 
      label: 'Live Monitoring', 
      icon: Eye,
      children: [
        { label: 'Active Exams', path: '/invigilator/exams/active', icon: Play },
        { label: 'Monitor Candidates', path: '/invigilator/monitor', icon: Users },
        { label: 'Suspicious Activities', path: '/invigilator/suspicious', icon: Flag },
      ]
    },
    { 
      label: 'Reports', 
      icon: FileText,
      children: [
        { label: 'Exam Reports', path: '/invigilator/reports', icon: FileText },
        { label: 'Incident Reports', path: '/invigilator/reports/incidents', icon: AlertTriangle },
      ]
    },
  ],
  student: [
    { 
      label: 'Dashboard', 
      path: '/student/dashboard', 
      icon: LayoutDashboard 
    },
    { 
      label: 'My Exams', 
      path: '/student/exams', 
      icon: FileText 
    },
    { 
      label: 'Results', 
      path: '/student/results', 
      icon: BarChart3 
    },
    { 
      label: 'Profile', 
      path: '/student/profile', 
      icon: Users 
    },
  ],
}

export function getNavItems(role: string): NavItem[] {
  return navConfig[role] || []
}