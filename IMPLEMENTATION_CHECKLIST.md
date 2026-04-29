# CBT Platform - Detailed Implementation Checklist

## 🎯 Quick Start Guide

### Immediate Actions (Day 1)
1. Install all dependencies
2. Set up environment variables
3. Configure MSW for demo mode
4. Test current build

---

## 📦 PHASE 0: Dependencies & Configuration

### Step 1: Install Core UI Dependencies
```bash
npm install tailwindcss-animate
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs
npm install @radix-ui/react-tooltip @radix-ui/react-toast @radix-ui/react-select
npm install @radix-ui/react-checkbox @radix-ui/react-switch @radix-ui/react-progress
npm install @radix-ui/react-avatar @radix-ui/react-separator @radix-ui/react-popover
npm install @radix-ui/react-accordion @radix-ui/react-label
npm install framer-motion lucide-react
```

**Verification:** Run `npm list` and check all packages are installed

### Step 2: Install State Management
```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
npm install zustand axios
```

**Verification:** Import in a test file to ensure no errors

### Step 3: Install Forms & Validation
```bash
npm install react-hook-form @hookform/resolvers zod
```

**Verification:** Create a simple form to test

### Step 4: Install Editor & Rich Text
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image
npm install @tiptap/extension-placeholder @tiptap/extension-character-count
```

**Verification:** Create a basic TipTap editor component

### Step 5: Install Charts & Utilities
```bash
npm install recharts sonner date-fns idb-keyval socket.io-client
npm install -D msw @tailwindcss/typography
```

**Verification:** Test each library with a simple example

### Step 6: Configuration Files

#### Create `.env.example`
```env
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
VITE_DEMO_MODE=true
```

#### Update `index.html` - Add Google Fonts
```html
<head>
  <!-- ... existing head content ... -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
```

#### Initialize MSW
```bash
npx msw init public/ --save
```

**Verification:** Check `public/mockServiceWorker.js` exists

---

## 🗂️ PHASE 1: Core Infrastructure

### Task 1.1: Fix Query Client
**File:** `src/lib/queryClient.ts`
```typescript
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
```

### Task 1.2: Fix Socket Client
**File:** `src/lib/socket.ts`
```typescript
import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export const getSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000', {
      autoConnect: false,
      withCredentials: true,
    })
  }
  return socket
}

export const connectSocket = (token: string) => {
  const socket = getSocket()
  socket.auth = { token }
  socket.connect()
  return socket
}

export const disconnectSocket = () => {
  socket?.disconnect()
}
```

### Task 1.3: Enhance Auth Store
**File:** `src/stores/auth.store.ts`

Add these fields and methods:
- `refreshToken: string | null`
- `must_change_password: boolean`
- `school: School | null` (with theme colors)
- `setTokens(access, refresh)` method
- `applySchoolTheme()` method

### Task 1.4: Create Auth Persistence
**File:** `src/stores/auth.persist.ts`
```typescript
import { useAuthStore } from './auth.store'

// Load from localStorage on init
const stored = localStorage.getItem('auth')
if (stored) {
  const { user, accessToken, refreshToken } = JSON.parse(stored)
  useAuthStore.getState().setAuth(user, accessToken, refreshToken)
}

