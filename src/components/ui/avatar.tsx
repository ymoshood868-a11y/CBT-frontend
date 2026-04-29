import React from "react"
import { cn } from "@/lib/utils"

export function Avatar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />
  )
}

export function AvatarImage({ className, src, alt }: { className?: string; src?: string; alt?: string }) {
  return <img src={src} alt={alt} className={cn("aspect-square h-full w-full object-cover", className)} />
}

export function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600 text-sm font-medium", className)}
      {...props}
    />
  )
}
