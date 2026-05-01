import { lazy } from "react";

const SuperDashboard = lazy(() => import("@/pages/super-admin/SuperDashboard"));
const SchoolManagement = lazy(
  () => import("@/pages/super-admin/SchoolManagement"),
);
const SchoolCreate = lazy(() => import("@/pages/super-admin/SchoolCreate"));
const AllUsers = lazy(() => import("@/pages/super-admin/AllUsers"));
const Students = lazy(() => import("@/pages/super-admin/Students"));
const Teachers = lazy(() => import("@/pages/super-admin/Teachers"));
const Invigilators = lazy(() => import("@/pages/super-admin/Invigilators"));
const Admins = lazy(() => import("@/pages/super-admin/Admins"));
const AllExams = lazy(() => import("@/pages/super-admin/AllExams"));
const ActiveExams = lazy(() => import("@/pages/super-admin/ActiveExams"));
const ScheduledExams = lazy(() => import("@/pages/super-admin/ScheduledExams"));
const ArchivedExams = lazy(() => import("@/pages/super-admin/ArchivedExams"));
const LiveMonitoring = lazy(() => import("@/pages/super-admin/LiveMonitoring"));
const SuspiciousActivities = lazy(
  () => import("@/pages/super-admin/SuspiciousActivities"),
);
const TabSwitches = lazy(() => import("@/pages/super-admin/TabSwitches"));
const ExamLogs = lazy(() => import("@/pages/super-admin/ExamLogs"));
const AllQuestions = lazy(() => import("@/pages/super-admin/AllQuestions"));
const QuestionCategories = lazy(
  () => import("@/pages/super-admin/QuestionCategories"),
);
const AIQuestionGenerator = lazy(
  () => import("@/pages/super-admin/AIQuestionGenerator"),
);
const ImportExportQuestions = lazy(
  () => import("@/pages/super-admin/ImportExportQuestions"),
);
const PlatformAnalytics = lazy(
  () => import("@/pages/super-admin/PlatformAnalytics"),
);
const GlobalResults = lazy(() => import("@/pages/super-admin/GlobalResults"));
const Leaderboards = lazy(() => import("@/pages/super-admin/Leaderboards"));
const Reports = lazy(() => import("@/pages/super-admin/Reports"));
const BillingManagement = lazy(
  () => import("@/pages/super-admin/BillingManagement"),
);
const PaymentHistory = lazy(() => import("@/pages/super-admin/PaymentHistory"));
const Revenue = lazy(() => import("@/pages/super-admin/Revenue"));
const Invoices = lazy(() => import("@/pages/super-admin/Invoices"));
const SystemConfiguration = lazy(
  () => import("@/pages/super-admin/SystemConfiguration"),
);
const SuperAuditLogs = lazy(() => import("@/pages/super-admin/SuperAuditLogs"));
const BackupRestore = lazy(() => import("@/pages/super-admin/BackupRestore"));
const Security = lazy(() => import("@/pages/super-admin/Security"));
const Notifications = lazy(() => import("@/pages/super-admin/Notifications"));

export const superAdminRoutes = [
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
  { path: "questions/categories", element: <QuestionCategories /> },
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
];