// Subscribe to changes and save
useAuthStore.subscribe((state) => {
  if (state.user && state.accessToken) {
    localStorage.setItem('auth', JSON.stringify({
      user: state.user,
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
    }))
  } else {
    localStorage.removeItem('auth')
  }
})
```

### Task 1.5: Create Exam Hooks Directory
Create these files in `src/hooks/exam/`:
- `useExamSession.ts`
- `useExamTimer.ts`
- `useAutoSave.ts`
- `useAntiCheat.ts`
- `usePassageOverlay.ts`
- `useProctoring.ts`
- `useAdaptiveTesting.ts`
- `useOfflineSync.ts`

**Start with empty exports, implement in Phase 5**

---

## 🎨 PHASE 2: UI Components Enhancement

### Task 2.1: Review & Fix Input Component
**File:** `src/components/ui/input.tsx`

Ensure it has:
- Label support
- Error message display
- Hint text support
- Disabled state styling
- Focus ring

### Task 2.2: Review & Fix Select Component
**File:** `src/components/ui/select.tsx`

Ensure it has:
- Radix UI wrapper
- Label support
- Error state
- Placeholder
- Search functionality (optional)

### Task 2.3: Create Missing Components

#### Label Component
**File:** `src/components/ui/label.tsx`
```typescript
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "@/lib/utils"

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName
```

#### Form Components
**File:** `src/components/ui/form.tsx`
- Create React Hook Form wrapper components
- FormField, FormItem, FormLabel, FormControl, FormMessage

#### Dropdown Menu
**File:** `src/components/ui/dropdown-menu.tsx`
- Radix UI dropdown wrapper
- DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem

#### Popover
**File:** `src/components/ui/popover.tsx`
- Radix UI popover wrapper

#### Toast
**File:** `src/components/ui/toast.tsx`
- Sonner toast wrapper
- Toaster component

---

## 🏗️ PHASE 3: Layout System

### Task 3.1: Complete Navigation Config
**File:** `src/config/nav.config.ts`

```typescript
import { 
  LayoutDashboard, Building2, CreditCard, BarChart3, 
  Megaphone, Settings, ScrollText, Users, GraduationCap,
  BookOpen, FileText, ClipboardList, Eye, PenLine 
} from 'lucide-react'

export interface NavItem {
  label: string
  path: string
  icon: any
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
    { label: 'Exams', path: '/admin/exams', icon: FileText },
    { label: 'Approvals', path: '/admin/approvals', icon: ClipboardList },
    { label: 'Results', path: '/admin/results', icon: BarChart3 },
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
```

### Task 3.2: Create AppSidebar Component
**File:** `src/components/layout/AppSidebar.tsx`

Features:
- School logo at top
- Navigation items from config
- Active state highlighting
- Collapsible on mobile
- User section at bottom
- Logout button

### Task 3.3: Create AppTopbar Component
**File:** `src/components/layout/AppTopbar.tsx`

Features:
- Mobile menu toggle
- Breadcrumbs
- Notification bell
- User avatar dropdown
- Theme toggle (optional)

### Task 3.4: Create PasswordChangeGate
**File:** `src/router/guards.tsx`

Add this component:
```typescript
export function PasswordChangeGate({ children }: { children: ReactNode }) {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (user?.must_change_password && 
        user.role !== 'student' && 
        location.pathname !== '/change-password') {
      navigate('/change-password', { replace: true })
    }
  }, [user, location])

  return <>{children}</>
}
```

### Task 3.5: Update DashboardLayout
**File:** `src/layouts/DashboardLayout.tsx`

Integrate AppSidebar, AppTopbar, and PasswordChangeGate

---

## 🔐 PHASE 4: Authentication

### Task 4.1: Create Staff Login Form
**File:** `src/components/auth/StaffLoginForm.tsx`

Fields:
- Email
- Password
- Remember me checkbox
- Forgot password link

Use React Hook Form + Zod validation

### Task 4.2: Create Student Login Form
**File:** `src/components/auth/StudentLoginForm.tsx`

Fields:
- Student Code
- Password
- Remember me checkbox

### Task 4.3: Enhance Login Page
**File:** `src/pages/auth/LoginPage.tsx`

- Add tabs for Staff/Student
- Integrate forms
- Add loading states
- Add error handling
- Style with school branding

### Task 4.4: Complete Change Password Page
**File:** `src/pages/auth/ChangePasswordPage.tsx`

Features:
- Current password field
- New password field
- Confirm password field
- Password strength indicator
- Validation rules display
- Submit button

### Task 4.5: Complete Forgot Password Page
**File:** `src/pages/auth/ForgotPasswordPage.tsx`

Features:
- Email input
- Submit button
- Success message
- Back to login link

---

## 📝 PHASE 5: Student Panel (CRITICAL)

### Task 5.1: Create Countdown Timer Component
**File:** `src/features/exams/components/CountdownTimer.tsx`

```typescript
import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

