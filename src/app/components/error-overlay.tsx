"use client"

import { useRouter } from "next/navigation"
import { cn } from "../lib/utils"
import { ErrorOverlayProps } from "./props"

export default function ErrorOverlay({
    status,
    short,
    message,
    className,
    ...props
}: ErrorOverlayProps) {
    const router = useRouter()

    return (
        <div className={cn("flex flex-col items-center justify-center", className)} {...props}>
            <span className={cn("flex flex-col items-center justify-center", "w-fit h-fit gap-1")}>
                <span
                    className={cn("flex flex-col items-center justify-center", "w-fit h-fit gap-2")}
                >
                    <h2
                        className={cn(
                            "text-gray-200 text-[clamp(2rem,12vw,2.4rem)] sm:text-5xl text-nowrap",
                            "select-none pointer-events-none",
                            "leading-10 sm:leading-(--text-5xl--line-height)"
                        )}
                    >
                        {status}
                    </h2>
                    <h4
                        className={cn(
                            "text-red-400 text-base text-center",
                            "select-none pointer-events-none"
                        )}
                    >
                        Error: {short}
                    </h4>
                </span>
                <h4
                    className={cn(
                        "text-gray-400 text-sm text-center",
                        "select-none pointer-events-none"
                    )}
                >
                    {message}
                </h4>
            </span>
            <button
                onClick={() => router.back()}
                className={cn(
                    "bg-teal-400 text-gray-950 text-sm text-nowrap",
                    "select-none cursor-pointer",
                    "w-fit h-fit px-3"
                )}
            >
                &lt; back
            </button>
        </div>
    )
}
