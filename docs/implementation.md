# CBT Platform — Frontend Implementation Roadmap
## React (Vite) · Tailwind CSS · Radix UI · React Query · TipTap

> **Architecture:** Feature-based modular structure
> **Demo Mode:** Included (MSW mock handlers) · **Student Panel:** Detailed spec below
> **Total Phases:** 10

---

# ⚙️ PHASE 0 — Project Bootstrap

## Step 0.1 — Scaffold with Vite
```bash
npm create vite@latest cbt-frontend -- --template react-ts
cd cbt-frontend
npm install
```

## Step 0.2 — Install All Dependencies
```bash
# Core UI
npm install tailwindcss-animate @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-toast
npm install @radix-ui/react-select @radix-ui/react-checkbox @radix-ui/react-switch
npm install @radix-ui/react-progress @radix-ui/react-avatar @radix-ui/react-separator
npm install @radix-ui/react-popover @radix-ui/react-accordion @radix-ui/react-label
npm install framer-motion lucide-react clsx tailwind-merge

# State & Data
npm install @tanstack/react-query @tanstack/react-query-devtools
npm install zustand axios

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# Routing
npm install react-router-dom

# Editor (Questions + Passage)
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image
npm install @tiptap/extension-placeholder @tiptap/extension-character-count

# Charts
npm install recharts

# Notifications
npm install sonner

# Date
npm install date-fns

# Offline / IndexedDB
npm install idb-keyval

# Socket.io
npm install socket.io-client

# Demo Mode (MSW)
npm install -D msw

# Tailwind
npm install -D tailwindcss postcss autoprefixer @tailwindcss/typography
```

## Step 0.3 — Tailwind Config (Provided — Already Configured)
Use the provided config with HSL CSS variables as-is.

Add Google Fonts in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

## Step 0.4 — CSS Variables (`src/index.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --primary: 141 78% 29%;           /* #167d1c */
    --primary-foreground: 0 0% 98%;
    --accent: 33 100% 50%;            /* #ff9001 */
    --accent-foreground: 0 0% 100%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --success: 142 76% 36%;
    --success-foreground: 0 0% 98%;
    --warning: 38 92% 50%;
    --warning-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 141 78% 29%;
    --radius: 0.5rem;
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 0 0% 9%;
    --sidebar-primary: 141 78% 29%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 0 0% 96.1%;
    --sidebar-accent-foreground: 0 0% 9%;
    --sidebar-border: 0 0% 89.8%;
    --sidebar-ring: 141 78% 29%;
    --font-inter: 'Inter', sans-serif;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    /* ... dark tokens */
  }
}
```

## Step 0.5 — Utils (`src/lib/utils.ts`)
```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Step 0.6 — API Client (`src/lib/api.ts`)
```ts
import axios from 'axios'
import { useAuthStore } from '@/stores/auth.store'

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL + '/api' })

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
        refresh_token: useAuthStore.getState().refreshToken
      })
      useAuthStore.getState().setTokens(data.access_token, data.refresh_token)
      return api.request(error.config)
    }
    return Promise.reject(error)
  }
)
```

**✅ Phase 0 Complete**

---

# 🗂️ PHASE 1 — Folder Structure

## Step 1.1 — Full Source Tree
```
src/
├── main.tsx
├── App.tsx
├── index.css
│
├── lib/
│   ├── api.ts              ← Axios instance
│   ├── utils.ts            ← cn()
│   ├── queryClient.ts      ← React Query setup
│   └── socket.ts           ← Socket.io factory
│
├── stores/                 ← Zustand stores
│   ├── auth.store.ts
│   ├── exam.store.ts       ← in-progress exam state
│   ├── monitoring.store.ts
│   └── ui.store.ts
│
├── hooks/                  ← Shared React Query hooks
│   ├── useAuth.ts
│   ├── useSchool.ts
│   └── useNotifications.ts
│
├── hooks/exam/             ← Exam-specific hooks
│   ├── useExamSession.ts
│   ├── useExamTimer.ts
│   ├── useAutoSave.ts
│   ├── useAntiCheat.ts
│   ├── usePassageOverlay.ts
│   ├── useProctoring.ts
│   ├── useAdaptiveTesting.ts
│   └── useOfflineSync.ts
│
├── components/             ← Reusable UI
│   ├── ui/                 ← Base design system
│   ├── layout/             ← Sidebar, Topbar, Layouts
│   ├── auth/               ← Login forms
│   ├── exam/               ← Question cards, timer, passage
│   ├── monitoring/         ← Student cards, alert feed
│   ├── questions/          ← Question forms, CSV import
│   ├── exam-wizard/        ← 5-step exam creation
│   └── demo/               ← Demo mode components
│
├── pages/
│   ├── demo/               ← DemoPage (role selector)
│   ├── auth/               ← Login, ChangePassword, Forgot
│   ├── super-admin/
│   ├── admin/
│   ├── teacher/
│   ├── invigilator/
│   ├── student/
│   └── exam/               ← ExamEngine (fullscreen layout)
│
├── router/
│   ├── index.tsx
│   ├── guards.tsx          ← PrivateRoute, RoleRoute, PasswordChangeGate
│   └── routes/             ← per-role route configs
│
├── demo/                   ← Demo Mode MSW + mock data
│   ├── browser.ts
│   ├── handlers.ts
│   └── mock-data/
│
└── config/
    └── nav.config.ts       ← sidebar nav per role
```

