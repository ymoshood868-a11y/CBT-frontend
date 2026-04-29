import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { api } from "@/lib/api"

export default function SignupPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit } = useForm()

  const handleSignup = async (data: any) => {
    setLoading(true)

    try {
      await api.post("/auth/register-school", {
        school_name: data.school_name,
        admin_name: data.admin_name,
        email: data.email,
        password: data.password,
      })

      alert("Account created successfully")
      navigate("/login")

    } catch (err) {
      alert("Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold text-center mb-1">
          Create School Account
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Setup your CBT institution
        </p>

        <form onSubmit={handleSubmit(handleSignup)} className="space-y-3">

          <input
            {...register("school_name")}
            placeholder="School Name"
            className="w-full border p-2 rounded"
          />

          <input
            {...register("admin_name")}
            placeholder="Admin Full Name"
            className="w-full border p-2 rounded"
          />

          <input
            {...register("email")}
            placeholder="Email"
            className="w-full border p-2 rounded"
          />

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white p-2 rounded"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

        </form>

        <p className="text-xs text-center mt-4 text-gray-400">
          School onboarding for CBT platform
        </p>

      </div>
    </div>
  )
}