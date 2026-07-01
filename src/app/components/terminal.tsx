"use client"

import { useState } from "react"
import { cn } from "../lib/utils"
import { TerminalProps } from "./props"
import { ChevronDown } from "lucide-react"

export default function Terminal({ className, command, children, ...props }: TerminalProps) {
    const [showOutput, setShowOutput] = useState<boolean>(true)

    return (
        <div
            className={cn(
                className,
                "flex flex-col items-start justify-start",
                "rounded-md border-amber-400 bg-gray-800/50 border",
                "text-sm text-gray-200 text-nowrap",
                "select-none"
            )}
            {...props}
        >
            <span className={cn("flex items-center justify-between", "w-full h-fit")}>
                <h4 className="text-amber-400 text-base">
                    <ins className="text-gray-400 no-underline">&gt;</ins> {command}
                </h4>
                <button
                    onClick={() => setShowOutput((prev) => !prev)}
                    className={cn(
                        "flex items-center justify-center",
                        "size-6 overflow-hidden shrink-0 cursor-pointer"
                    )}
                >
                    <ChevronDown
                        className="text-gray-400 shrink-0"
                        size={16}
                        style={{ rotate: showOutput ? "0deg" : "-180deg" }}
                    />
                </button>
            </span>
            <span
                className={cn(
                    "flex-col items-start justify-start",
                    "w-full h-fit overflow-hidden",
                    showOutput ? "max-h-100 flex" : "max-h-0 hidden"
                )}
            >
                {children}
            </span>
        </div>
    )
}
