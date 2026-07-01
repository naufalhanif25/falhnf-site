"use client"

import { cn } from "@/app/lib/utils"
import { ExternalLink } from "lucide-react"
import { HTMLAttributes } from "react"
import { LINKS } from "./props"
import Terminal from "../terminal"

export default function FooterTerminal({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={className} {...props}>
            <Terminal
                command="cat connections.txt"
                className="w-full h-fit px-3 py-2 mb-2 gap-1 overflow-hidden"
            >
                {LINKS.map((link, index) => {
                    return (
                        <h5
                            key={index}
                            className={cn(
                                "flex items-start justify-start",
                                "w-full overflow-hidden"
                            )}
                        >
                            <p
                                className={cn(
                                    "flex-1 max-w-6 text-gray-400",
                                    "pointer-events-none"
                                )}
                            >
                                {index + 1}
                            </p>
                            <p className={cn("flex-1 max-w-30", "pointer-events-none")}>
                                [<ins className="no-underline text-teal-400">{link.name}</ins>]
                            </p>
                            <button className="flex items-center justify-start flex-1 overflow-hidden">
                                <span
                                    className={cn(
                                        "group flex items-center justify-start",
                                        "w-fit max-w-full h-fit cursor-pointer gap-1",
                                        "text-left hover:text-amber-400 underline"
                                    )}
                                >
                                    <p
                                        onClick={() => window.open(link.href, "_blank")}
                                        className="max-w-full w-fit truncate"
                                    >
                                        {link.value}
                                    </p>
                                    <ExternalLink
                                        className={cn(
                                            "hidden group-hover:block text-gray-400",
                                            "shrink-0 select-none pointer-events-none"
                                        )}
                                        size={12}
                                    />
                                </span>
                            </button>
                        </h5>
                    )
                })}
            </Terminal>
        </div>
    )
}
