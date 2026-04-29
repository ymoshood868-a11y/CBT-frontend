import { useState } from "react"

export default function SchoolList() {
  const [filter, setFilter] = useState("all")

  const schools = [
    { name: "Greenfield", status: "active" },
    { name: "Starlight", status: "active" },
    { name: "Bright Future", status: "inactive" },
  ]

  const filtered =
    filter === "all" ? schools : schools.filter((s) => s.status === filter)

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Schools</h1>

      {/* Filters */}
      <div className="flex gap-2">
        {["all", "active", "inactive"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded border ${
              filter === f ? "bg-black text-white" : ""
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border rounded">
        {filtered.map((s) => (
          <div
            key={s.name}
            className="flex justify-between p-3 border-b last:border-b-0"
          >
            <span>{s.name}</span>
            <span className="text-sm">{s.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}