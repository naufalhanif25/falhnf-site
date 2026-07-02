"use client"

import { cn } from "@/app/lib/utils"
import { HTMLAttributes } from "react"

export interface ArrowButtonProps extends HTMLAttributes<HTMLButtonElement> {
    active: boolean
}

export default function ArrowButton({ active, className, children, ...props }: ArrowButtonProps) {
    return (
        <button
            className={cn(
                "flex items-center justify-center",
                "text-sm h-6 min-w-7 px-2 cursor-pointer select-none",
                className,
                active
                    ? "bg-gray-600 text-gray-200"
                    : "bg-gray-700/50 text-gray-400 pointer-events-none"
            )}
            {...props}
        >
            {children}
        </button>
    )
}