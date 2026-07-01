"use client"

import { cn } from "@/app/lib/utils"
import { HTMLAttributes } from "react"
import Badge from "./badge"
import { BADGES } from "./props"

export default function Badges({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
    return (
        <span className={className} {...props}>
            {BADGES.map((badge, index) => {
                return (
                    <Badge
                        key={index}
                        name={badge.name}
                        value={badge.value}
                        className={cn(
                            "flex items-center justify-center",
                            "w-fit max-h-7 h-full select-none"
                        )}
                    />
                )
            })}
        </span>
    )
}
