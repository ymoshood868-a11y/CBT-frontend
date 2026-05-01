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