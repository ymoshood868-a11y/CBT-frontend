import { useState } from "react"

export default function SchoolDetail() {
  const [tab, setTab] = useState("overview")

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">School Detail</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        {["overview", "users", "billing", "audit"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1 border rounded ${
              tab === t ? "bg-black text-white" : ""
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tab === "overview" && <div>Overview Content</div>}
        {tab === "users" && <div>User Management</div>}
        {tab === "billing" && <div>Billing Info</div>}
        {tab === "audit" && <div>Audit Logs</div>}
      </div>
    </div>
  )
}