"use client"

import { cn } from "@/app/lib/utils"
import { PencilLine } from "lucide-react"
import { PostBoxProps } from "./props"

export default function PostBox({ className, onClick, post, ...props }: PostBoxProps) {
    return (
        <div className={cn("flex flex-col items-center justify-start", className)} {...props}>
            <div className={cn("flex flex-col items-start justify-start", "w-full flex-1 gap-1")}>
                <h4
                    className={cn(
                        "text-base text-gray-200",
                        "w-full h-fit line-clamp-2 overflow-hidden",
                        "select-none pointer-events-none"
                    )}
                >
                    {post.title}
                </h4>
                <span className={cn("flex items-start justify-start", "w-full flex-1")}>
                    <p
                        className={cn(
                            "text-sm text-gray-400 line-clamp-5",
                            "w-full h-fit",
                            "select-none pointer-events-none"
                        )}
                    >
                        {post.description}
                    </p>
                </span>
            </div>
            <span className={cn("flex items-center justify-between", "w-full h-fit gap-2 mb-1")}>
                <span
                    className={cn(
                        "flex items-center justify-start",
                        "w-fit h-fit gap-2",
                        "text-teal-400 select-none pointer-events-none"
                    )}
                >
                    <PencilLine className="shrink-0" size={12} />
                    <h6 className="truncate text-nowrap text-sm">{post.publishedAt}</h6>
                </span>
                <button
                    onClick={onClick}
                    className={cn(
                        "flex items-center justify-center",
                        "w-fit h-fit gap-2 px-3",
                        "bg-teal-400 text-gray-950",
                        "text-sm text-nowrap cursor-pointer",
                        "overflow-hidden select-none"
                    )}
                >
                    read &gt;
                </button>
            </span>
        </div>
    )
}
