
import React from "react"
import { cn } from "@/lib/utils"

export function Alert({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "destructive" | "success" | "warning" }) {
  const variants: Record<string, string> = { default: "bg-gray-50 border-gray-200 text-gray-800", destructive: "bg-red-50 border-red-200 text-red-800", success: "bg-green-50 border-green-200 text-green-800", warning: "bg-yellow-50 border-yellow-200 text-yellow-800" }
  return <div className={cn("relative w-full rounded-lg border p-4 text-sm", variants[variant], className)} role="alert" {...props} />
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("font-semibold mb-1", className)} {...props} />
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm opacity-90", className)} {...props} />
}
