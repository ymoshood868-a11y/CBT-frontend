import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Receipt } from "lucide-react";

export default function PaymentHistory() {
  return (
    <PlaceholderPage
      title="Payment History"
      description="View all payment transactions and history."
      icon={<Receipt size={48} style={{ color: "hsl(var(--primary))" }} />}
    />
  );
}
