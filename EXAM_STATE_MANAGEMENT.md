# Exam State Management System

## 📋 Overview

The CBT platform now includes a comprehensive exam state management system that handles all possible exam states and transitions. This ensures proper flow control and prevents invalid state transitions.

---

## 🔄 Exam States

### 1. **NOT_STARTED** 
**Description:** Exam has not been started yet by the student.

**UI Display:**
- Shows "Start Exam" button
- Displays exam title and duration
- Shows instructions preview
- Clean, centered layout

**Allowed Actions:**
- ✅ Start exam → `IN_PROGRESS`

**Restrictions:**
- ❌ Cannot pause
- ❌ Cannot submit
- ❌ Cannot resume

---

### 2. **IN_PROGRESS**
**Description:** Exam is currently active and student is answering questions.

**UI Display:**
- Full exam interface with questions
- Live timer countdown
- Question navigation
- Answer selection
- Flag questions
- Calculator and dark mode
- Pause and End Exam buttons

**Allowed Actions:**
- ✅ Pause exam → `PAUSED`
- ✅ Submit exam → `SUBMITTED`
- ✅ Auto-submit on timeout → `EXPIRED`
- ✅ Force submit by invigilator → `FORCE_SUBMITTED`

**Features:**
- Real-time timer
- Auto-save every 30 seconds
- Tab switch detection (3-strike system)
- Fullscreen monitoring
- Online/offline detection
- Violation tracking

**Restrictions:**
- ❌ Cannot start again
- ❌ Cannot resume (already in progress)

---

### 3. **PAUSED**
**Description:** Exam has been paused by the student or invigilator.

**UI Display:**
- Shows "Resume Exam" button
- Displays time remaining
- Shows pause message
- Clean, centered layout with orange theme

**Allowed Actions:**
- ✅ Resume exam → `IN_PROGRESS`
- ✅ Force submit by invigilator → `FORCE_SUBMITTED`
- ✅ Auto-expire if time runs out → `EXPIRED`

**Restrictions:**
- ❌ Cannot start
- ❌ Cannot pause again
- ❌ Cannot submit directly (must resume first)

---

### 4. **SUBMITTED**
**Description:** Exam has been successfully submitted by the student.

**UI Display:**
- Shows success message with checkmark
- Displays "Successfully Submitted" status
- Shows "Back to Dashboard" button
- Clean, centered layout with green theme

**Allowed Actions:**
- ✅ Navigate to dashboard
- ✅ View results

**Restrictions:**
- ❌ Cannot start
- ❌ Cannot resume
- ❌ Cannot pause
- ❌ Cannot submit again
- ❌ No further modifications allowed

---

### 5. **EXPIRED**
**Description:** Exam time has run out and was automatically submitted.

**UI Display:**
- Shows expiration message with clock icon
- Displays "Time Expired - Auto Submitted" status
- Shows "Back to Dashboard" button
- Clean, centered layout with red theme

**Allowed Actions:**
- ✅ Navigate to dashboard
- ✅ View results

**Restrictions:**
- ❌ Cannot start
- ❌ Cannot resume
- ❌ Cannot pause
- ❌ Cannot submit again
- ❌ No further modifications allowed

---

### 6. **FORCE_SUBMITTED**
**Description:** Exam was forcefully submitted by invigilator or due to violations.

**UI Display:**
- Shows force submission message
- Displays "Force Submitted" status
- Shows reason (if available)
- Shows "Back to Dashboard" button
- Clean, centered layout with green theme

**Allowed Actions:**
- ✅ Navigate to dashboard
- ✅ View results

**Restrictions:**
- ❌ Cannot start
- ❌ Cannot resume
- ❌ Cannot pause
- ❌ Cannot submit again
- ❌ No further modifications allowed

---

## 🔀 State Transition Diagram

