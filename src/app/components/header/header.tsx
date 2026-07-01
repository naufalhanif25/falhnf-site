"use client"

import { cn } from "../../lib/utils"
import { usePathname } from "next/navigation"
import { Name, RoutePath } from "./ui"
import { HeaderData } from "./props"

export default function Header({ className, children, title, user, device, ...props }: HeaderData) {
    const pathname = usePathname()

    return (
        <header className={className} {...props}>
            <div
                className={cn(
                    "hidden sm:flex items-center justify-between",
                    "w-full h-full gap-8 max-h-8"
                )}
            >
                <Name
                    name={title}
                    className={cn(
                        "flex items-center justify-start",
                        "h-full min-w-0 gap-2 flex-1 max-w-35",
                        "overflow-hidden"
                    )}
                />
                <RoutePath
                    path={pathname}
                    user={user}
                    device={device}
                    className={cn(
                        "flex items-center justify-center",
                        "max-h-7 h-full flex-1 min-w-80 max-w-100",
                        "overflow-hidden"
                    )}
                />
                {children}
            </div>
            <div
                className={cn(
                    "sm:hidden flex flex-col items-start justify-center",
                    "w-full h-full max-h-16 gap-2"
                )}
            >
                <div
                    className={cn("flex items-center justify-start", "w-full h-full gap-2 max-h-8")}
                >
                    <Name
                        name={title}
                        className={cn(
                            "flex items-center justify-start",
                            "h-full min-w-0 flex-1 gap-2 overflow-hidden"
                        )}
                    />
                    {children}
                </div>
                <div
                    className={cn(
                        "flex items-center justify-center",
                        "w-full h-full gap-2 max-h-8"
                    )}
                >
                    <RoutePath
                        path={pathname}
                        user={user}
                        device={device}
                        className={cn(
                            "flex items-center justify-center",
                            "max-h-7 h-full min-w-0 flex-1",
                            "overflow-hidden"
                        )}
                    />
                </div>
            </div>
        </header>
    )
}
