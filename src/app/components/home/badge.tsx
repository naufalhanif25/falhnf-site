"use client"

import { cn } from "@/app/lib/utils"
import { BadgeDataProps } from "./props"

export default function Badge({ name, value, className, ...props }: BadgeDataProps) {
    return (
        <span
            className={cn(
                className,
                "text-sm text-nowrap select-none",
                "bg-gray-600 overflow-hidden"
            )}
            {...props}
        >
            <span
                className={cn("flex items-center justify-center", "w-fit h-full px-2 bg-amber-400")}
            >
                <h6 className="text-gray-950">{name}</h6>
            </span>
            <span className={cn("flex items-center justify-start", "w-fit h-full px-2")}>
                <h6 className="text-gray-200">{value}</h6>
            </span>
        </span>
    )
}
