import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  children,
  role,
}: {
  children: ReactNode;
  role?: string;
}) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