interface Props {
  endsAt: string
  label: string
}

export function CountdownTimer({ endsAt, label }: Props) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(formatDistanceToNow(new Date(endsAt), { addSuffix: true }))
    }, 1000)
    return () => clearInterval(interval)
  }, [endsAt])

  return (
    <div className="text-sm text-muted-foreground">
      {label}: <span className="font-semibold">{timeLeft}</span>
    </div>
  )
}
```

### Task 5.2: Create Exam Card State Helper
**File:** `src/features/exams/utils/examStates.ts`

```typescript
export function getExamCardState(exam: StudentExam) {
  // Implement all state logic from roadmap
  // Return: borderClass, badgeVariant, statusLabel, actionLabel, etc.
}
```

### Task 5.3: Create Exam Card Component
**File:** `src/features/exams/components/ExamCard.tsx`

Use the state helper to render appropriate UI

### Task 5.4: Complete Student Dashboard
**File:** `src/pages/student/StudentDashboard.tsx`

- Fetch exams with React Query
- Display paused session banner
- Display retake approved banner
- Render exam cards grid
- Handle exam actions (start, resume, view result)

### Task 5.5: Create Exam Instructions Page
**File:** `src/features/exams/exam-id/instructions.tsx`

- Display exam details
- Show retake note if applicable
- List exam rules
- Start exam button
- Create session on start

### Task 5.6: Implement useExamTimer Hook
**File:** `src/hooks/exam/useExamTimer.ts`

```typescript
export function useExamTimer(initialSeconds: number, onExpire: () => void) {
  const [remaining, setRemaining] = useState(initialSeconds)
  const { toast } = useSonner()

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          onExpire()
          return 0
        }
        // Warning toasts at 30min, 10min, 5min
        if (prev === 1800) toast.warning('30 minutes remaining')
        if (prev === 600) toast.warning('⚠️ 10 minutes remaining!')
        if (prev === 300) toast.error('🚨 5 minutes remaining!')
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatted = useMemo(() => {
    const h = Math.floor(remaining / 3600)
    const m = Math.floor((remaining % 3600) / 60)
    const s = remaining % 60
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
  }, [remaining])

  return { remaining, formatted }
}
```

### Task 5.7: Implement useAutoSave Hook
**File:** `src/hooks/exam/useAutoSave.ts`

Features:
- Debounced save (500ms)
- Bulk save every 30 seconds
- Status tracking (idle, saving, saved, error)
- Last saved timestamp

### Task 5.8: Implement useAntiCheat Hook
**File:** `src/hooks/exam/useAntiCheat.ts`

Monitor:
- Tab switches (visibilitychange)
- Fullscreen exits
- Copy/paste attempts
- Context menu
- Log all events to API

### Task 5.9: Implement usePassageOverlay Hook
**File:** `src/hooks/exam/usePassageOverlay.ts`

```typescript
export function usePassageOverlay() {
  const [passageOpen, setPassageOpen] = useState(false)

  const openPassage = () => setPassageOpen(true)
  const closePassage = () => setPassageOpen(false)

  return { passageOpen, openPassage, closePassage }
}
```

### Task 5.10: Create Passage Overlay Component
**File:** `src/features/exams/PassageOverlay.tsx`

Features:
- Fullscreen overlay
- Sticky header with close button
- Scrollable content
- Auto-scroll to top on open
- HTML content rendering

### Task 5.11: Create Exam Topbar Component
**File:** `src/features/exams/ExamTopbar.tsx`

Features:
- Exam name
- Passage button (conditional)
- Timer with color coding
- Pause & Exit button
- Background color changes

### Task 5.12: Create Answer Status Panel
**File:** `src/features/exams/AnswerStatusPanel.tsx`

Features:
- Question grid (5 columns)
- Color coding
- Current question indicator
- Statistics
- Review & Submit button

### Task 5.13: Create Question Card Component
**File:** `src/components/exam/QuestionCard.tsx`

Features:
- Question text
- Options (single/multiple choice)
- Flag button
- Question number
- Image support

### Task 5.14: Create Exam Engine Page
**File:** `src/pages/exam/ExamEngine.tsx`

Integrate all components and hooks:
- ExamTopbar
- QuestionCard
- AnswerStatusPanel
- PassageOverlay
- AutoSaveIndicator
- Submit dialogs
- Fullscreen enforcement

### Task 5.15: Create Auto-Save Indicator
**File:** `src/components/exam/AutoSaveIndicator.tsx`

Status bar showing:
- Last saved time
- Current status (saving/saved/error)
- Icon indicators

### Task 5.16: Create Student Results Page
**File:** `src/pages/student/studentResults.tsx`

Display:
- Results list
- Pass/Fail badges
- Percentage
- Retake indicators
- View details button

---

## 🎭 PHASE 6: Demo Mode

### Task 6.1: Initialize MSW
**File:** `src/demo/browser.ts`

```typescript
import { setupWorker } from 'msw/browser'
import { demoHandlers } from './handlers'