```
NOT_STARTED
    ↓ (Start Exam)
IN_PROGRESS ←→ PAUSED
    ↓           ↓
    ↓ (Submit)  ↓ (Force Submit)
    ↓           ↓
SUBMITTED   FORCE_SUBMITTED
    ↓           ↓
    ↓ (Timeout) ↓
    ↓           ↓
  EXPIRED ←-----┘
```

---

## 📊 State Transition Matrix

| From State      | To State        | Action              | Allowed |
|-----------------|-----------------|---------------------|---------|
| NOT_STARTED     | IN_PROGRESS     | Start Exam          | ✅      |
| NOT_STARTED     | PAUSED          | -                   | ❌      |
| NOT_STARTED     | SUBMITTED       | -                   | ❌      |
| NOT_STARTED     | EXPIRED         | -                   | ❌      |
| NOT_STARTED     | FORCE_SUBMITTED | -                   | ❌      |
| IN_PROGRESS     | NOT_STARTED     | -                   | ❌      |
| IN_PROGRESS     | PAUSED          | Pause Exam          | ✅      |
| IN_PROGRESS     | SUBMITTED       | Submit Exam         | ✅      |
| IN_PROGRESS     | EXPIRED         | Time Runs Out       | ✅      |
| IN_PROGRESS     | FORCE_SUBMITTED | Invigilator/Violations | ✅   |
| PAUSED          | NOT_STARTED     | -                   | ❌      |
| PAUSED          | IN_PROGRESS     | Resume Exam         | ✅      |
| PAUSED          | SUBMITTED       | -                   | ❌      |
| PAUSED          | EXPIRED         | Time Runs Out       | ✅      |
| PAUSED          | FORCE_SUBMITTED | Invigilator         | ✅      |
| SUBMITTED       | ANY             | -                   | ❌      |
| EXPIRED         | ANY             | -                   | ❌      |
| FORCE_SUBMITTED | ANY             | -                   | ❌      |

---

## 🛠️ Implementation

### Files Created:

1. **`src/types/exam.types.ts`**
   - TypeScript types for exam states
   - ExamSessionStatus enum
   - ExamState interface
   - ExamSession interface

2. **`src/hooks/exam/useExamState.ts`**
   - Custom hook for exam state management
   - State calculation logic
   - Transition validation
   - State change detection

3. **`src/components/exam/ExamStateHandler.tsx`**
   - UI component for non-in-progress states
   - Renders appropriate UI for each state
   - Handles state-specific actions

4. **`src/pages/student/TakeExamWithStates.tsx`**
   - Complete exam interface with state management
   - Integrates all state handling
   - Implements 3-strike violation system
   - Auto-save and timer functionality

---

## 🎯 Key Features

### 1. **State Validation**
- Validates all state transitions before allowing them
- Prevents invalid state changes
- Returns clear error messages for invalid transitions

### 2. **Auto-Save**
- Saves answers every 30 seconds when exam is in progress
- Pauses auto-save when exam is paused
- Shows save status indicator

### 3. **Timer Management**
- Counts down only when exam is in progress
- Pauses timer when exam is paused
- Auto-submits when time expires
- Shows warning when time is low (< 5 minutes)

### 4. **Violation Tracking**
- Tracks tab switches
- Monitors fullscreen exits
- Implements 3-strike system
- Force submits after 3 violations

### 5. **Connection Monitoring**
- Detects online/offline status
- Shows warning when offline
- Saves answers locally when offline
- Syncs when back online

---

## 📝 Usage Example

