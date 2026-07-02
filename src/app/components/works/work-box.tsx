"use client"

import { cn } from "@/app/lib/utils"
import { WorkBoxProps } from "./props"

export default function WorkBox({ work, className, ...props }: WorkBoxProps) {
    return (
        <div className={cn("flex flex-col items-center justify-start", className)} {...props}>
            <div className={cn("flex flex-col items-center justify-start", "w-full flex-1 gap-1")}>
                <h4
                    className={cn(
                        "text-base text-gray-200 text-nowrap",
                        "truncate w-full",
                        "select-none pointer-events-none"
                    )}
                >
                    {work.title}
                </h4>
                <p
                    className={cn(
                        "text-sm text-gray-400",
                        "w-full flex-1",
                        "select-none pointer-events-none"
                    )}
                >
                    {work.description}
                </p>
                <div
                    className={cn(
                        "flex items-center justify-start flex-wrap",
                        "w-full h-fit gap-x-3 gap-y-1"
                    )}
                >
                    {work.stack.map((stack, index) => {
                        return (
                            <span
                                key={index}
                                className={cn(
                                    "text-amber-400 text-sm text-nowrap",
                                    "w-fit h-fit",
                                    "select-none pointer-events-none"
                                )}
                            >
                                #{stack}
                            </span>
                        )
                    })}
                </div>
            </div>
            {work.source && (
                <div className={cn("flex items-start justify-start", "w-full h-fit gap-1")}>
                    <p
                        className={cn(
                            "text-sm text-gray-200 text-nowrap truncate",
                            "flex-1 h-fit overflow-hidden",
                            "select-none pointer-events-none"
                        )}
                    >
                        [<ins className="text-teal-400 no-underline">Source</ins>]
                    </p>
                    {work.source.code && (
                        <a
                            href={work.source.code}
                            target="_blank"
                            className={cn(
                                "text-sm text-gray-950 bg-teal-400",
                                "w-fit h-fit px-3",
                                "select-none"
                            )}
                        >
                            code
                        </a>
                    )}
                    {work.source.app && (
                        <a
                            href={work.source.app}
                            target="_blank"
                            className={cn(
                                "text-sm text-gray-950 bg-teal-400",
                                "w-fit h-fit px-3",
                                "select-none"
                            )}
                        >
                            app
                        </a>
                    )}
                </div>
            )}
        </div>
    )
}
