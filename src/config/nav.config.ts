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
      label: 'Overview', 
      icon: Activity,
      children: [
        { label: 'Live Statistics', path: '/super-admin/overview/statistics', icon: TrendingUp },
        { label: 'Recent Activities', path: '/super-admin/overview/activities', icon: Clock },
        { label: 'System Health', path: '/super-admin/overview/health', icon: Activity },
        { label: 'Quick Actions', path: '/super-admin/overview/actions', icon: Settings },
      ]
    },
    { 
      label: 'Organization Management', 
      icon: Building2,
      children: [
        { label: 'All Organizations', path: '/super-admin/schools', icon: Building2 },
        { label: 'Create Organization', path: '/super-admin/schools/create', icon: Building2 },
        { label: 'Organization Analytics', path: '/super-admin/schools/analytics', icon: BarChart3 },
        { label: 'Subscription Status', path: '/super-admin/schools/subscriptions', icon: CreditCard },
        { label: 'Suspended Organizations', path: '/super-admin/schools/suspended', icon: Ban },
        { label: 'Organization Settings', path: '/super-admin/schools/settings', icon: Settings },
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
        { label: 'Organization Admins', path: '/super-admin/users/admins', icon: UserCog },
        { label: 'Suspended Users', path: '/super-admin/users/suspended', icon: XCircle },
        { label: 'User Activity Logs', path: '/super-admin/users/activity', icon: Clock },
      ]
    },
    { 
      label: 'Admin & Roles', 
      icon: UserCog,
      children: [
        { label: 'All Admins', path: '/super-admin/admins', icon: UserCog },
        { label: 'Create Admin', path: '/super-admin/admins/create', icon: UserCog },
        { label: 'Role Management', path: '/super-admin/roles', icon: Key },
        { label: 'Permission Matrix', path: '/super-admin/permissions', icon: Lock },
        { label: 'Access Control', path: '/super-admin/access-control', icon: Shield },
        { label: 'Login History', path: '/super-admin/login-history', icon: LogIn },
      ]
    },
    { 
      label: 'Exam Management', 
      icon: FileText,
      children: [
        { label: 'All Exams', path: '/super-admin/exams', icon: FileText },
        { label: 'Active Exams', path: '/super-admin/exams/active', icon: CheckCircle },
        { label: 'Scheduled Exams', path: '/super-admin/exams/scheduled', icon: Clock },
        { label: 'Archived Exams', path: '/super-admin/exams/archived', icon: Archive },
        { label: 'Exam Categories', path: '/super-admin/exams/categories', icon: List },
        { label: 'Exam Policies', path: '/super-admin/exams/policies', icon: ScrollText },
        { label: 'Exam Reports', path: '/super-admin/exams/reports', icon: BarChart3 },
      ]
    },
    { 
      label: 'Live Monitoring', 
      icon: Eye,
      children: [
        { label: 'Live Candidates', path: '/super-admin/monitoring/live', icon: Users, badge: 45 },
        { label: 'Real-time Monitoring', path: '/super-admin/monitoring/realtime', icon: Activity },
        { label: 'Tab Switch Detection', path: '/super-admin/monitoring/tab-switches', icon: AlertTriangle },
        { label: 'Suspicious Activities', path: '/super-admin/monitoring/suspicious', icon: Flag, badge: 3 },
        { label: 'Force Submit Exam', path: '/super-admin/monitoring/force-submit', icon: Ban },
        { label: 'Pause Sessions', path: '/super-admin/monitoring/pause', icon: Pause },
        { label: 'Exam Logs', path: '/super-admin/monitoring/logs', icon: ScrollText },
      ]
    },
    { 
      label: 'Question Bank', 
      icon: FileQuestion,
      children: [
        { label: 'All Questions', path: '/super-admin/questions', icon: FileQuestion },
        { label: 'Question Categories', path: '/super-admin/questions/categories', icon: List },
        { label: 'AI Question Generator', path: '/super-admin/questions/ai-generator', icon: Brain },
        { label: 'Import Questions', path: '/super-admin/questions/import', icon: Upload },
        { label: 'Export Questions', path: '/super-admin/questions/export', icon: Download },
        { label: 'Flagged Questions', path: '/super-admin/questions/flagged', icon: Flag },
        { label: 'Question Analytics', path: '/super-admin/questions/analytics', icon: BarChart3 },
      ]
    },
    { 
      label: 'Results & Analytics', 
      icon: TrendingUp,
      children: [
        { label: 'Global Results', path: '/super-admin/results', icon: TrendingUp },
        { label: 'Performance Analytics', path: '/super-admin/analytics', icon: BarChart3 },
        { label: 'Pass/Fail Statistics', path: '/super-admin/results/statistics', icon: PieChart },
        { label: 'Leaderboards', path: '/super-admin/results/leaderboards', icon: Trophy },
        { label: 'Result Exports', path: '/super-admin/results/exports', icon: Download },
        { label: 'Generate Reports', path: '/super-admin/results/reports', icon: FileText },
        { label: 'Question Performance', path: '/super-admin/results/question-performance', icon: FileQuestion },
      ]
    },
    { 
      label: 'Financial & Subscription', 
      icon: DollarSign,
      children: [
        { label: 'Subscription Plans', path: '/super-admin/billing', icon: CreditCard },
        { label: 'Payment History', path: '/super-admin/billing/payments', icon: Receipt },
        { label: 'Revenue Dashboard', path: '/super-admin/billing/revenue', icon: DollarSign },
        { label: 'Invoices', path: '/super-admin/billing/invoices', icon: FileText },
        { label: 'Coupons & Discounts', path: '/super-admin/billing/coupons', icon: Tag },
        { label: 'Renewal Management', path: '/super-admin/billing/renewals', icon: RefreshCw },
        { label: 'Transaction Logs', path: '/super-admin/billing/transactions', icon: ScrollText },
      ]
    },
    { 
      label: 'System & Security', 
      icon: Shield,
      children: [
        { label: 'System Monitoring', path: '/super-admin/system/monitoring', icon: Server },
        { label: 'API Status', path: '/super-admin/system/api-status', icon: Globe },
        { label: 'Database Health', path: '/super-admin/system/database', icon: HardDrive },
        { label: 'Audit Logs', path: '/super-admin/audit-logs', icon: ScrollText },
        { label: 'Security Center', path: '/super-admin/system/security', icon: ShieldAlert },
        { label: 'Backup & Recovery', path: '/super-admin/backup', icon: Archive },
        { label: 'Notification Center', path: '/super-admin/system/notifications', icon: Bell },
        { label: 'Global Settings', path: '/super-admin/configuration', icon: Settings },
      ]
    },
  ],
  school_admin: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Teachers', path: '/admin/teachers', icon: Users },
    { label: 'Students', path: '/admin/students', icon: GraduationCap },
    { label: 'Classes', path: '/admin/classes', icon: BookMarked },
    { label: 'Subjects', path: '/admin/subjects', icon: BookOpen },
    { label: 'Exams', path: '/admin/exams', icon: FileText },
    { label: 'Approvals', path: '/admin/approvals', icon: ClipboardList },
    { label: 'Results', path: '/admin/results', icon: TrendingUp },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ],
  teacher: [
    { label: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
    { label: 'Question Banks', path: '/teacher/questions', icon: BookOpen },
    { label: 'My Exams', path: '/teacher/exams', icon: FileText },
    { label: 'Results', path: '/teacher/results', icon: BarChart3 },
  ],
  invigilator: [
    { label: 'Dashboard', path: '/invigilator/dashboard', icon: LayoutDashboard },
    { label: 'Exam Rooms', path: '/invigilator/rooms', icon: Eye },
  ],
  student: [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Results', path: '/student/results', icon: BarChart3 },
  ],
}

export function getNavItems(role: string): NavItem[] {
  return navConfig[role] || []
}