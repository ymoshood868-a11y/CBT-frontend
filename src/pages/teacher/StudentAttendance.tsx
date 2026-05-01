import { PlaceholderPage } from "@/components/PlaceholderPage";
import { CheckCircle } from "lucide-react";

export default function StudentAttendance() {
  return (
    <PlaceholderPage
      title="Student Attendance"
      description="Track student attendance records."
      icon={<CheckCircle size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
