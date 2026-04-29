import { useState } from "react"

export default function SchoolCreate() {
  const [step, setStep] = useState(1)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Create School</h1>

      {/* Step indicator */}
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === s ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Step content */}
      {step === 1 && <div>School Info Form</div>}
      {step === 2 && <div>Admin Setup Form</div>}
      {step === 3 && <div>Plan Selection</div>}
      {step === 4 && <div>Review & Submit</div>}

      {/* Actions */}
      <div className="flex justify-between">
        <button onClick={() => setStep((s) => Math.max(1, s - 1))}>
          Back
        </button>
        <button onClick={() => setStep((s) => Math.min(4, s + 1))}>
          Next
        </button>
      </div>
    </div>
  )
}