**✅ Phase 1 Complete**

---

# 🎨 PHASE 2 — Base UI Components (Design System)

## Step 2.1 — Button (`src/components/ui/button.tsx`)
```tsx
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:   'bg-primary text-primary-foreground hover:bg-primary/90',
        accent:    'bg-accent text-accent-foreground hover:bg-accent/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:   'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost:     'hover:bg-accent hover:text-accent-foreground',
        link:      'text-primary underline-offset-4 hover:underline',
        success:   'bg-success text-success-foreground hover:bg-success/90',
        warning:   'bg-warning text-warning-foreground hover:bg-warning/90',
      },
      size: {
        sm:      'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        lg:      'h-12 px-8 text-base',
        icon:    'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ButtonProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export const Button = ({ className, variant, size, loading, children, ...props }: ButtonProps) => (
  <button className={cn(buttonVariants({ variant, size }), className)} disabled={loading || props.disabled} {...props}>
    {loading && <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
    {children}
  </button>
)
```

## Step 2.2 — Core Components to Build
Create each in `src/components/ui/`:
- `input.tsx` — with label, error, hint support
- `textarea.tsx`
- `select.tsx` — Radix `@radix-ui/react-select` wrapper
- `checkbox.tsx` — Radix wrapper, green checkmark
- `switch.tsx` — Radix wrapper
- `badge.tsx` — variant props: default, success, warning, destructive, secondary
- `card.tsx` — Card, CardHeader, CardTitle, CardContent, CardFooter
- `dialog.tsx` — Radix Dialog wrapper with Header + Footer slots
- `alert.tsx` — info, success, warning, destructive
- `avatar.tsx` — initials fallback
- `progress.tsx` — Radix wrapper
- `separator.tsx`
- `skeleton.tsx` — animate-pulse placeholder
- `tabs.tsx` — Radix TabGroup wrapper
- `tooltip.tsx` — Radix wrapper
- `data-table.tsx` — sortable, paginated, searchable
- `empty-state.tsx` — icon + message + action
- `stat-card.tsx` — icon + value + trend

**✅ Phase 2 Complete**

---

# 🏗️ PHASE 3 — Layout System

## Step 3.1 — Zustand Auth Store (`src/stores/auth.store.ts`)
```ts
import { create } from 'zustand'

interface User { id: string; user_code: string; role: string; school_id: string; must_change_password: boolean; first_name: string; last_name: string; school?: { name: string; logo_url?: string; primary_color: string; accent_color: string } }

interface AuthStore {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  setAuth: (user: User, access: string, refresh: string) => void
  setTokens: (access: string, refresh: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null, accessToken: null, refreshToken: null,
  setAuth: (user, accessToken, refreshToken) => {
    set({ user, accessToken, refreshToken })
    applySchoolTheme(user.school)
  },
  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
  clearAuth: () => set({ user: null, accessToken: null, refreshToken: null }),
}))

function applySchoolTheme(school?: User['school']) {
  if (!school) return
  const toHSL = (hex: string) => hexToHSL(hex)
  document.documentElement.style.setProperty('--primary', toHSL(school.primary_color))
  document.documentElement.style.setProperty('--accent', toHSL(school.accent_color))
}
```

