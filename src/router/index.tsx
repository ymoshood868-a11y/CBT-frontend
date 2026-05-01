import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ExamLayout } from "@/layouts/ExamLayout";
import { PrivateRoute } from "@/router/guards";

// Demo & Auth Pages
import { DemoPage } from "@/pages/demo/DemoPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { ChangePasswordPage } from "@/pages/auth/ChangePasswordPage";

// Student Pages
import { StudentDashboard } from "@/pages/student/StudentDashboard";
import { StudentExams } from "@/pages/student/StudentExams";
import { StudentResults } from "@/pages/student/studentResults";
import { StudentProfile } from "@/pages/student/StudentProfile";
import { ExamInstructions } from "@/pages/student/ExamInstructions";
import { TakeExam } from "@/pages/student/TakeExam";
import { ExamResult } from "@/pages/student/ExamResult";

// Teacher Pages
import TeacherDashboard from "@/pages/teacher/TeacherDashboard";
import QuestionBank from "@/pages/teacher/QuestionBank";
import TeacherExams from "@/pages/teacher/TeacherExams";
import TeacherResults from "@/pages/teacher/TeacherResults";
import CreateExam from "@/pages/teacher/CreateExam";
import AddQuestion from "@/pages/teacher/AddQuestion";
import TeacherQuestionCategories from "@/pages/teacher/QuestionCategories";
import TeacherImportQuestions from "@/pages/teacher/ImportQuestions";
import DraftExams from "@/pages/teacher/DraftExams";
import TeacherActiveExams from "@/pages/teacher/ActiveExams";
import GradeExams from "@/pages/teacher/GradeExams";
import ResultsAnalytics from "@/pages/teacher/ResultsAnalytics";
import MyStudents from "@/pages/teacher/MyStudents";
import StudentPerformance from "@/pages/teacher/StudentPerformance";
import StudentAttendance from "@/pages/teacher/StudentAttendance";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminExams from "@/pages/admin/AdminExams";
import AdminTeachers from "@/pages/admin/AdminTeachers";
import UserManagement from "@/pages/admin/UserManagement";
import AnalyticsDashboard from "@/pages/admin/AnalyticsDashboard";
import SystemLogs from "@/pages/admin/SystemLogs";

// Invigilator Pages
import { InvigilatorDashboard } from "@/pages/invigilator/InvigilatorDashboard";
import MonitorExam from "@/pages/invigilator/MonitorExam";
import InvigilatorActiveExams from "@/pages/invigilator/ActiveExams";
import InvigilatorSuspiciousActivities from "@/pages/invigilator/SuspiciousActivities";
import InvigilatorReports from "@/pages/invigilator/Reports";
import IncidentReports from "@/pages/invigilator/IncidentReports";

// Super Admin Pages
import SuperDashboard from "@/pages/super-admin/SuperDashboard";
import SchoolManagement from "@/pages/super-admin/SchoolManagement";
import SchoolCreate from "@/pages/super-admin/SchoolCreate";
import SystemConfiguration from "@/pages/super-admin/SystemConfiguration";
import BillingManagement from "@/pages/super-admin/BillingManagement";
import PlatformAnalytics from "@/pages/super-admin/PlatformAnalytics";
import SuperAuditLogs from "@/pages/super-admin/SuperAuditLogs";
import BackupRestore from "@/pages/super-admin/BackupRestore";
import AllUsers from "@/pages/super-admin/AllUsers";
import Students from "@/pages/super-admin/Students";
import Teachers from "@/pages/super-admin/Teachers";
import Invigilators from "@/pages/super-admin/Invigilators";
import Admins from "@/pages/super-admin/Admins";
import AllExams from "@/pages/super-admin/AllExams";
import ActiveExams from "@/pages/super-admin/ActiveExams";
import ScheduledExams from "@/pages/super-admin/ScheduledExams";
import ArchivedExams from "@/pages/super-admin/ArchivedExams";
import LiveMonitoring from "@/pages/super-admin/LiveMonitoring";
import SuspiciousActivities from "@/pages/super-admin/SuspiciousActivities";
import TabSwitches from "@/pages/super-admin/TabSwitches";
import ExamLogs from "@/pages/super-admin/ExamLogs";
import AllQuestions from "@/pages/super-admin/AllQuestions";
import SuperAdminQuestionCategories from "@/pages/super-admin/QuestionCategories";
import AIQuestionGenerator from "@/pages/super-admin/AIQuestionGenerator";
import ImportExportQuestions from "@/pages/super-admin/ImportExportQuestions";
import GlobalResults from "@/pages/super-admin/GlobalResults";
import Leaderboards from "@/pages/super-admin/Leaderboards";
import Reports from "@/pages/super-admin/Reports";
import PaymentHistory from "@/pages/super-admin/PaymentHistory";
import Revenue from "@/pages/super-admin/Revenue";
import Invoices from "@/pages/super-admin/Invoices";
import Security from "@/pages/super-admin/Security";
import Notifications from "@/pages/super-admin/Notifications";

