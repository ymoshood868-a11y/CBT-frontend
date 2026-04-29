import { useState } from "react"

export default function AuditLogs() {
  const logs = [
    { action: "Login", user: "Admin", date: "2026-04-24" },
    { action: "Create Exam", user: "Admin", date: "2026-04-23" },
  ]

  const [search, setSearch] = useState("")

  const filtered = logs.filter((l) =>
    l.action.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Audit Logs</h1>

      <input
        className="border p-2 w-full"
        placeholder="Search logs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="border rounded">
        {filtered.map((l, i) => (
          <div key={i} className="flex justify-between p-3 border-b">
            <span>{l.action}</span>
            <span>{l.user}</span>
            <span>{l.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}