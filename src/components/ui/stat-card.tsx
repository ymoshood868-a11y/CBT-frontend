import React from "react"
import { cn } from "@/lib/utils"

export function StatCard({
  label,
  value,
  icon,
  trend,
  className,
}: {
  label: string
  value: string | number
  icon?: React.ReactNode
  trend?: { value: number; label?: string }
  className?: string
}) {
  return (
    <div className={cn("rounded-lg border bg-white p-4 shadow-sm", className)}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">{label}</p>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      {trend && (
        <p className={cn("text-xs mt-1", trend.value >= 0 ? "text-green-600" : "text-red-600")}>
          {trend.value >= 0 ? "+" : ""}{trend.value}% {trend.label ?? "vs last period"}
        </p>
      )}
    </div>
  )
}