## Step 3.2 — Nav Config (`src/config/nav.config.ts`)
```ts
export const navConfig: Record<string, NavItem[]> = {
  super_admin: [
    { label: 'Dashboard', path: '/super-admin/dashboard', icon: 'LayoutDashboard' },
    { label: 'Schools', path: '/super-admin/schools', icon: 'Building2' },
    { label: 'Billing', path: '/super-admin/billing', icon: 'CreditCard' },
    { label: 'Analytics', path: '/super-admin/analytics', icon: 'BarChart3' },
    { label: 'Broadcast', path: '/super-admin/broadcast', icon: 'Megaphone' },
    { label: 'Settings', path: '/super-admin/settings', icon: 'Settings' },
    { label: 'Audit Logs', path: '/super-admin/audit-logs', icon: 'ScrollText' },
  ],
  school_admin: [ /* teacher, student, classes, subjects, approvals, retakes, results, settings */ ],
  teacher: [ /* dashboard, question-banks, exams, results */ ],
  invigilator: [ /* dashboard, exam-rooms */ ],
  student: [ /* dashboard, results */ ],
}
```

## Step 3.3 — Three Layouts

**`AuthLayout.tsx`**
```tsx
export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center p-4">
      <Outlet />
    </div>
  )
}
```

**`DashboardLayout.tsx`**
```tsx
export function DashboardLayout() {
  const { sidebarOpen } = useUiStore()
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppTopbar />
        <main id="main-content" className="flex-1 overflow-y-auto p-6">
          <PasswordChangeGate>
            <Outlet />
          </PasswordChangeGate>
        </main>
      </div>
    </div>
  )
}
```

**`ExamLayout.tsx`**
```tsx
export function ExamLayout() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-background select-none">
      <Outlet />
    </div>
  )
}
```

## Step 3.4 — Router (`src/router/index.tsx`)
```tsx
export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/demo" replace /> },
  { path: '/demo', element: <DemoPage /> },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/change-password', element: <PrivateRoute><ChangePasswordPage /></PrivateRoute> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
    ]
  },
  {
    path: '/super-admin', element: <PrivateRoute role="super_admin"><DashboardLayout /></PrivateRoute>,
    children: superAdminRoutes,
  },
  {
    path: '/admin', element: <PrivateRoute role="school_admin"><DashboardLayout /></PrivateRoute>,
    children: adminRoutes,
  },
  {
    path: '/teacher', element: <PrivateRoute role="teacher"><DashboardLayout /></PrivateRoute>,
    children: teacherRoutes,
  },
  {
    path: '/invigilator', element: <PrivateRoute role="invigilator"><DashboardLayout /></PrivateRoute>,
    children: invigilatorRoutes,
  },
  {
    path: '/student', element: <PrivateRoute role="student"><DashboardLayout /></PrivateRoute>,
    children: studentRoutes,
  },
  {
    path: '/exam/:sessionId', element: <PrivateRoute><ExamLayout /></PrivateRoute>,
    children: [{ index: true, element: <ExamEngine /> }],
  },
])
```

## Step 3.5 — AppSidebar + AppTopbar
Build both with school logo, role nav items, notification bell, user avatar dropdown. Collapsible on mobile (Sheet component from Radix).

**✅ Phase 3 Complete**

---

# 🔐 PHASE 4 — Authentication

## Step 4.1 — Login Page (Tabbed)
```tsx
// src/pages/auth/LoginPage.tsx
export function LoginPage() {
  const [tab, setTab] = useState<'staff' | 'student'>('staff')
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <img src="/logo.svg" className="h-12 w-auto mx-auto mb-4" />
        <CardTitle className="text-2xl font-bold">CBT Platform</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="staff">Staff Login</TabsTrigger>
            <TabsTrigger value="student">Student Login</TabsTrigger>
          </TabsList>
          <TabsContent value="staff"><StaffLoginForm /></TabsContent>
          <TabsContent value="student"><StudentLoginForm /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
```

## Step 4.2 — Route Guards (`src/router/guards.tsx`)
```tsx
export function PrivateRoute({ children, role }: { children: ReactNode; role?: string }) {
  const { user, accessToken } = useAuthStore()

  if (!accessToken) return <Navigate to="/login" replace />
  if (role && user?.role !== role) return <Navigate to={`/${rolePath(user!.role)}/dashboard`} replace />

  return <>{children}</>
}

export function PasswordChangeGate({ children }: { children: ReactNode }) {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.must_change_password && user.role !== 'student') {
      navigate('/change-password', { replace: true })
    }
  }, [user])

  return <>{children}</>
}
```

**✅ Phase 4 Complete**

---

# 📝 PHASE 5 — STUDENT PANEL (Full Detail)

