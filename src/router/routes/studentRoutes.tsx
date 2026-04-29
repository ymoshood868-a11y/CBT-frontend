import { StudentDashboard } from "@/pages/student/StudentDashboard";
import { StudentResults } from "@/pages/student/studentResults";
import { StudentExams } from "@/pages/student/StudentExams";
import { StudentProfile } from "@/pages/student/StudentProfile";

export const studentRoutes = [
  {
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    path: "exams",
    element: <StudentExams />,
  },
  {
    path: "results",
    element: <StudentResults />,
  },
  {
    path: "profile",
    element: <StudentProfile />,
  },
];
