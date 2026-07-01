"use client"

import { cn } from "../../lib/utils"
import { NavButtonData } from "./props"

export default function FooterNavButton({ button, active, className, ...props }: NavButtonData) {
    const targetIndex = button.title.indexOf(button.shortcut)

    return (
        <button
            className={cn(className, "cursor-pointer h-6 w-fit px-3 text-base select-none")}
            {...props}
        >
            {button.title.slice(0, targetIndex)}

            <strong className={!active ? "text-gray-200 font-medium" : "font-normal"}>
                {button.title[targetIndex]}
            </strong>

            {button.title.slice(targetIndex + 1)}
        </button>
    )
}
