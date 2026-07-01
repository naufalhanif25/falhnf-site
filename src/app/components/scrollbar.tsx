"use client"

import { cn } from "../lib/utils"
import { ScrollbarProps } from "./props"

export default function Scrollbar({ className, ref, ...props }: ScrollbarProps) {
    return (
        <div
            className={cn(
                className,
                "relative overflow-hidden",
                "flex flex-col items-start justify-start",
                "bg-gray-800/50"
            )}
        >
            <span
                ref={ref}
                className={cn(
                    "bg-gray-600 hover:bg-gray-400 transition-colors duration-200",
                    "w-2 h-16"
                )}
                {...props}
            ></span>
        </div>
    )
}
