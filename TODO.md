# CBT Platform Frontend - Complete TODO List

## 📋 Project Status Overview
**Current State:** Basic scaffolding exists with some UI components and folder structure
**Goal:** Complete production-ready CBT platform with all 10 phases implemented

---

## ✅ PHASE 0 — Project Bootstrap (PARTIALLY COMPLETE)

### Dependencies Installation
- [ ] **Install missing core dependencies**
  ```bash
  npm install tailwindcss-animate @radix-ui/react-dialog @radix-ui/react-dropdown-menu
  npm install @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-toast
  npm install @radix-ui/react-select @radix-ui/react-checkbox @radix-ui/react-switch
  npm install @radix-ui/react-progress @radix-ui/react-avatar @radix-ui/react-separator
  npm install @radix-ui/react-popover @radix-ui/react-accordion @radix-ui/react-label
  npm install framer-motion lucide-react clsx tailwind-merge
  ```

- [ ] **Install state & data management**
  ```bash
  npm install @tanstack/react-query @tanstack/react-query-devtools
  npm install zustand axios
  ```

- [ ] **Install forms & validation**
  ```bash
  npm install react-hook-form @hookform/resolvers zod
  ```

- [ ] **Install editor dependencies**
  ```bash
  npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image
  npm install @tiptap/extension-placeholder @tiptap/extension-character-count
  ```

- [ ] **Install additional utilities**
  ```bash
  npm install recharts sonner date-fns idb-keyval socket.io-client
  npm install -D msw @tailwindcss/typography
  ```

