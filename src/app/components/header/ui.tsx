"use client"

import { cn } from "@/app/lib/utils"
import { Folder, Terminal } from "lucide-react"
import { NameProps, RoutePathProps } from "./props"

export function Name({ name, className, ...props }: NameProps) {
    return (
        <div className={className} {...props}>
            <span className={cn("flex items-center justify-start", "w-fit h-6 gap-2")}>
                <span
                    className={cn(
                        "flex items-center justify-center",
                        "size-6 rounded-full bg-gray-700"
                    )}
                >
                    <Terminal className="text-gray-200" size={14} />
                </span>
                <h1
                    className={cn(
                        "text-gray-200 text-sm text-nowrap truncate",
                        "select-none pointer-events-none"
                    )}
                >
                    {name}
                </h1>
            </span>
        </div>
    )
}

export function RoutePath({ path, user, device, className, ...props }: RoutePathProps) {
    return (
        <div className={className} {...props}>
            <span
                className={cn(
                    "flex items-center justify-start",
                    "flex-1 h-full overflow-hidden",
                    "rounded-sm bg-gray-700"
                )}
            >
                <span
                    className={cn(
                        "flex items-center justify-center",
                        "gap-2 w-fit h-full px-2 py-1",
                        "bg-gray-400"
                    )}
                >
                    <Folder size={14} className="text-gray-950" />
                </span>
                <span
                    className={cn(
                        "flex items-center justify-start",
                        "flex-1 h-full px-2 py-1",
                        "overflow-hidden"
                    )}
                >
                    <h6
                        className={cn(
                            "text-gray-400 text-sm text-nowrap",
                            "flex-1 truncate",
                            "select-none pointer-events-none"
                        )}
                    >
                        {user}@{device}:~{path === "/" ? "" : path}
                    </h6>
                </span>
            </span>
        </div>
    )
}
