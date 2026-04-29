export default function BillingManagement() {
  const billing = [
    { school: "Greenfield", status: "paid", amount: 50000 },
    { school: "Starlight", status: "pending", amount: 30000 },
  ]

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Billing Management</h1>

      <div className="border rounded">
        {billing.map((b) => (
          <div key={b.school} className="flex justify-between p-3 border-b">
            <span>{b.school}</span>
            <span>{b.amount}</span>
            <span>{b.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}