### Configuration Files
- [x] ✅ Vite config with path alias
- [x] ✅ Basic CSS variables in index.css
- [ ] **Add Google Fonts to index.html**
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  ```
- [ ] **Create .env.example file**
  ```
  VITE_API_URL=http://localhost:3000
  ```

---

## 🗂️ PHASE 1 — Folder Structure (MOSTLY COMPLETE)

### Core Library Files
- [x] ✅ `src/lib/utils.ts` - cn() utility
- [x] ✅ `src/lib/api.ts` - Axios instance
- [ ] **Fix `src/lib/queryClient.ts`** - React Query setup
- [ ] **Fix `src/lib/socket.ts`** - Socket.io factory

### Store Files
- [x] ✅ `src/stores/auth.store.ts` - Basic auth store
- [ ] **Enhance auth.store.ts** - Add school theming, refresh tokens, must_change_password
- [ ] **Create `src/stores/auth.persist.ts`** - Persist auth to localStorage
- [x] ✅ `src/stores/exam.store.ts` - Exam state
- [x] ✅ `src/stores/monitoring.store.ts` - Monitoring state
- [x] ✅ `src/stores/ui.store.ts` - UI state (sidebar, modals)

### Hook Files
- [x] ✅ `src/hooks/useAuth.ts`
- [x] ✅ `src/hooks/useSchool.ts`
- [x] ✅ `src/hooks/useNotifications.ts`
- [ ] **Create exam hooks directory with all hooks:**
  - [ ] `src/hooks/exam/useExamSession.ts`
  - [ ] `src/hooks/exam/useExamTimer.ts`
  - [ ] `src/hooks/exam/useAutoSave.ts`
  - [ ] `src/hooks/exam/useAntiCheat.ts`
  - [ ] `src/hooks/exam/usePassageOverlay.ts`
  - [ ] `src/hooks/exam/useProctoring.ts`
  - [ ] `src/hooks/exam/useAdaptiveTesting.ts`
  - [ ] `src/hooks/exam/useOfflineSync.ts`

---

## 🎨 PHASE 2 — Base UI Components (MOSTLY COMPLETE)

### Existing Components to Review & Fix
- [x] ✅ `button.tsx` - Looks good
- [ ] **Review & enhance these components:**
  - [ ] `input.tsx` - Add label, error, hint support
  - [ ] `textarea.tsx` - Add label, error support
  - [ ] `select.tsx` - Ensure Radix wrapper is complete
  - [ ] `checkbox.tsx` - Verify green checkmark styling
  - [ ] `switch.tsx` - Verify Radix wrapper
  - [ ] `badge.tsx` - Add all variants (success, warning, destructive, secondary)
  - [ ] `card.tsx` - Verify Card, CardHeader, CardTitle, CardContent, CardFooter
  - [ ] `dialog.tsx` - Ensure Header + Footer slots
  - [ ] `alert.tsx` - Add all variants (info, success, warning, destructive)
  - [ ] `avatar.tsx` - Add initials fallback
  - [ ] `progress.tsx` - Verify Radix wrapper
  - [ ] `separator.tsx` - Verify implementation
  - [ ] `skeleton.tsx` - Add animate-pulse
  - [ ] `tabs.tsx` - Verify Radix TabGroup wrapper
  - [ ] `tooltip.tsx` - Verify Radix wrapper
  - [ ] `data-table.tsx` - Add sortable, paginated, searchable features
  - [ ] `empty-state.tsx` - icon + message + action
  - [ ] `stat-card.tsx` - icon + value + trend

### Missing Components to Create
- [ ] **Create `label.tsx`** - Form label component
- [ ] **Create `form.tsx`** - React Hook Form wrapper components
- [ ] **Create `dropdown-menu.tsx`** - Radix dropdown wrapper
- [ ] **Create `popover.tsx`** - Radix popover wrapper
- [ ] **Create `accordion.tsx`** - Radix accordion wrapper
- [ ] **Create `toast.tsx`** - Sonner toast wrapper

---

## 🏗️ PHASE 3 — Layout System (PARTIALLY COMPLETE)

### Auth Store Enhancement
- [ ] **Update `src/stores/auth.store.ts`:**
  - [ ] Add `refreshToken` field
  - [ ] Add `must_change_password` field
  - [ ] Add school object with theme colors
  - [ ] Implement `applySchoolTheme()` function
  - [ ] Add `hexToHSL()` utility function

### Navigation Configuration
- [ ] **Complete `src/config/nav.config.ts`:**
  - [ ] Add super_admin nav items
  - [ ] Add school_admin nav items
  - [ ] Add teacher nav items
  - [ ] Add invigilator nav items
  - [ ] Add student nav items
  - [ ] Add icon imports from lucide-react

### Layout Components
- [x] ✅ `AuthLayout.tsx` - Exists
- [x] ✅ `DashboardLayout.tsx` - Exists
- [x] ✅ `ExamLayout.tsx` - Exists
- [ ] **Create `AppSidebar.tsx`:**
  - [ ] School logo display
  - [ ] Role-based navigation items
  - [ ] Collapsible on mobile
  - [ ] User section at bottom
- [ ] **Create `AppTopbar.tsx`:**
  - [ ] Breadcrumbs
  - [ ] Notification bell with badge
  - [ ] User avatar dropdown
  - [ ] Mobile menu toggle

### Router Enhancement
- [x] ✅ Basic router structure exists
- [ ] **Add all role-based routes:**
  - [ ] Super admin routes
  - [ ] School admin routes
  - [ ] Teacher routes
  - [ ] Invigilator routes
  - [ ] Student routes (dashboard, results)
  - [ ] Exam engine route

### Route Guards
- [x] ✅ `PrivateRoute` exists
- [ ] **Create `PasswordChangeGate` component**
- [ ] **Enhance route guards with proper redirects**

---

## 🔐 PHASE 4 — Authentication (PARTIALLY COMPLETE)

### Login Page
- [x] ✅ Basic LoginPage exists
- [ ] **Enhance LoginPage:**
  - [ ] Add tabbed interface (Staff/Student)
  - [ ] Create `StaffLoginForm` component
  - [ ] Create `StudentLoginForm` component
  - [ ] Add form validation with Zod
  - [ ] Add loading states
  - [ ] Add error handling
  - [ ] Style with school branding

### Auth Pages
- [x] ✅ `ForgotPasswordPage.tsx` exists
- [x] ✅ `ChangePasswordPage.tsx` exists
- [ ] **Enhance ForgotPasswordPage:**
  - [ ] Add email input form
  - [ ] Add success message
  - [ ] Add error handling
- [ ] **Enhance ChangePasswordPage:**
  - [ ] Add current password field
  - [ ] Add new password field
  - [ ] Add confirm password field
  - [ ] Add password strength indicator
  - [ ] Add validation rules display

### Auth Forms Components
- [ ] **Create `src/components/auth/StaffLoginForm.tsx`**
- [ ] **Create `src/components/auth/StudentLoginForm.tsx`**
- [ ] **Create `src/components/auth/PasswordStrengthIndicator.tsx`**

---

## 📝 PHASE 5 — STUDENT PANEL (CRITICAL - HIGH PRIORITY)

### Student Dashboard
- [x] ✅ `StudentDashboard.tsx` exists
- [ ] **Complete StudentDashboard implementation:**
  - [ ] Add paused session banner
  - [ ] Add retake approved banner
  - [ ] Create exam cards grid
  - [ ] Add countdown timers
  - [ ] Implement exam card states logic

### Exam Card Component
- [ ] **Create `src/features/exams/components/ExamCard.tsx`:**
  - [ ] Implement all card states (paused, retake, active, submitted, etc.)
  - [ ] Add border styling based on state
  - [ ] Add badge variants
  - [ ] Add action buttons
  - [ ] Create `getExamCardState()` helper function

### Countdown Timer
- [ ] **Create `src/features/exams/components/CountdownTimer.tsx`:**
  - [ ] Real-time countdown
  - [ ] Format display (days, hours, minutes)
  - [ ] Color coding based on urgency

### Exam Instructions Page
- [ ] **Create `src/features/exams/exam-id/instructions.tsx`:**
  - [ ] Display exam details
  - [ ] Show retake note banner if applicable
  - [ ] List exam rules
  - [ ] Add start exam button
  - [ ] Handle exam session creation

### Exam Engine (CRITICAL COMPONENT)
- [ ] **Create `src/pages/exam/ExamEngine.tsx`:**
  - [ ] Main layout structure
  - [ ] Integrate all hooks (timer, autosave, anti-cheat, etc.)
  - [ ] Question navigation logic
  - [ ] Answer selection handling
  - [ ] Fullscreen mode enforcement

### Exam Topbar
- [ ] **Create `src/features/exams/ExamTopbar.tsx`:**
  - [ ] Exam name display
  - [ ] Passage button (conditional)
  - [ ] Timer display with color coding
  - [ ] Pause & Exit button
  - [ ] Background color changes based on time remaining

### Passage Overlay
- [ ] **Create `src/features/exams/PassageOverlay.tsx`:**
  - [ ] Fullscreen overlay
  - [ ] Sticky header with close button
  - [ ] Scrollable content area
  - [ ] Auto-scroll to top on open
  - [ ] HTML content rendering

### Answer Status Panel
- [ ] **Create `src/features/exams/AnswerStatusPanel.tsx`:**
  - [ ] Question grid (5 columns)
  - [ ] Color coding (answered, flagged, unanswered)
  - [ ] Current question indicator
  - [ ] Answer statistics
  - [ ] Review & Submit button

### Question Card
- [ ] **Create `src/components/exam/QuestionCard.tsx`:**
  - [ ] Question text display
  - [ ] Options rendering (single/multiple choice)
  - [ ] Flag button
  - [ ] Question number display
  - [ ] Image support

### Submit Review Dialog
- [ ] **Create `src/components/exam/SubmitReviewDialog.tsx`:**
  - [ ] Summary of answered/unanswered questions
  - [ ] List of flagged questions
  - [ ] Navigation to specific questions
  - [ ] Final submit confirmation

### Exam Hooks (CRITICAL)
- [ ] **Create `src/hooks/exam/useExamSession.ts`:**
  - [ ] Fetch session data
  - [ ] Load questions
  - [ ] Calculate remaining time
  - [ ] Handle session state

- [ ] **Create `src/hooks/exam/useExamTimer.ts`:**
  - [ ] Countdown timer logic
  - [ ] Warning toasts (30min, 10min, 5min)
  - [ ] Auto-submit on expiry
  - [ ] Formatted time display

- [ ] **Create `src/hooks/exam/useAutoSave.ts`:**
  - [ ] Debounced answer saving
  - [ ] Bulk save every 30 seconds
  - [ ] Save status indicator
  - [ ] Error handling

- [ ] **Create `src/hooks/exam/useAntiCheat.ts`:**
  - [ ] Tab switch detection
  - [ ] Fullscreen exit detection
  - [ ] Copy/paste prevention
  - [ ] Context menu prevention
  - [ ] Event logging to API

- [ ] **Create `src/hooks/exam/usePassageOverlay.ts`:**
  - [ ] Open/close state management
  - [ ] Auto-close on question navigation

- [ ] **Create `src/hooks/exam/useProctoring.ts`:**
  - [ ] Webcam access
  - [ ] Periodic snapshots
  - [ ] Upload to API

- [ ] **Create `src/hooks/exam/useOfflineSync.ts`:**
  - [ ] IndexedDB storage
  - [ ] Offline detection
  - [ ] Sync on reconnection

### Student Results Page
- [ ] **Create `src/pages/student/studentResults.tsx`:**
  - [ ] Results list display
  - [ ] Pass/Fail badges
  - [ ] Percentage display
  - [ ] Retake indicators
  - [ ] Superseded badges
  - [ ] View details button

### Auto-Save Indicator
- [ ] **Create `src/components/exam/AutoSaveIndicator.tsx`:**
  - [ ] Status bar at bottom
  - [ ] Last saved timestamp
  - [ ] Saving/Saved/Error states
  - [ ] Icon indicators

### Reconnecting Overlay
- [ ] **Create `src/components/exam/ReconnectingOverlay.tsx`:**
  - [ ] Fullscreen overlay
  - [ ] Reconnecting message
  - [ ] Spinner animation

---

## 🎭 PHASE 6 — Demo Mode

### Demo Page
- [x] ✅ `DemoPage.tsx` exists
- [ ] **Complete DemoPage implementation:**
  - [ ] Add role cards with icons
  - [ ] Add hover animations (framer-motion)
  - [ ] Add role descriptions
  - [ ] Implement role selection logic
  - [ ] Add demo banner styling

### MSW Setup
- [ ] **Create `src/demo/browser.ts`:**
  - [ ] Initialize MSW worker
  - [ ] Start service worker

- [ ] **Complete `src/demo/handlers.ts`:**
  - [ ] Mock all API endpoints
  - [ ] Add realistic delays
  - [ ] Create handlers for each role

### Mock Data
- [ ] **Create `src/demo/mock-data/index.ts`:**
  - [ ] Super admin mock data
  - [ ] School admin mock data
  - [ ] Teacher mock data
  - [ ] Invigilator mock data
  - [ ] Student mock data
  - [ ] Mock users for each role

### Demo Mode Provider
- [ ] **Create `src/demo/DemoModeProvider.tsx`:**
  - [ ] Demo banner component
  - [ ] Role switch link
  - [ ] Wrap app with provider

---

## 👑 PHASE 7 — Super Admin Module

### Dashboard
- [ ] **Create `src/pages/super-admin/SuperDashboard.tsx`:**
  - [ ] Stat cards (schools, users, revenue, exams)
  - [ ] School health grid
  - [ ] System status indicators
  - [ ] Recent activity feed

### School Management
- [ ] **Create `src/pages/super-admin/SchoolList.tsx`:**
  - [ ] DataTable with schools
  - [ ] Filter chips (status, plan)
  - [ ] Search functionality
  - [ ] Actions (view, edit, suspend)

- [ ] **Create `src/pages/super-admin/SchoolCreate.tsx`:**
  - [ ] 4-step wizard
  - [ ] Step 1: School Info
  - [ ] Step 2: Admin Account
  - [ ] Step 3: Subscription Plan
  - [ ] Step 4: Review & Submit

- [ ] **Create `src/pages/super-admin/SchoolDetails.tsx`:**
  - [ ] Tabs: Overview, Users, Billing, Audit
  - [ ] School information display
  - [ ] User management
  - [ ] Billing history
  - [ ] Audit logs

### Billing Management
- [ ] **Create `src/pages/super-admin/BillingManagment.tsx`:**
  - [ ] Per-school billing table
  - [ ] Paystack status indicators
  - [ ] Grace period actions
  - [ ] Payment history

### Analytics
- [ ] **Create `src/pages/super-admin/PlatformAnalytics.tsx`:**
  - [ ] Revenue charts (recharts)
  - [ ] Exam activity graphs
  - [ ] School growth metrics
  - [ ] User engagement stats

### Broadcast
- [ ] **Create `src/pages/super-admin/BroadcastMessage.tsx`:**
  - [ ] Target selection (all, specific schools, roles)
  - [ ] Message composer
  - [ ] Send button
  - [ ] Broadcast history

### Audit Logs
- [ ] **Create `src/pages/super-admin/AuditLogs.tsx`:**
  - [ ] Filterable table
  - [ ] Date range picker
  - [ ] Action type filters
  - [ ] User filters
  - [ ] Export functionality

---

## 🏫 PHASE 8 — School Admin & Teacher Modules

### School Admin Dashboard
- [ ] **Create `src/pages/admin/AdminDashboard.tsx`:**
  - [ ] School stats
  - [ ] Pending approvals
  - [ ] Recent activity
  - [ ] Quick actions

### School Admin Pages
- [ ] **Create `src/pages/admin/UserManagement.tsx`:**
  - [ ] Teachers table
  - [ ] Students table
  - [ ] Add user forms
  - [ ] Bulk import

- [ ] **Create `src/pages/admin/ExamApproval.tsx`:**
  - [ ] Pending exams list
  - [ ] Exam preview
  - [ ] Approve/Reject actions
  - [ ] Comments

### Teacher Dashboard
- [ ] **Create `src/pages/teacher/TeacherDashboard.tsx`:**
  - [ ] My exams overview
  - [ ] Question banks stats
  - [ ] Recent results
  - [ ] Quick actions

### Teacher Pages
- [ ] **Create `src/pages/teacher/MyExams.tsx`:**
  - [ ] Exams list (draft, pending, published)
  - [ ] Filter and search
  - [ ] Actions (edit, duplicate, delete)

- [ ] **Create `src/pages/teacher/ExamWizard.tsx`:**
  - [ ] 5-step wizard component
  - [ ] Step 1: Basic Info
  - [ ] Step 2: Question Selection
  - [ ] Step 3: Settings
  - [ ] Step 4: Schedule
  - [ ] Step 5: Review & Submit

### Exam Wizard Components
- [ ] **Create `src/components/exam-wizard/` components:**
  - [ ] `BasicInfoStep.tsx`
  - [ ] `QuestionSelectionStep.tsx`
  - [ ] `SettingsStep.tsx`
  - [ ] `ScheduleStep.tsx`
  - [ ] `ReviewStep.tsx`
  - [ ] `WizardNavigation.tsx`

### Question Bank
- [ ] **Create question bank pages:**
  - [ ] Question list
  - [ ] Question form (TipTap editor)
  - [ ] CSV import
  - [ ] Passage management

---

## 👁️ PHASE 9 — Invigilator Monitoring

### Invigilator Dashboard
- [ ] **Create `src/pages/invigilator/InvigilatorDashboard.tsx`:**
  - [ ] Active exam rooms
  - [ ] Student count
  - [ ] Alert summary
  - [ ] Quick access to monitoring

### Exam Room Monitor
- [ ] **Create exam room monitoring page:**
  - [ ] Student status cards grid
  - [ ] Real-time updates via WebSocket
  - [ ] Alert feed panel
  - [ ] Retake request modal
  - [ ] End exam button with confirmation

### Monitoring Components
- [ ] **Create `src/components/monitoring/` components:**
  - [ ] `StudentStatusCard.tsx` - with flashing border on alerts
  - [ ] `AlertFeed.tsx` - auto-scrolling panel
  - [ ] `RetakeRequestModal.tsx` - with eligibility gate

### Monitoring Hooks
- [ ] **Create `src/hooks/useMonitoringSocket.ts`:**
  - [ ] WebSocket connection
  - [ ] Event listeners
  - [ ] Real-time updates

### Navigation Guard
- [ ] **Add `useBlocker` for navigation prevention:**
  - [ ] Warn if active sessions remain
  - [ ] Confirmation dialog

---

## 📊 PHASE 10 — Results, Notifications & Polish

### Results Management
- [ ] **Create result release components:**
  - [ ] Individual release toggle
  - [ ] Batch release
  - [ ] Result preview

### Retake Display
- [ ] **Add retake supersession logic:**
  - [ ] SUPERSEDED badge
  - [ ] ACTIVE RESULT badge
  - [ ] Result history

### Notifications
- [ ] **Create `src/components/layout/NotificationBell.tsx`:**
  - [ ] Badge with count
  - [ ] Dropdown panel
  - [ ] Mark as read
  - [ ] Polling + WebSocket

### Critical Alerts
- [ ] **Create critical alert dialogs:**
  - [ ] Billing alerts
  - [ ] Suspension warnings
  - [ ] System announcements

### Accessibility Audit
- [ ] **WCAG compliance:**
  - [ ] Add aria labels to all interactive elements
  - [ ] Implement focus traps in modals
  - [ ] Check color contrast ratios
  - [ ] Add keyboard navigation
  - [ ] Screen reader testing

### Responsive Design
- [ ] **Mobile optimization:**
  - [ ] Sidebar drawer on mobile
  - [ ] Exam engine single-column layout
  - [ ] Touch-friendly buttons
  - [ ] Responsive tables

### Error Handling
- [ ] **Global error handling:**
  - [ ] Error boundary component
  - [ ] API error interceptor
  - [ ] User-friendly error messages
  - [ ] Retry mechanisms

### Performance Optimization
- [ ] **Optimize performance:**
  - [ ] Code splitting
  - [ ] Lazy loading routes
  - [ ] Image optimization
  - [ ] Bundle size analysis

---

## 🔧 Additional Tasks

### Testing
- [ ] **Set up testing infrastructure:**
  - [ ] Install Vitest
  - [ ] Configure test environment
  - [ ] Write unit tests for utilities
  - [ ] Write integration tests for key flows
  - [ ] E2E tests for exam engine

### Documentation
- [ ] **Create documentation:**
  - [ ] Component documentation
  - [ ] API integration guide
  - [ ] Deployment guide
  - [ ] User manual

### Environment Setup
- [ ] **Create environment files:**
  - [ ] `.env.development`
  - [ ] `.env.production`
  - [ ] `.env.example`

### Build & Deploy
- [ ] **Production build:**
  - [ ] Optimize build configuration
  - [ ] Set up CI/CD pipeline
  - [ ] Configure deployment

---

## 📊 Priority Matrix

### 🔴 CRITICAL (Start Immediately)
1. Install all missing dependencies
2. Complete Phase 5 (Student Panel) - Exam Engine
3. Implement all exam hooks (timer, autosave, anti-cheat)
4. Create PassageOverlay component
5. Complete AnswerStatusPanel

### 🟡 HIGH PRIORITY (Week 1-2)
1. Complete Demo Mode (Phase 6)
2. Enhance auth system with school theming
3. Complete layout components (Sidebar, Topbar)
4. Implement Teacher Exam Wizard
5. Create question bank management

### 🟢 MEDIUM PRIORITY (Week 2-3)
1. Super Admin module (Phase 7)
2. School Admin module (Phase 8)
3. Invigilator monitoring (Phase 9)
4. Results management (Phase 10)

### 🔵 LOW PRIORITY (Week 3-4)
1. Notifications system
2. Accessibility audit
3. Performance optimization
4. Testing
5. Documentation

---

## 📈 Progress Tracking

**Total Tasks:** ~200+
**Completed:** ~15%
**In Progress:** Phase 0, 1, 2, 3, 4 (Partial)
**Not Started:** Phase 5-10

**Estimated Timeline:** 21-29 days (as per roadmap)

---

*Last Updated: [Current Date]*
*Next Review: After completing Phase 5*
