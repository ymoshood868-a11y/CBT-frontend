import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useUiStore } from "@/stores/ui.store";
import { getNavItems } from "@/config/nav.config";
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";
import type { NavItem } from "@/config/nav.config";

export function AppSidebarNew() {
  const user = useAuthStore((s) => s.user);
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const navigate = useNavigate();
  const role = (user?.role ?? "student") as string;
  const navItems = getNavItems(role);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const roleLabel: Record<string, string> = {
    super_admin: "Super Admin",
    school_admin: "School Admin",
    teacher: "Teacher",
    invigilator: "Invigilator",
    student: "Student",
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const renderNavItem = (item: NavItem, isChild = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openDropdowns.includes(item.label);
    const Icon = item.icon;

    if (hasChildren) {
      return (
        <div key={item.label} style={{ marginBottom: 4 }}>
          <button
            onClick={() => toggleDropdown(item.label)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: isChild ? "8px 12px 8px 36px" : "10px 12px",
              borderRadius: 10,
              border: "none",
              background: isOpen ? "hsl(var(--primary) / 0.05)" : "transparent",
              color: isOpen
                ? "hsl(var(--primary))"
                : "hsl(var(--sidebar-foreground))",
              fontWeight: isOpen ? 600 : 500,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              if (!isOpen) {
                e.currentTarget.style.background = "hsl(var(--sidebar-accent))";
              }
            }}
            onMouseLeave={(e) => {
              if (!isOpen) {
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Icon size={16} style={{ flexShrink: 0, opacity: 0.9 }} />
              <span>{item.label}</span>
              {item.badge && (
                <span
                  style={{
                    background: "hsl(var(--destructive))",
                    color: "white",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 6px",
                    borderRadius: 10,
                    minWidth: 18,
                    textAlign: "center",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>
            {isOpen ? (
              <ChevronDown size={14} style={{ flexShrink: 0 }} />
            ) : (
              <ChevronRight size={14} style={{ flexShrink: 0 }} />
            )}
          </button>

          {isOpen && (
            <div style={{ marginTop: 4 }}>
              {item.children?.map((child) => renderNavItem(child, true))}
            </div>
          )}
        </div>
      );
    }

    // Regular nav item with link
    return (
      <NavLink
        key={item.path}
        to={item.path!}
        style={({ isActive }) => ({
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: isChild ? "8px 12px 8px 36px" : "10px 12px",
          borderRadius: 10,
          marginBottom: 4,
          textDecoration: "none",
          background: isActive ? "hsl(var(--primary) / 0.1)" : "transparent",
          color: isActive
            ? "hsl(var(--primary))"
            : "hsl(var(--sidebar-foreground))",
          fontWeight: isActive ? 600 : 500,
          fontSize: 14,
          borderLeft: isActive
            ? "3px solid hsl(var(--primary))"
            : "3px solid transparent",
          transition: "all 0.15s",
        })}
        onMouseEnter={(e) => {
          if (!e.currentTarget.classList.contains("active")) {
            e.currentTarget.style.background = "hsl(var(--sidebar-accent))";
          }
        }}
        onMouseLeave={(e) => {
          if (!e.currentTarget.classList.contains("active")) {
            e.currentTarget.style.background = "transparent";
          }
        }}
      >
        <Icon size={16} style={{ flexShrink: 0, opacity: 0.9 }} />
        <span style={{ flex: 1 }}>{item.label}</span>
        {item.badge && (
          <span
            style={{
              background: "hsl(var(--destructive))",
              color: "white",
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 6px",
              borderRadius: 10,
              minWidth: 18,
              textAlign: "center",
            }}
          >
            {item.badge}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 20,
            background: "rgba(0,0,0,0.5)",
          }}
          className="md:hidden"
          onClick={() => useUiStore.getState().setSidebarOpen(false)}
        />
      )}

      <aside
        style={{
          width: 260,
          minWidth: 260,
          height: "100vh",
          background: "hsl(var(--sidebar-background))",
          borderRight: "1px solid hsl(var(--sidebar-border))",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 30,
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "24px 20px",
            borderBottom: "1px solid hsl(var(--sidebar-border))",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "hsl(var(--primary))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 2px 8px hsl(var(--primary) / 0.2)",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="hsl(var(--primary-foreground))"
                strokeWidth="2.5"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  color: "hsl(var(--sidebar-foreground))",
                  fontWeight: 800,
                  fontSize: 16,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                CBT Platform
              </div>
              <div
                style={{
                  color: "hsl(var(--muted-foreground))",
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {roleLabel[role] || "User"}
              </div>
            </div>
          </div>
        </div>

        {/* User info */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid hsl(var(--sidebar-border))",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "hsl(var(--primary) / 0.1)",
                border: "2px solid hsl(var(--primary) / 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "hsl(var(--primary))",
                fontWeight: 700,
                fontSize: 15,
                flexShrink: 0,
              }}
            >
              {(user?.name ?? user?.email ?? "U")[0].toUpperCase()}
            </div>
            <div style={{ overflow: "hidden", flex: 1 }}>
              <div
                style={{
                  color: "hsl(var(--sidebar-foreground))",
                  fontSize: 14,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.name || "User"}
              </div>
              <div
                style={{
                  color: "hsl(var(--muted-foreground))",
                  fontSize: 12,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.email ?? ""}
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          <div
            style={{
              color: "hsl(var(--muted-foreground))",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
              padding: "0 8px",
              marginBottom: 8,
            }}
          >
            Navigation
          </div>
          {navItems.map((item) => renderNavItem(item))}
        </nav>

        {/* Logout */}
        <div
          style={{
            padding: "12px",
            borderTop: "1px solid hsl(var(--sidebar-border))",
          }}
        >
          <button
            onClick={() => {
              useAuthStore.getState().clearAuth();
              navigate("/login");
            }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 10,
              border: "none",
              background: "transparent",
              color: "hsl(var(--destructive))",
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "hsl(var(--destructive) / 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
