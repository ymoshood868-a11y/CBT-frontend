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
  TrendingUp
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  path: string
  icon: LucideIcon
  badge?: number
}

export const navConfig: Record<string, NavItem[]> = {
  super_admin: [
    { label: 'Dashboard', path: '/super-admin/dashboard', icon: LayoutDashboard },
    { label: 'Schools', path: '/super-admin/schools', icon: Building2 },
    { label: 'Billing', path: '/super-admin/billing', icon: CreditCard },
    { label: 'Analytics', path: '/super-admin/analytics', icon: BarChart3 },
    { label: 'Broadcast', path: '/super-admin/broadcast', icon: Megaphone },
    { label: 'Audit Logs', path: '/super-admin/audit-logs', icon: ScrollText },
    { label: 'Settings', path: '/super-admin/settings', icon: Settings },
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