import type { ReactNode } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";

export function PrivateRoute({
  children,
  role,
}: {
  children: ReactNode;
  role?: string;
}) {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);

  // Check if user is authenticated
  if (!accessToken || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role
  if (role && user.role !== role) {
    // Redirect to their own dashboard
    const rolePath =
      user.role === "super_admin"
        ? "super-admin"
        : user.role === "school_admin"
          ? "admin"
          : user.role;
    return <Navigate to={`/${rolePath}/dashboard`} replace />;
  }

  return <>{children}</>;
}

export function PasswordChangeGate({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // If user must change password and is not a student, redirect to change password page
    if (user?.must_change_password && user.role !== "student") {
      navigate("/change-password", { replace: true });
    }
  }, [user, navigate]);

  return <>{children}</>;
}
