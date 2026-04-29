import { useState } from "react"

export default function BroadcastMessage() {
  const [message, setMessage] = useState("")

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Broadcast Message</h1>

      <textarea
        className="w-full border p-2 rounded"
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write message..."
      />

      <button className="px-4 py-2 bg-black text-white rounded">
        Send
      </button>
    </div>
  )
}