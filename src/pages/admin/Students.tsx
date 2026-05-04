import { useState } from "react";
import { GraduationCap, Search, Plus, Download } from "lucide-react";

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");

  const students = [
    {
      id: 1,
      name: "John Doe",
      admissionNo: "SS3A/001",
      class: "SS3A",
      email: "john@school.com",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      admissionNo: "SS3A/002",
      class: "SS3A",
      email: "jane@school.com",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      admissionNo: "SS3B/001",
      class: "SS3B",
      email: "mike@school.com",
      status: "active",
    },
    {
      id: 4,
      name: "Sarah Williams",
      admissionNo: "SS2A/015",
      class: "SS2A",
      email: "sarah@school.com",
      status: "suspended",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)",
          borderRadius: 16,
          padding: 32,
          marginBottom: 24,
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: 800,
            marginBottom: 8,
          }}
        >
          All Students
        </h1>
        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 15 }}>
          Manage student records and information
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Total Students",
            value: "1,234",
            icon: "👥",
            color: "#3b82f6",
          },
          { label: "Active", value: "1,180", icon: "✅", color: "#22c55e" },
          { label: "Suspended", value: "54", icon: "⏸️", color: "#f59e0b" },
          {
            label: "New This Month",
            value: "45",
            icon: "🆕",
            color: "#8b5cf6",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
              {stat.value}
            </div>
            <div
              style={{ fontSize: 13, color: "hsl(var(--muted-foreground))" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Search
            size={18}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "hsl(var(--muted-foreground))",
            }}
          />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 40px",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 14,
            }}
          />
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "hsl(var(--primary))",
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Plus size={18} /> Register Student
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "hsl(var(--secondary))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
            padding: "10px 20px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Download size={18} /> Export
        </button>
      </div>

      {/* Students Table */}
      <div
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "hsl(var(--secondary))" }}>
              <th
                style={{
                  padding: 16,
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                Admission No
              </th>
              <th
                style={{
                  padding: 16,
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: 16,
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                Class
              </th>
              <th
                style={{
                  padding: 16,
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: 16,
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: 16,
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                style={{ borderTop: "1px solid hsl(var(--border))" }}
              >
                <td style={{ padding: 16, fontSize: 14 }}>
                  {student.admissionNo}
                </td>
                <td style={{ padding: 16, fontSize: 14, fontWeight: 600 }}>
                  {student.name}
                </td>
                <td style={{ padding: 16, fontSize: 14 }}>{student.class}</td>
                <td
                  style={{
                    padding: 16,
                    fontSize: 14,
                    color: "hsl(var(--muted-foreground))",
                  }}
                >
                  {student.email}
                </td>
                <td style={{ padding: 16 }}>
                  <span
                    style={{
                      background:
                        student.status === "active"
                          ? "rgba(34, 197, 94, 0.1)"
                          : "rgba(245, 158, 11, 0.1)",
                      color:
                        student.status === "active" ? "#22c55e" : "#f59e0b",
                      padding: "4px 12px",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {student.status}
                  </span>
                </td>
                <td style={{ padding: 16 }}>
                  <button
                    style={{
                      background: "hsl(var(--primary))",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