## Step 5.1 — StudentDashboard (`/student/dashboard`)
```tsx
export function StudentDashboard() {
  const { data: exams } = useQuery({ queryKey: ['student-exams'], queryFn: fetchStudentExams })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-inter">My Exams</h1>

      {/* Paused session banner — highest priority */}
      {exams?.paused && (
        <Alert variant="warning" className="border-warning">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You have a paused exam: <strong>{exams.paused.exam_name}</strong>.
            <Button variant="warning" size="sm" className="ml-3" onClick={() => resumeExam(exams.paused.session_id)}>
              Resume Exam
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Retake approved banner */}
      {exams?.retake_approved && (
        <Alert className="border-accent bg-accent/10">
          <RefreshCcw className="h-4 w-4 text-accent" />
          <AlertDescription>
            Your retake for <strong>{exams.retake_approved.exam_name}</strong> has been approved.
            <div className="mt-1 text-sm text-muted-foreground italic">
              "{exams.retake_approved.retake_note}"
            </div>
            <Button variant="accent" size="sm" className="mt-2" onClick={() => startRetake(exams.retake_approved)}>
              Start Retake ({exams.retake_approved.granted_minutes} min)
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Exam cards grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {exams?.assigned?.map(exam => <ExamCard key={exam.id} exam={exam} />)}
      </div>
    </div>
  )
}
```

**ExamCard states:**
```tsx
function ExamCard({ exam }: { exam: StudentExam }) {
  const state = getExamCardState(exam)

  return (
    <Card className={cn('transition-all', state.borderClass)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{exam.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{exam.subject_name}</p>
          </div>
          <Badge variant={state.badgeVariant}>{state.statusLabel}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div className="flex gap-4">
          <span>⏱ {exam.duration_minutes} min</span>
          <span>❓ {exam.question_count} questions</span>
          <span>🎯 Pass: {exam.pass_mark}%</span>
        </div>
        {exam.starts_at && <CountdownTimer endsAt={exam.starts_at} label="Starts in" />}
      </CardContent>
      <CardFooter>
        {state.action && (
          <Button className="w-full" variant={state.actionVariant} onClick={state.onClick}>
            {state.actionLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Card state matrix:
function getExamCardState(exam: StudentExam) {
  if (exam.session?.status === 'PAUSED')           return { borderClass: 'border-l-4 border-warning', badgeVariant: 'warning', statusLabel: 'Paused', actionLabel: 'Resume Exam', actionVariant: 'warning', ... }
  if (exam.retake_status === 'APPROVED')            return { borderClass: 'border-l-4 border-accent', badgeVariant: 'accent', statusLabel: 'Retake Approved', ... }
  if (exam.retake_status === 'PENDING')             return { borderClass: 'border-l-4 border-muted', statusLabel: 'Retake Pending', actionLabel: 'Awaiting Approval…', ... }
  if (exam.status === 'ACTIVE' && !exam.session)   return { borderClass: 'border-l-4 border-success', badgeVariant: 'success', statusLabel: 'Active Now', actionLabel: 'Start Exam', ... }
  if (exam.result?.result_status === 'RELEASED')   return { borderClass: 'border-l-4 border-primary', statusLabel: 'Result Available', actionLabel: 'View Result', ... }
  if (exam.session?.status === 'SUBMITTED')        return { borderClass: '', statusLabel: 'Submitted', actionLabel: 'Awaiting Results', ... }
  return { statusLabel: 'Upcoming', ... }
}
```

## Step 5.2 — ExamInstructions (`/student/exams/:examId/instructions`)
```tsx
export function ExamInstructions() {
  const { examId } = useParams()
  const { data: exam } = useQuery({ queryKey: ['exam-instructions', examId], queryFn: () => fetchExamInstructions(examId!) })
  const navigate = useNavigate()
  const [starting, setStarting] = useState(false)

  async function handleStart() {
    setStarting(true)
    const { session_id } = await api.post(`/sessions/${examId}/join`)
    navigate(`/exam/${session_id}`)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Retake note banner */}
      {exam?.is_retake && (
        <Alert className="border-accent bg-accent/5">
          <RefreshCcw className="h-4 w-4 text-accent" />
          <AlertTitle>Retake Session</AlertTitle>
          <AlertDescription>
            {exam.retake_note}
            <p className="mt-1 font-semibold">You have {exam.granted_minutes} minutes. You will resume from where you left off.</p>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{exam?.name}</CardTitle>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>📚 {exam?.subject_name}</span>
            <span>⏱ {exam?.duration_minutes} min</span>
            <span>❓ {exam?.question_count} questions</span>
            <span>🎯 Pass: {exam?.pass_mark}%</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Instructions</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{exam?.instructions}</p>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2">Exam Rules</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>🔒 Fullscreen mode is required throughout the exam</li>
              <li>⚠️ Tab switching is monitored and logged</li>
              <li>🚫 Copy and paste is disabled</li>
              <li>💾 Answers are auto-saved every 30 seconds</li>
              <li>📷 Webcam monitoring may be active</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg" onClick={handleStart} loading={starting}>
            {exam?.is_retake ? 'Start Retake' : 'Start Exam'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
```

