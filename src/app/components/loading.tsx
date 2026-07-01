"use client"

import { useEffect, useState } from "react"
import { cn } from "../lib/utils"
import { HTMLAttributes } from "react"

export default function Loading({ className }: HTMLAttributes<HTMLSpanElement>) {
    const [dots, setDots] = useState<string>("")

    useEffect(() => {
        let dotCount = 0
        let isDeleting = false
        let timeoutId: NodeJS.Timeout

        const animate = () => {
            if (!isDeleting) {
                dotCount++
                setDots(".".repeat(dotCount))
                if (dotCount >= 3) isDeleting = true
                timeoutId = setTimeout(animate, 500)
            } else {
                dotCount--
                setDots(".".repeat(dotCount))

                if (dotCount <= 0) {
                    isDeleting = false
                    timeoutId = setTimeout(animate, 500)
                    return
                }
                animate()
            }
        }
        animate()
        return () => clearTimeout(timeoutId)
    }, [])

    return (
        <span
            className={cn(
                "flex items-center justify-center",
                "text-sm text-gray-400 text-nowrap text-center",
                className
            )}
        >
            Loading
            {dots}
        </span>
    )
}