// Exam Engine
import { ExamEngine } from "@/features/exams/ExamEngine";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/demo", element: <DemoPage /> },

  // Auth Routes
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      {
        path: "/change-password",
        element: (
          <PrivateRoute>
            <ChangePasswordPage />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Super Admin Routes
  {
    path: "/super-admin",
    element: (
      <PrivateRoute role="super_admin">
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "dashboard", element: <SuperDashboard /> },

      // Organizations
      { path: "schools", element: <SchoolManagement /> },
      { path: "schools/create", element: <SchoolCreate /> },

      // Users
      { path: "users", element: <AllUsers /> },
      { path: "users/students", element: <Students /> },
      { path: "users/teachers", element: <Teachers /> },
      { path: "users/invigilators", element: <Invigilators /> },
      { path: "users/admins", element: <Admins /> },

      // Exams
      { path: "exams", element: <AllExams /> },
      { path: "exams/active", element: <ActiveExams /> },
      { path: "exams/scheduled", element: <ScheduledExams /> },
      { path: "exams/archived", element: <ArchivedExams /> },

      // Monitoring
      { path: "monitoring/live", element: <LiveMonitoring /> },
      { path: "monitoring/suspicious", element: <SuspiciousActivities /> },
      { path: "monitoring/tab-switches", element: <TabSwitches /> },
      { path: "monitoring/logs", element: <ExamLogs /> },

      // Questions
      { path: "questions", element: <AllQuestions /> },
      {
        path: "questions/categories",
        element: <SuperAdminQuestionCategories />,
      },
      { path: "questions/ai-generator", element: <AIQuestionGenerator /> },
      { path: "questions/import-export", element: <ImportExportQuestions /> },

      // Results & Analytics
      { path: "analytics", element: <PlatformAnalytics /> },
      { path: "results", element: <GlobalResults /> },
      { path: "results/leaderboards", element: <Leaderboards /> },
      { path: "results/reports", element: <Reports /> },

      // Billing
      { path: "billing", element: <BillingManagement /> },
      { path: "billing/payments", element: <PaymentHistory /> },
      { path: "billing/revenue", element: <Revenue /> },
      { path: "billing/invoices", element: <Invoices /> },

      // System
      { path: "configuration", element: <SystemConfiguration /> },
      { path: "audit-logs", element: <SuperAuditLogs /> },
      { path: "backup", element: <BackupRestore /> },
      { path: "system/security", element: <Security /> },
      { path: "system/notifications", element: <Notifications /> },

      {
        index: true,
        element: <Navigate to="/super-admin/dashboard" replace />,
      },
    ],
  },

  // School Admin Routes
  {
    path: "/admin",
    element: (
      <PrivateRoute role="school_admin">
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <UserManagement /> },
      { path: "exams", element: <AdminExams /> },
      { path: "teachers", element: <AdminTeachers /> },
      { path: "students", element: <AdminTeachers /> },
      { path: "results", element: <AdminExams /> },
      { path: "analytics", element: <AnalyticsDashboard /> },
      { path: "logs", element: <SystemLogs /> },
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
    ],
  },

  // Teacher Routes
  {
    path: "/teacher",
    element: (
      <PrivateRoute role="teacher">
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "dashboard", element: <TeacherDashboard /> },
      { path: "questions", element: <QuestionBank /> },
      { path: "questions/add", element: <AddQuestion /> },
      { path: "questions/categories", element: <TeacherQuestionCategories /> },
      { path: "questions/import", element: <TeacherImportQuestions /> },
      { path: "exams", element: <TeacherExams /> },
      { path: "exams/create", element: <CreateExam /> },
      { path: "exams/drafts", element: <DraftExams /> },
      { path: "exams/active", element: <TeacherActiveExams /> },
      { path: "results", element: <TeacherResults /> },
      { path: "results/grade", element: <GradeExams /> },
      { path: "results/analytics", element: <ResultsAnalytics /> },
      { path: "students", element: <MyStudents /> },
      { path: "students/performance", element: <StudentPerformance /> },
      { path: "students/attendance", element: <StudentAttendance /> },
      { index: true, element: <Navigate to="/teacher/dashboard" replace /> },
    ],
  },

  // Invigilator Routes
  {
    path: "/invigilator",
    element: (
      <PrivateRoute role="invigilator">
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "dashboard", element: <InvigilatorDashboard /> },
      { path: "monitor", element: <InvigilatorDashboard /> },
      { path: "monitor/:examId", element: <MonitorExam /> },
      { path: "exams/active", element: <InvigilatorActiveExams /> },
      { path: "suspicious", element: <InvigilatorSuspiciousActivities /> },
      { path: "reports", element: <InvigilatorReports /> },
      { path: "reports/incidents", element: <IncidentReports /> },
      { path: "retakes", element: <InvigilatorDashboard /> },
      {
        index: true,
        element: <Navigate to="/invigilator/dashboard" replace />,
      },
    ],
  },

  // Student Routes
  {
    path: "/student",
    element: (
      <PrivateRoute role="student">
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "dashboard", element: <StudentDashboard /> },
      { path: "exams", element: <StudentExams /> },
      { path: "exams/:examId/instructions", element: <ExamInstructions /> },
      { path: "results", element: <StudentResults /> },
      { path: "results/:examId", element: <ExamResult /> },
      { path: "profile", element: <StudentProfile /> },
      { index: true, element: <Navigate to="/student/dashboard" replace /> },
    ],
  },

  // Exam Taking Routes (Full Screen - No Dashboard Layout)
  {
    path: "/student/exam/:examId/take",
    element: (
      <PrivateRoute role="student">
        <TakeExam />
      </PrivateRoute>
    ),
  },
  {
    path: "/student/exam/:examId/result",
    element: (
      <PrivateRoute role="student">
        <ExamResult />
      </PrivateRoute>
    ),
  },

  // Exam Engine Routes
  {
    path: "/exam/:sessionId",
    element: (
      <PrivateRoute>
        <ExamLayout />
      </PrivateRoute>
    ),
    children: [{ index: true, element: <ExamEngine /> }],
  },
]);