export const worker = setupWorker(...demoHandlers)
```

### Task 6.2: Create Mock Data
**File:** `src/demo/mock-data/index.ts`

Create mock data for:
- Super admin (schools, analytics)
- School admin (users, approvals)
- Teacher (exams, questions)
- Invigilator (exam rooms, students)
- Student (exams, results)

### Task 6.3: Create MSW Handlers
**File:** `src/demo/handlers.ts`

Mock all API endpoints:
- Auth endpoints
- Exam endpoints
- User endpoints
- Results endpoints
- etc.

### Task 6.4: Complete Demo Page
**File:** `src/pages/demo/DemoPage.tsx`

Features:
- Role cards with icons
- Hover animations
- Role descriptions
- Role selection logic
- Demo banner

### Task 6.5: Create Demo Mode Provider
**File:** `src/demo/DemoModeProvider.tsx`

- Detect demo mode
- Show demo banner
- Wrap app

### Task 6.6: Start MSW in main.tsx
**File:** `src/main.tsx`

```typescript
if (import.meta.env.VITE_DEMO_MODE === 'true') {
  const { worker } = await import('./demo/browser')
  await worker.start()
}
```

---

## 👑 PHASE 7-10: Remaining Modules

### Phase 7: Super Admin
- Dashboard with stats
- School management (list, create, details)
- Billing management
- Platform analytics
- Broadcast messages
- Audit logs

### Phase 8: School Admin & Teacher
- Admin dashboard
- User management
- Exam approvals
- Teacher dashboard
- Exam wizard (5 steps)
- Question bank

### Phase 9: Invigilator
- Dashboard
- Exam room monitoring
- Student status cards
- Alert feed
- Retake requests

### Phase 10: Polish
- Results management
- Notifications system
- Accessibility audit
- Responsive design
- Error handling
- Performance optimization

---

## ✅ Testing Checklist

### Unit Tests
- [ ] Utility functions
- [ ] Hooks
- [ ] Store actions

### Integration Tests
- [ ] Auth flow
- [ ] Exam taking flow
- [ ] Result viewing

### E2E Tests
- [ ] Complete exam session
- [ ] Admin workflows
- [ ] Teacher workflows

---

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] Build optimization
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] Performance monitoring
- [ ] CDN setup
- [ ] SSL certificate
- [ ] Domain configuration

---

*Use this checklist to track progress. Mark items as complete as you go.*