## Step 5.3 — ExamEngine (`/exam/:sessionId`) — CRITICAL

### Layout
```tsx
// src/pages/exam/ExamEngine.tsx
export function ExamEngine() {
  const { sessionId } = useParams()
  const session = useExamSession(sessionId!)
  const timer = useExamTimer(session.remainingSeconds, handleAutoSubmit)
  const autoSave = useAutoSave(sessionId!)
  const { passageOpen, openPassage, closePassage } = usePassageOverlay()
  const antiCheat = useAntiCheat(sessionId!)
  const proctor = useProctoring(sessionId!)
  const offlineSync = useOfflineSync(sessionId!)

  const examStore = useExamStore()
  const currentQuestion = session.questions[examStore.currentIndex]

  // Auto-close passage on question navigation
  useEffect(() => { closePassage() }, [examStore.currentIndex])

  // Request fullscreen on mount
  useEffect(() => { document.documentElement.requestFullscreen?.() }, [])

  function handleAnswer(optionIds: string[]) {
    examStore.setAnswer(currentQuestion.id, optionIds)
    autoSave.saveAnswer(currentQuestion.id, optionIds)
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
            selectedAnswer={examStore.answers[currentQuestion?.id]}
            isFlagged={examStore.flagged[currentQuestion?.id]}
            onAnswer={handleAnswer}
            onFlag={() => examStore.toggleFlag(currentQuestion.id)}
          />
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => examStore.prev()} disabled={examStore.currentIndex === 0}>
              ← Previous
            </Button>
            <Button onClick={() => examStore.next()} disabled={examStore.currentIndex === session.questions.length - 1}>
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
      <AutoSaveIndicator lastSaved={autoSave.lastSaved} status={autoSave.status} />

      {/* PASSAGE OVERLAY */}
      <PassageOverlay
        open={passageOpen}
        partKey={currentQuestion?.passage_part_key}
        title={currentQuestion?.passage_title}
        content={currentQuestion?.passage_content}
        onClose={closePassage}
      />

      {/* SUBMIT REVIEW DIALOG */}
      <SubmitReviewDialog
        open={reviewOpen}
        questions={session.questions}
        answers={examStore.answers}
        flagged={examStore.flagged}
        onNavigate={(i) => { setReviewOpen(false); examStore.goTo(i) }}
        onSubmit={handleManualSubmit}
      />

      {/* LOGOUT CONFIRM DIALOG */}
      <LogoutConfirmDialog open={logoutOpen} onConfirm={handlePause} onCancel={() => setLogoutOpen(false)} />

      {/* RECONNECTING OVERLAY */}
      {!isOnline && <ReconnectingOverlay />}

      {/* PROCTORING VIDEO (hidden) */}
      <video ref={proctor.videoRef} className="hidden" autoPlay muted />
    </div>
  )
}
```

### ExamTopbar
```tsx
function ExamTopbar({ examName, currentQuestion, timer, onPassageOpen, onLogout }) {
  return (
    <div className={cn(
      'flex items-center justify-between px-6 py-3 border-b transition-colors',
      timer.remaining <= 300 ? 'bg-destructive/10 border-destructive/30' :
      timer.remaining <= 600 ? 'bg-warning/10 border-warning/30' :
      timer.remaining <= 1800 ? 'bg-yellow-50 border-yellow-200' : 'bg-background border-border'
    )}>
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-base">{examName}</h1>
        {currentQuestion?.passage_part_key && (
          <Button variant="outline" size="sm" onClick={onPassageOpen} className="border-primary text-primary">
            <BookOpen className="h-4 w-4 mr-1" />
            Passage {currentQuestion.passage_part_key}
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <TimerDisplay remaining={timer.remaining} formatted={timer.formatted} />
        <Button variant="outline" size="sm" onClick={onLogout} className="text-muted-foreground">
          <LogOut className="h-4 w-4 mr-1" />
          Pause & Exit
        </Button>
      </div>
    </div>
  )
}
```

