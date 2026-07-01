"use client"

import { cn } from "@/app/lib/utils"
import { WindowButtonData } from "./props"

export default function WindowButton({
    button,
    className,
    active,
    ...props
}: WindowButtonData) {
    return (
        <button
            className={cn(
                className,
                "size-6 shrink-0 rounded-full",
                "group transition-colors ease-out duration-100",
                "cursor-pointer",
                active ? "bg-gray-700 hover:bg-gray-800" : "pointer-events-none bg-gray-800"
            )}
            {...props}
        >
            <button.icon
                {...button.props}
                className={cn(
                    active ? "text-gray-200 group-hover:text-gray-300" : "text-gray-400",
                    button.props.className
                )}
            />
        </button>
    )
}
