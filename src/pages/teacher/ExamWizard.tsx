import { useState } from "react"
import { Button } from "@/components/ui/button"

type ExamDraft = {
  basicInfo: {
    name: string
    subject: string
    class: string
    instructions: string
    passMark: number
  }
  questions: string[]
  settings: {
    duration: number
    shuffle: boolean
    allowNavigation: boolean
    accessCode: string
  }
  schedule: {
    startDate: string
    endDate: string
    timezone: string
  }
  status: "draft" | "submitted"
}

export default function ExamWizard() {
  const [step, setStep] = useState(1)

  const [draft, setDraft] = useState<ExamDraft>({
    basicInfo: {
      name: "",
      subject: "",
      class: "",
      instructions: "",
      passMark: 50,
    },
    questions: [],
    settings: {
      duration: 60,
      shuffle: false,
      allowNavigation: true,
      accessCode: "",
    },
    schedule: {
      startDate: "",
      endDate: "",
      timezone: "Africa/Lagos",
    },
    status: "draft",
  })

  function updateSection<T extends keyof ExamDraft>(
    section: T,
    data: ExamDraft[T]
  ) {
    setDraft((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  function next() {
    setStep((s) => Math.min(s + 1, 5))
  }

  function back() {
    setStep((s) => Math.max(s - 1, 1))
  }

  function submit() {
    setDraft((prev) => ({ ...prev, status: "submitted" }))
    alert("Exam submitted for approval")
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Exam Wizard</h1>
        <p className="text-sm text-gray-500">Step {step} of 5</p>
      </div>

      {/* STEP INDICATOR */}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={`w-8 h-8 flex items-center justify-center rounded-full border ${
              step === s ? "bg-black text-white" : "bg-gray-100"
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* STEP CONTENT */}
      <div className="border rounded-lg p-6 space-y-4">

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-3">
            <h2 className="font-semibold">Basic Info</h2>

            <input
              placeholder="Exam Name"
              className="w-full border p-2"
              value={draft.basicInfo.name}
              onChange={(e) =>
                updateSection("basicInfo", {
                  ...draft.basicInfo,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Subject"
              className="w-full border p-2"
              value={draft.basicInfo.subject}
              onChange={(e) =>
                updateSection("basicInfo", {
                  ...draft.basicInfo,
                  subject: e.target.value,
                })
              }
            />

            <input
              placeholder="Class"
              className="w-full border p-2"
              value={draft.basicInfo.class}
              onChange={(e) =>
                updateSection("basicInfo", {
                  ...draft.basicInfo,
                  class: e.target.value,
                })
              }
            />

            <input
              placeholder="Pass Mark"
              type="number"
              className="w-full border p-2"
              value={draft.basicInfo.passMark}
              onChange={(e) =>
                updateSection("basicInfo", {
                  ...draft.basicInfo,
                  passMark: Number(e.target.value),
                })
              }
            />
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-3">
            <h2 className="font-semibold">Question Selection</h2>

            <p className="text-sm text-gray-500">
              (Demo) Add question IDs manually
            </p>

            <input
              placeholder="Enter question ID"
              className="w-full border p-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateSection("questions", [
                    ...draft.questions,
                    (e.target as HTMLInputElement).value,
                  ])
                }
              }}
            />

            <div className="flex flex-wrap gap-2">
              {draft.questions.map((q, i) => (
                <span key={i} className="px-2 py-1 bg-gray-200 rounded">
                  {q}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-3">
            <h2 className="font-semibold">Settings</h2>

            <input
              type="number"
              placeholder="Duration (mins)"
              className="w-full border p-2"
              value={draft.settings.duration}
              onChange={(e) =>
                updateSection("settings", {
                  ...draft.settings,
                  duration: Number(e.target.value),
                })
              }
            />

            <input
              placeholder="Access Code"
              className="w-full border p-2"
              value={draft.settings.accessCode}
              onChange={(e) =>
                updateSection("settings", {
                  ...draft.settings,
                  accessCode: e.target.value,
                })
              }
            />

            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={draft.settings.shuffle}
                onChange={(e) =>
                  updateSection("settings", {
                    ...draft.settings,
                    shuffle: e.target.checked,
                  })
                }
              />
              Shuffle Questions
            </label>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="space-y-3">
            <h2 className="font-semibold">Schedule</h2>

            <input
              type="datetime-local"
              className="w-full border p-2"
              onChange={(e) =>
                updateSection("schedule", {
                  ...draft.schedule,
                  startDate: e.target.value,
                })
              }
            />

            <input
              type="datetime-local"
              className="w-full border p-2"
              onChange={(e) =>
                updateSection("schedule", {
                  ...draft.schedule,
                  endDate: e.target.value,
                })
              }
            />
          </div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <div className="space-y-3">
            <h2 className="font-semibold">Review</h2>

            <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
              {JSON.stringify(draft, null, 2)}
            </pre>

            <p className="text-sm text-red-500">
              Once submitted, admin approval is required.
            </p>
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={back} disabled={step === 1}>
          Back
        </Button>

        {step < 5 ? (
          <Button onClick={next}>Next</Button>
        ) : (
          <Button onClick={submit}>Submit for Approval</Button>
        )}
      </div>
    </div>
  )
}