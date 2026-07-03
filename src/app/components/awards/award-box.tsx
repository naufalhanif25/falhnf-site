"use client"

import { cn } from "@/app/lib/utils"
import { AwardBoxProps } from "./props"
import { Calendar } from "lucide-react"

export default function AwardBox({ award, className, ...props }: AwardBoxProps) {
    return (
        <div className={cn("flex flex-col items-start justify-start", className)} {...props}>
            <span
                className={cn(
                    "flex flex-col items-start justify-start",
                    "w-full h-fit gap-1",
                    "overflow-hidden"
                )}
            >
                <span
                    className={cn(
                        "flex items-start justify-start",
                        "w-full h-fit overflow-hidden gap-6"
                    )}
                >
                    <h3
                        className={cn(
                            "text-base text-gray-200 line-clamp-2",
                            "flex-1 h-fit",
                            "select-none pointer-events-none"
                        )}
                    >
                        {award.title}
                    </h3>
                    <span className={cn("flex items-center justify-center", "w-fit h-6")}>
                        <p
                            className={cn(
                                "text-sm text-amber-400 text-nowrap",
                                "w-fit h-fit truncate",
                                "select-none pointer-events-none"
                            )}
                        >
                            #{award.type}
                        </p>
                    </span>
                </span>
                <p
                    className={cn(
                        "text-sm text-gray-400 line-clamp-5",
                        "w-full h-fit",
                        "select-none pointer-events-none"
                    )}
                >
                    {award.description}
                </p>
                <span className={cn("flex items-center justify-start", "w-full h-fit gap-6")}>
                    <span
                        className={cn(
                            "flex items-center justify-start",
                            "gap-2 flex-1 h-fit overflow-hidden"
                        )}
                    >
                        <span className="size-2 shrink-0 bg-amber-400 rounded-full"></span>
                        <h6
                            className={cn(
                                "text-amber-400 text-nowrap text-sm truncate",
                                "select-none pointer-events-none"
                            )}
                        >
                            {award.issuer}
                        </h6>
                    </span>
                    <span
                        className={cn(
                            "flex items-center justify-start",
                            "gap-2 flex-1 h-fit overflow-hidden"
                        )}
                    >
                        <Calendar className="text-teal-400" size={12} />
                        <h6
                            className={cn(
                                "text-teal-400 text-nowrap text-sm truncate",
                                "select-none pointer-events-none"
                            )}
                        >
                            {award.date}
                        </h6>
                    </span>
                </span>
            </span>
            {award.url && (
                <span
                    className={cn(
                        "flex items-center justify-between",
                        "w-full h-fit gap-2 mb-1 overflow-hidden"
                    )}
                >
                    <h6
                        className={cn(
                            "text-gray-200 text-nowrap text-sm",
                            "select-none pointer-events-none"
                        )}
                    >
                        [<ins className="no-underline text-teal-400">ExternalLink</ins>]
                    </h6>
                    <button
                        onClick={() => window.open(award.url, "_blank")}
                        className={cn(
                            "text-sm text-nowrap",
                            "text-gray-950 bg-teal-400",
                            "w-fit h-fit px-3",
                            "select-none cursor-pointer"
                        )}
                    >
                        certificate
                    </button>
                </span>
            )}
        </div>
    )
}