```typescript
import { useExamState } from '@/hooks/exam/useExamState';
import { ExamStateHandler } from '@/components/exam/ExamStateHandler';

function ExamPage() {
  const [session, setSession] = useState<ExamSession>({
    status: 'not_started',
    // ... other fields
  });

  const { examState, canTransition } = useExamState(session);

  const handleStartExam = () => {
    const transition = canTransition(session.status, 'in_progress');
    if (!transition.allowed) {
      alert(transition.reason);
      return;
    }
    
    setSession({
      ...session,
      status: 'in_progress',
      startedAt: new Date().toISOString(),
    });
  };

  // Show state handler for non-in-progress states
  if (session.status !== 'in_progress') {
    return (
      <ExamStateHandler
        status={session.status}
        onStart={handleStartExam}
        onResume={handleResumeExam}
        examTitle="Mathematics Exam"
        timeRemaining={session.timeRemaining}
      />
    );
  }

  // Show exam interface when in progress
  return <ExamInterface />;
}
```

---

## 🔒 Security Features

### 1. **Anti-Cheat Measures**
- Fullscreen requirement
- Tab switch detection
- Copy/paste prevention
- Right-click disable
- Browser console detection

### 2. **Violation System**
- 3-strike policy
- Progressive warnings
- Automatic force submission
- Activity logging

### 3. **Time Management**
- Server-side time validation
- Client-side countdown
- Auto-submission on expiry
- Time tampering prevention

---

## 📊 Database Schema

### ExamSession Table:
```json
{
  "id": 1,
  "examId": 1,
  "studentId": 1,
  "status": "in_progress",
  "startedAt": "2026-04-28T10:00:00Z",
  "pausedAt": null,
  "resumedAt": null,
  "submittedAt": null,
  "expiresAt": "2026-04-28T11:30:00Z",
  "timeRemaining": 3600,
  "progress": 45,
  "answeredQuestions": 23,
  "totalQuestions": 50,
  "flaggedQuestions": [5, 12, 23],
  "suspiciousActivities": [],
  "tabSwitches": 0,
  "violations": 0,
  "connectionStatus": "online",
  "lastActivity": "2026-04-28T10:28:00Z"
}
```

---

## 🎨 UI States

### NOT_STARTED
- **Color Theme:** Blue/Primary
- **Icon:** 📝
- **Button:** "Start Exam" (Primary color)

### IN_PROGRESS
- **Color Theme:** Default
- **Features:** Full exam interface
- **Buttons:** Pause, End Exam, Submit

### PAUSED
- **Color Theme:** Orange/Warning
- **Icon:** ⏸️
- **Button:** "Resume Exam" (Orange)

### SUBMITTED
- **Color Theme:** Green/Success
- **Icon:** ✅
- **Button:** "Back to Dashboard" (Primary)

### EXPIRED
- **Color Theme:** Red/Error
- **Icon:** ⏰
- **Button:** "Back to Dashboard" (Primary)

### FORCE_SUBMITTED
- **Color Theme:** Green/Success
- **Icon:** ✅
- **Button:** "Back to Dashboard" (Primary)

---

## ✅ Testing Checklist

- [x] Start exam from NOT_STARTED
- [x] Pause exam from IN_PROGRESS
- [x] Resume exam from PAUSED
- [x] Submit exam from IN_PROGRESS
- [x] Auto-submit on timeout (EXPIRED)
- [x] Force submit after 3 violations
- [x] Prevent invalid state transitions
- [x] Timer counts down correctly
- [x] Auto-save works every 30 seconds
- [x] Tab switch detection
- [x] Fullscreen monitoring
- [x] Online/offline detection
- [x] Violation tracking
- [x] UI displays correct state

---

## 🚀 Next Steps

### Production Enhancements:
1. **Server-Side Validation**
   - Validate all state transitions on server
   - Prevent client-side manipulation
   - Sync state with database

2. **Real-Time Updates**
   - WebSocket integration
   - Live state synchronization
   - Invigilator monitoring

3. **Advanced Features**
   - Resume from any device
   - Multi-device detection
   - Session recovery
   - Offline mode with sync

4. **Analytics**
   - Track state transition times
   - Monitor violation patterns
   - Analyze completion rates
   - Generate reports

---

**Status:** ✅ COMPLETE
**Version:** 1.0.0
**Last Updated:** April 28, 2026