### PassageOverlay
```tsx
function PassageOverlay({ open, partKey, title, content, onClose }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Critical: always scroll to top on open
  useEffect(() => {
    if (open && scrollRef.current) scrollRef.current.scrollTop = 0
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto" ref={scrollRef}>
      {/* Sticky header */}
      <div className="sticky top-0 bg-background border-b z-10 px-6 py-4 flex justify-between items-center shadow-sm">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Passage {partKey}</p>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <Button variant="outline" onClick={onClose}>✕ Close Passage</Button>
      </div>
      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="prose prose-neutral max-w-none text-base leading-8" dangerouslySetInnerHTML={{ __html: content || '' }} />
      </div>
      {/* Bottom close */}
      <div className="flex justify-center pb-12">
        <Button size="lg" onClick={onClose}>Close & Return to Question</Button>
      </div>
    </div>
  )
}
```

### useExamTimer Hook
```tsx
export function useExamTimer(initialSeconds: number, onExpire: () => void) {
  const [remaining, setRemaining] = useState(initialSeconds)
  const { toast } = useSonner()

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) { clearInterval(interval); onExpire(); return 0 }
        if (prev === 1800) toast.warning('30 minutes remaining')
        if (prev === 600)  toast.warning('⚠️ 10 minutes remaining!')
        if (prev === 300)  toast.error('🚨 5 minutes remaining!')
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

### useAutoSave Hook
```tsx
export function useAutoSave(sessionId: string) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const debouncedSave = useMemo(() =>
    debounce(async (questionId: string, answer: string[]) => {
      setStatus('saving')
      try {
        await api.put(`/sessions/${sessionId}/answers`, { question_id: questionId, selected_ids: answer })
        setLastSaved(new Date()); setStatus('saved')
      } catch {
        setStatus('error')
      }
    }, 500), [sessionId]
  )

  useEffect(() => {
    const interval = setInterval(async () => {
      const answers = useExamStore.getState().answers
      if (Object.keys(answers).length === 0) return
      setStatus('saving')
      try {
        await api.put(`/sessions/${sessionId}/answers/bulk`, { answers: Object.entries(answers).map(([q, a]) => ({ question_id: q, selected_ids: a })) })
        setLastSaved(new Date()); setStatus('saved')
      } catch { setStatus('error') }
    }, 30_000)
    return () => clearInterval(interval)
  }, [sessionId])

  return { saveAnswer: debouncedSave, lastSaved, status }
}
```

### useAntiCheat Hook
```tsx
export function useAntiCheat(sessionId: string) {
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        api.post(`/sessions/${sessionId}/events`, { type: 'tab_switch' })
        socketRef.emit('tab:switch', { sessionId })
      }
    }
    const onFullscreen = () => {
      if (!document.fullscreenElement) {
        api.post(`/sessions/${sessionId}/events`, { type: 'fullscreen_exit' })
        socketRef.emit('fullscreen:exit', { sessionId })
      }
    }
    const prevent = (e: Event) => { e.preventDefault(); api.post(`/sessions/${sessionId}/events`, { type: 'copy_attempt' }) }

    document.addEventListener('visibilitychange', onVisibility)
    document.addEventListener('fullscreenchange', onFullscreen)
    document.addEventListener('copy', prevent)
    document.addEventListener('paste', prevent)
    document.addEventListener('cut', prevent)
    document.addEventListener('contextmenu', prevent)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      document.removeEventListener('fullscreenchange', onFullscreen)
      document.removeEventListener('copy', prevent)
      document.removeEventListener('paste', prevent)
      document.removeEventListener('cut', prevent)
      document.removeEventListener('contextmenu', prevent)
    }
  }, [sessionId])
}
```

## Step 5.4 — AnswerStatusPanel
```tsx
export function AnswerStatusPanel({ questions, answers, flagged, currentIndex, onNavigate, onOpenReview }) {
  const answered = questions.filter(q => answers[q.id]?.length > 0).length

  return (
    <aside className="w-64 border-l bg-muted/20 flex flex-col overflow-y-auto p-4 space-y-4">
      {/* Legend */}
      <div className="space-y-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-primary" />Answered</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-accent" />Flagged</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-muted border" />Unanswered</div>
      </div>
      {/* Stats */}
      <div className="text-sm font-medium">{answered}/{questions.length} answered</div>
      {/* Grid */}
      <div className="grid grid-cols-5 gap-1.5">
        {questions.map((q, i) => (
          <button key={q.id} onClick={() => onNavigate(i)} className={cn(
            'h-8 w-8 rounded text-xs font-bold transition-colors',
            i === currentIndex && 'ring-2 ring-ring ring-offset-1',
            flagged[q.id] ? 'bg-accent text-accent-foreground' :
            answers[q.id]?.length ? 'bg-primary text-primary-foreground' :
            'bg-muted text-muted-foreground hover:bg-muted/70',
          )}>
            {i + 1}
          </button>
        ))}
      </div>
      {/* Actions */}
      <div className="space-y-2 pt-2">
        <Button variant="outline" className="w-full" size="sm" onClick={onOpenReview}>
          Review & Submit
        </Button>
      </div>
    </aside>
  )
}
```

## Step 5.5 — Student Results Page
```tsx
// /student/results
export function StudentResults() {
  const { data } = useQuery({ queryKey: ['student-results'], queryFn: fetchStudentResults })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Results</h1>
      <div className="space-y-4">
        {data?.map(result => (
          <Card key={result.id}>
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <p className="font-semibold">{result.exam_name}</p>
                <p className="text-sm text-muted-foreground">{result.subject_name} · {formatDate(result.submitted_at)}</p>
                {result.is_retake && <Badge variant="secondary" className="mt-1">Retake Attempt</Badge>}
                {result.superseded && <Badge variant="outline" className="mt-1 line-through">Superseded</Badge>}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{result.percentage.toFixed(1)}%</p>
                <Badge variant={result.pass_fail === 'PASS' ? 'success' : 'destructive'}>
                  {result.pass_fail}
                </Badge>
                <Button variant="ghost" size="sm" className="mt-1" onClick={() => viewDetail(result.id)}>
                  View Details →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

**✅ Phase 5 (Student Panel) Complete**

---

# 🎭 PHASE 6 — Demo Mode

## Step 6.1 — DemoPage (Role Selector)
```tsx
// src/pages/demo/DemoPage.tsx
const ROLES = [
  { id: 'super_admin',  label: 'Super Admin',  icon: Building2,  color: 'hsl(214 100% 62%)', desc: 'Manage all schools, billing & platform health. Onboard institutions.' },
  { id: 'school_admin', label: 'School Admin',  icon: GraduationCap, color: 'hsl(207 90% 61%)', desc: 'Manage teachers & students. Approve exams. View analytics.' },
  { id: 'teacher',      label: 'Teacher',       icon: BookOpen,   color: 'hsl(122 39% 49%)', desc: 'Build question banks, create exams, release results.' },
  { id: 'invigilator',  label: 'Invigilator',   icon: Eye,        color: 'hsl(36 100% 50%)', desc: 'Monitor live exams, manage students, request retakes.' },
  { id: 'student',      label: 'Student',       icon: PenLine,    color: 'hsl(291 64% 42%)', desc: 'Take exams with auto-save, passage support, and results.' },
]

export function DemoPage() {
  const navigate = useNavigate()

  function startDemo(roleId: string) {
    const mockUser = demoMockUsers[roleId]
    useAuthStore.getState().setAuth(mockUser, 'demo-token', 'demo-refresh')
    navigate(`/${rolePath(roleId)}/dashboard`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="text-center pt-20 pb-12 px-4">
        <div className="inline-flex items-center gap-2 bg-primary/20 text-primary border border-primary/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" />
          Interactive Demo
        </div>
        <h1 className="text-5xl font-extrabold text-white mb-4 font-inter">Explore the CBT Platform</h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Select a role to experience a live preview of the full platform. No account required.
        </p>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-6xl mx-auto px-6 pb-12">
        {ROLES.map(role => (
          <motion.div
            key={role.id}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className="cursor-pointer bg-slate-800/60 border-slate-700 hover:border-primary/60 transition-all h-full"
              onClick={() => startDemo(role.id)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: role.color + '22', border: `2px solid ${role.color}44` }}>
                  <role.icon className="h-7 w-7" style={{ color: role.color }} />
                </div>
                <div>
                  <p className="font-bold text-white text-base">{role.label}</p>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{role.desc}</p>
                </div>
                <Button size="sm" className="w-full mt-auto" style={{ backgroundColor: role.color }}>
                  Explore as {role.label} →
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-slate-600 text-sm pb-8">
        Read-only demo data · No real actions taken · Resets on role switch
      </p>
    </div>
  )
}
```

## Step 6.2 — MSW Demo Handlers
```ts
// src/demo/handlers.ts
import { http, HttpResponse, delay } from 'msw'
import { teacherMock, studentMock, adminMock, superAdminMock, invigilatorMock } from './mock-data'

export const demoHandlers = [
  http.get('*/api/exams', async ({ request }) => {
    await delay(300)
    return HttpResponse.json(teacherMock.exams)
  }),
  http.get('*/api/student/exams', async () => {
    await delay(200)
    return HttpResponse.json(studentMock.exams)
  }),
  http.post('*/api/exams/:id/approve', async () => {
    await delay(500)
    return HttpResponse.json({ success: true, status: 'PUBLISHED', message: 'Exam approved successfully' })
  }),
  http.get('*/api/analytics', async () => {
    await delay(400)
    return HttpResponse.json(superAdminMock.analytics)
  }),
  // ... all endpoints mocked per role
]
```

## Step 6.3 — Demo Mode Provider
```tsx
// src/demo/DemoModeProvider.tsx
export function DemoModeProvider({ children }: { children: ReactNode }) {
  const { accessToken } = useAuthStore()
  const isDemo = accessToken === 'demo-token'

  // Show demo banner across all pages
  return (
    <>
      {isDemo && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-accent text-accent-foreground text-center text-xs py-1.5 font-medium">
          🎭 Demo Mode — Read-only preview · <Link to="/demo" className="underline">Switch Role</Link>
        </div>
      )}
      <div className={cn(isDemo && 'pt-7')}>
        {children}
      </div>
    </>
  )
}
```

**✅ Phase 6 Complete**

---

# 👑 PHASE 7 — Super Admin Module
All pages in `src/pages/super-admin/`:
- `SuperDashboard.tsx` — stat cards, school health grid, system status
- `SchoolList.tsx` — DataTable with filter chips + actions
- `SchoolCreate.tsx` — 4-step wizard (Info → Admin → Plan → Review)
- `SchoolDetail.tsx` — tabs: Overview | Users | Billing | Audit
- `BillingManagement.tsx` — per-school table, Paystack status, grace actions
- `PlatformAnalytics.tsx` — recharts graphs: revenue, exam activity, school growth
- `BroadcastMessage.tsx` — target + compose + send
- `AuditLogs.tsx` — filterable table with date range

**✅ Phase 7 Complete**

---

# 🏫 PHASE 8 — School Admin + Teacher Modules
All pages per `/admin/` and `/teacher/` prefix. Teacher includes 5-step `ExamWizard` with:
1. Basic Info (name, subject, class, instructions, pass mark)
2. Question Selection (manual pick or auto-select by difficulty ratio)
3. Settings (duration, navigation, shuffle info card, access code)
4. Schedule (date/time pickers + timezone)
5. Review & Submit for Approval

**✅ Phase 8 Complete**

---

# 👁️ PHASE 9 — Invigilator Monitoring
`ExamRoomMonitor.tsx` with:
- `useMonitoringSocket` WebSocket hook
- `StudentStatusCard` with all status states + flashing border on alert
- `AlertFeed` auto-scrolling panel
- `RetakeRequestModal` (eligibility gate)
- `useBlocker` navigation guard
- End Exam button with blocking dialog if active sessions remain

**✅ Phase 9 Complete**

---

# 📊 PHASE 10 — Results, Notifications & Polish
- Result release toggle per student or batch
- Retake supersession display (SUPERSEDED badge + ACTIVE RESULT badge)
- `NotificationBell` with polling + WebSocket events
- Critical alerts as Radix `Dialog` (billing, suspension)
- WCAG accessibility audit: aria labels, focus traps, color contrast
- Responsive audit: mobile sidebar drawer, exam engine single-column

**✅ Phase 10 Complete — Frontend Production-Ready**

---

# 📊 IMPLEMENTATION PRIORITY TABLE

| Priority | Phase | Module | Est. Effort |
|----------|-------|--------|-------------|
| 1 | 0 | Bootstrap | 0.5 days |
| 2 | 1 | Folder Structure | 0.5 days |
| 3 | 2 | Design System | 2–3 days |
| 4 | 3 | Layout + Router | 1–2 days |
| 5 | 4 | Authentication | 1–2 days |
| 6 | 5 | Student Panel ⭐ | 3–4 days |
| 7 | 6 | Demo Mode | 1–2 days |
| 8 | 8 | Teacher (Questions + Wizard) | 3–4 days |
| 9 | 9 | Invigilator Monitoring | 2–3 days |
| 10 | 7 | Super Admin | 2–3 days |
| 11 | 8 | School Admin | 2–3 days |
| 12 | 10 | Results + Notifications + Polish | 2–3 days |
| **Total** | — | — | **~21–29 days** |

---

*CBT Frontend Implementation Roadmap v1.0 — React + Vite + Tailwind + Radix UI*
