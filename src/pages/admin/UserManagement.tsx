import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "teacher" | "invigilator" | "school_admin";
  admissionNo?: string;
  class?: string;
  subject?: string;
  status: "active" | "inactive";
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@school.com",
    role: "student",
    admissionNo: "SS3A/001",
    class: "SS3A",
    status: "active",
    createdAt: "2026-01-15",
  },
  {
    id: 2,
    name: "Jane Teacher",
    email: "jane.teacher@school.com",
    role: "teacher",
    subject: "Mathematics",
    status: "active",
    createdAt: "2026-01-10",
  },
  {
    id: 3,
    name: "Mike Invigilator",
    email: "mike.inv@school.com",
    role: "invigilator",
    status: "active",
    createdAt: "2026-01-12",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.w@school.com",
    role: "student",
    admissionNo: "SS3A/002",
    class: "SS3A",
    status: "inactive",
    createdAt: "2026-01-20",
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [filterRole, setFilterRole] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student" as User["role"],
    admissionNo: "",
    class: "",
    subject: "",
    status: "active" as User["status"],
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      role: "student",
      admissionNo: "",
      class: "",
      subject: "",
      status: "active",
    });
    setShowUserDialog(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      admissionNo: user.admissionNo || "",
      class: user.class || "",
      subject: user.subject || "",
      status: user.status,
    });
    setShowUserDialog(true);
  };

  const handleDeleteUser = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
      alert("User deleted successfully!");
    }
  };

  const handleSaveUser = () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingUser) {
      setUsers(
        users.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u)),
      );
      alert("User updated successfully!");
    } else {
      const newUser: User = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, newUser]);
      alert("User created successfully!");
    }

    setShowUserDialog(false);
  };

  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate CSV parsing
      alert(
        `File "${file.name}" uploaded! In production, this would parse and import users.`,
      );
      setShowBulkUpload(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const stats = {
    total: users.length,
    students: users.filter((u) => u.role === "student").length,
    teachers: users.filter((u) => u.role === "teacher").length,
    invigilators: users.filter((u) => u.role === "invigilator").length,
    active: users.filter((u) => u.status === "active").length,
  };

  const roleConfig: Record<
    string,
    { bg: string; text: string; label: string }
  > = {
    student: {
      bg: "rgba(59, 130, 246, 0.1)",
      text: "#3b82f6",
      label: "Student",
    },
    teacher: {
      bg: "rgba(34, 197, 94, 0.1)",
      text: "#22c55e",
      label: "Teacher",
    },
    invigilator: {
      bg: "rgba(245, 158, 11, 0.1)",
      text: "#f59e0b",
      label: "Invigilator",
    },
    school_admin: {
      bg: "rgba(168, 85, 247, 0.1)",
      text: "#a855f7",
      label: "Admin",
    },
  };

  return (
    <div
      style={{
        fontFamily: "var(--font-inter)",
        background: "hsl(var(--background))",
        minHeight: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)",
          borderRadius: 16,
          padding: "32px",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "hsl(var(--accent) / 0.2)",
            filter: "blur(60px)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <div>
              <h1
                style={{
                  color: "hsl(var(--primary-foreground))",
                  fontSize: 32,
                  fontWeight: 800,
                  margin: "0 0 8px",
                  letterSpacing: "-0.02em",
                }}
              >
                👥 User Management
              </h1>
              <p
                style={{
                  color: "hsl(var(--primary-foreground) / 0.9)",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                Manage students, teachers, and invigilators
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button
                onClick={() => setShowBulkUpload(true)}
                style={{
                  background: "hsl(var(--accent))",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                📤 Bulk Upload
              </button>
              <button
                onClick={handleAddUser}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "hsl(var(--primary-foreground))",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: 10,
                  padding: "10px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 18 }}>+</span> Add User
              </button>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: isOnline
                    ? "rgba(34, 197, 94, 0.2)"
                    : "rgba(239, 68, 68, 0.2)",
                  border: `1px solid ${isOnline ? "rgba(34, 197, 94, 0.4)" : "rgba(239, 68, 68, 0.4)"}`,
                  borderRadius: 100,
                  padding: "8px 16px",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: isOnline ? "#22c55e" : "#ef4444",
                    boxShadow: `0 0 8px ${isOnline ? "#22c55e" : "#ef4444"}`,
                  }}
                />
                <span
                  style={{
                    color: "hsl(var(--primary-foreground))",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Total Users",
            value: stats.total,
            icon: "👥",
            color: "hsl(var(--primary))",
          },
          {
            label: "Students",
            value: stats.students,
            icon: "🎓",
            color: "#3b82f6",
          },
          {
            label: "Teachers",
            value: stats.teachers,
            icon: "👨‍🏫",
            color: "#22c55e",
          },
          {
            label: "Invigilators",
            value: stats.invigilators,
            icon: "🧑‍💼",
            color: "#f59e0b",
          },
          {
            label: "Active",
            value: stats.active,
            icon: "✅",
            color: "#22c55e",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 12,
              padding: "16px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>{stat.icon}</div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: stat.color,
                marginBottom: 4,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "hsl(var(--muted-foreground))",
                fontWeight: 500,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div
        style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}
      >
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            minWidth: 250,
            padding: "12px 16px",
            fontSize: 15,
            border: "1px solid hsl(var(--border))",
            borderRadius: 10,
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            fontFamily: "inherit",
          }}
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          style={{
            padding: "12px 16px",
            fontSize: 15,
            border: "1px solid hsl(var(--border))",
            borderRadius: 10,
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          <option value="all">All Roles</option>
          <option value="student">Students</option>
          <option value="teacher">Teachers</option>
          <option value="invigilator">Invigilators</option>
          <option value="school_admin">Admins</option>
        </select>
      </div>

      {/* Users Table */}
      <div
        style={{
          background: "hsl(var(--background))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  background: "hsl(var(--secondary))",
                  borderBottom: "1px solid hsl(var(--border))",
                }}
              >
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Role
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Details
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Created
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  style={{ borderBottom: "1px solid hsl(var(--border))" }}
                >
                  <td
                    style={{
                      padding: "16px",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {user.name}
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      fontSize: 14,
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    {user.email}
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span
                      style={{
                        background: roleConfig[user.role].bg,
                        color: roleConfig[user.role].text,
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 6,
                        textTransform: "uppercase",
                      }}
                    >
                      {roleConfig[user.role].label}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      fontSize: 13,
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    {user.role === "student" &&
                      `${user.admissionNo} • ${user.class}`}
                    {user.role === "teacher" && user.subject}
                    {user.role === "invigilator" && "-"}
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span
                      style={{
                        background:
                          user.status === "active"
                            ? "rgba(34, 197, 94, 0.1)"
                            : "rgba(156, 163, 175, 0.1)",
                        color: user.status === "active" ? "#22c55e" : "#9ca3af",
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 6,
                        textTransform: "uppercase",
                      }}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      fontSize: 13,
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    {user.createdAt}
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        justifyContent: "center",
                      }}
                    >
                      <button
                        onClick={() => handleEditUser(user)}
                        style={{
                          background: "hsl(var(--primary))",
                          color: "hsl(var(--primary-foreground))",
                          border: "none",
                          borderRadius: 6,
                          padding: "6px 12px",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        style={{
                          background: "#ef4444",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          padding: "6px 12px",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Dialog */}
      {showUserDialog && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowUserDialog(false)}
        >
          <div
            style={{
              background: "hsl(var(--background))",
              borderRadius: 16,
              padding: 32,
              width: "90%",
              maxWidth: 600,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 24,
                color: "hsl(var(--foreground))",
              }}
            >
              {editingUser ? "Edit User" : "Add New User"}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter full name"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: 15,
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 10,
                    background: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter email address"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: 15,
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 10,
                    background: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Role *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as User["role"],
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: 15,
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 10,
                    background: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                    fontFamily: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="invigilator">Invigilator</option>
                  <option value="school_admin">Admin</option>
                </select>
              </div>

              {formData.role === "student" && (
                <>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 14,
                        fontWeight: 600,
                        marginBottom: 8,
                        color: "hsl(var(--foreground))",
                      }}
                    >
                      Admission Number
                    </label>
                    <input
                      type="text"
                      value={formData.admissionNo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          admissionNo: e.target.value,
                        })
                      }
                      placeholder="e.g., SS3A/001"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        fontSize: 15,
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 10,
                        background: "hsl(var(--background))",
                        color: "hsl(var(--foreground))",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 14,
                        fontWeight: 600,
                        marginBottom: 8,
                        color: "hsl(var(--foreground))",
                      }}
                    >
                      Class
                    </label>
                    <input
                      type="text"
                      value={formData.class}
                      onChange={(e) =>
                        setFormData({ ...formData, class: e.target.value })
                      }
                      placeholder="e.g., SS3A"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        fontSize: 15,
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 10,
                        background: "hsl(var(--background))",
                        color: "hsl(var(--foreground))",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>
                </>
              )}

              {formData.role === "teacher" && (
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 8,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="e.g., Mathematics"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: 15,
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 10,
                      background: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
              )}

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as User["status"],
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: 15,
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 10,
                    background: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                    fontFamily: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 24,
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setShowUserDialog(false)}
                style={{
                  background: "hsl(var(--secondary))",
                  color: "hsl(var(--foreground))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 10,
                  padding: "12px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {editingUser ? "Update User" : "Create User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Dialog */}
      {showBulkUpload && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowBulkUpload(false)}
        >
          <div
            style={{
              background: "hsl(var(--background))",
              borderRadius: 16,
              padding: 32,
              width: "90%",
              maxWidth: 500,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 16,
                color: "hsl(var(--foreground))",
              }}
            >
              📤 Bulk Upload Users
            </h2>

            <p
              style={{
                fontSize: 14,
                color: "hsl(var(--muted-foreground))",
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              Upload a CSV file with user data. The file should have columns:
              name, email, role, admissionNo (for students), class (for
              students), subject (for teachers).
            </p>

            <div
              style={{
                border: "2px dashed hsl(var(--border))",
                borderRadius: 12,
                padding: 40,
                textAlign: "center",
                marginBottom: 24,
                background: "hsl(var(--secondary) / 0.3)",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
              <label
                style={{
                  display: "inline-block",
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  padding: "12px 24px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Choose CSV File
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleBulkUpload}
                  style={{ display: "none" }}
                />
              </label>
              <p
                style={{
                  fontSize: 12,
                  color: "hsl(var(--muted-foreground))",
                  marginTop: 12,
                }}
              >
                or drag and drop your file here
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setShowBulkUpload(false)}
                style={{
                  background: "hsl(var(--secondary))",
                  color: "hsl(var(--foreground))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 10,
                  padding: "12px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
