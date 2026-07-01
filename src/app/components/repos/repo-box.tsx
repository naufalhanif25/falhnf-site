"use client"

import { cn } from "@/app/lib/utils"
import { ExternalLink, Clock } from "lucide-react"
import { RepoData } from "./utils"

export default function RepoBox({ repo, className, ...props }: RepoData) {
    return (
        <div className={cn("flex flex-col items-start justify-center", className)} {...props}>
            <span className={cn("flex items-start justify-end", "w-full h-fit")}>
                <span
                    className={cn(
                        "flex flex-col items-start justify-start",
                        "h-fit flex-1 px-1 gap-1 overflow-hidden"
                    )}
                >
                    <h3
                        className={cn(
                            "text-base text-gray-200 text-nowrap",
                            "select-none pointer-events-none"
                        )}
                    >
                        {repo.name}
                    </h3>
                    {repo.description && (
                        <h4
                            className={cn(
                                "text-sm text-gray-400 line-clamp-2",
                                "select-none pointer-events-none"
                            )}
                        >
                            {repo.description}
                        </h4>
                    )}
                </span>
                <span className="h-fit w-fit p-1">
                    <ExternalLink
                        onClick={() => window.open(repo.url, "__blank")}
                        className={cn(
                            "text-gray-400 hover:text-gray-200",
                            "animation duration-200",
                            "cursor-pointer"
                        )}
                        size={14}
                    />
                </span>
            </span>
            <div
                className={cn(
                    "flex items-center justify-between",
                    "h-fit w-full px-1 gap-8 sm:gap-0 overflow-hidden"
                )}
            >
                {repo.language && (
                    <span
                        className={cn(
                            "flex items-center justify-start",
                            "h-fit flex-1 gap-2 overflow-hidden"
                        )}
                    >
                        <span className="size-2 bg-amber-400 rounded-full"></span>
                        <h5
                            className={cn(
                                "text-sm text-amber-400 text-nowrap",
                                "select-none pointer-events-none",
                                "truncate"
                            )}
                        >
                            {repo.language}
                        </h5>
                    </span>
                )}
                <span
                    className={cn(
                        "flex items-center justify-start",
                        "h-fit flex-1 gap-2 overflow-hidden"
                    )}
                >
                    <Clock className="text-teal-400" size={12} />
                    <span
                        className={cn(
                            "text-sm text-teal-400 text-nowrap",
                            "select-none pointer-events-none",
                            "truncate"
                        )}
                    >
                        <h5 className="hidden sm:block">{repo.pushedAt}</h5>
                        <h5 className="sm:hidden">{repo.pushedAt.split(",")[0]}</h5>
                    </span>
                </span>
            </div>
        </div>
    )
}
