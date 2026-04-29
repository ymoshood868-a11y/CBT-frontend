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

// Super Admin Pages
import SuperDashboard from "@/pages/super-admin/SuperDashboard";
import SchoolManagement from "@/pages/super-admin/SchoolManagement";
import SystemConfiguration from "@/pages/super-admin/SystemConfiguration";
import BillingManagement from "@/pages/super-admin/BillingManagement";
import PlatformAnalytics from "@/pages/super-admin/PlatformAnalytics";
import SuperAuditLogs from "@/pages/super-admin/SuperAuditLogs";
import BackupRestore from "@/pages/super-admin/BackupRestore";

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
      { path: "schools", element: <SchoolManagement /> },
      { path: "configuration", element: <SystemConfiguration /> },
      { path: "billing", element: <BillingManagement /> },
      { path: "analytics", element: <PlatformAnalytics /> },
      { path: "audit-logs", element: <SuperAuditLogs /> },
      { path: "backup", element: <BackupRestore /> },
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
      { path: "exams", element: <TeacherExams /> },
      { path: "exams/create", element: <CreateExam /> },
      { path: "results", element: <TeacherResults /> },
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
