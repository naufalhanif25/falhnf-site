"use client"

import { cn } from "@/app/lib/utils"
import { StatBoxProps } from "./props"

export default function StatBox({ className, percentage, ...props }: StatBoxProps) {
    return (
        <div className={cn(className, "w-full h-fit gap-2 py-2 px-3")} {...props}>
            <span
                className={cn(
                    "flex items-center justify-star",
                    "max-w-[30%] sm:max-w-34 w-full h-fit overflow-hidden"
                )}
            >
                <h5
                    className={cn(
                        "text-sm text-gray-200 text-nowrap",
                        "select-none pointer-events-none truncate"
                    )}
                >
                    {percentage.language}
                </h5>
            </span>
            <span
                className={cn(
                    "flex items-center justify-start",
                    "text-base text-gray-400 text-nowrap text-center",
                    "select-none pointer-events-none",
                    "flex-1 h-4 gap-1"
                )}
            >
                &#91;
                <span
                    className={cn(
                        "flex items-center justify-start",
                        "w-full h-full min-w-8 overflow-hidden",
                        "bg-gray-700/50"
                    )}
                >
                    <span
                        className="max-w-full h-full bg-teal-400"
                        style={{ width: `${percentage.percentage}%` }}
                    ></span>
                </span>
                &#93;
            </span>
            <span
                className={cn(
                    "flex items-center justify-end",
                    "max-w-12 w-full h-fit overflow-hidden"
                )}
            >
                <h6
                    className={cn(
                        "text-sm text-teal-400 text-nowrap text-right",
                        "select-none pointer-events-none"
                    )}
                >
                    {percentage.percentage}%
                </h6>
            </span>
        </div>
    )
}
