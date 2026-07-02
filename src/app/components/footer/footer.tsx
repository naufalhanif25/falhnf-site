"use client"

import { cn } from "../../lib/utils"
import { ROUTES } from "./props"
import { HTMLAttributes, useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { GitBranch, Globe, GlobeOff } from "lucide-react"
import FooterNavButton from "./nav-button"
import FooterTerminal from "./footer-terminal"
import ArrowButton from "./arrow-button"
import {
    getNextButtonTransform,
    getPrevButtonTransform,
    onScrollLeft,
    onScrollRight,
} from "./utils"

export default function Footer({ className, ...props }: HTMLAttributes<HTMLElement>) {
    const router = useRouter()
    const pathname = usePathname()
    const basePath = "/" + pathname.split("/")[1]
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [linksOpen, setLinksOpen] = useState<boolean>(false)
    const [showArrows, setShowArrows] = useState<boolean>(false)
    const [leftArrowActive, setLeftArrowActive] = useState<boolean>(false)
    const [rightArrowActive, setRightArrowActive] = useState<boolean>(false)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
                return
            }
            const target = ROUTES.find((route) => route.shortcut === event.key)
            if (target) router.push(target.path)
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [pathname, router])

    const updateArrowsState = (container: HTMLDivElement) => {
        const leftActive = getPrevButtonTransform(container) !== null
        const rightActive = getNextButtonTransform(container) !== null

        setLeftArrowActive((prev) => (prev === leftActive ? prev : leftActive))
        setRightArrowActive((prev) => (prev === rightActive ? prev : rightActive))
    }

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const updateVisibility = () => {
            const isOverflow = container.scrollWidth > container.clientWidth
            if (isOverflow !== showArrows) setShowArrows(isOverflow)
            if (isOverflow) updateArrowsState(container)
        }
        updateVisibility()
        const observer = new ResizeObserver(updateVisibility)
        observer.observe(container)
        return () => observer.disconnect()
    }, [showArrows])

    return (
        <footer className={className} {...props}>
            <FooterTerminal
                className={cn(
                    "flex items-start justify-start",
                    "w-full h-fit overflow-hidden",
                    linksOpen ? "max-h-100" : "max-h-0"
                )}
            />
            <div className={cn("flex items-end justify-start", "gap-2 w-full h-fit")}>
                <div
                    className={cn(
                        "flex flex-col items-start justify-end gap-1",
                        "flex-1 h-fit overflow-hidden"
                    )}
                >
                    <div
                        className={cn(
                            "hidden sm:flex items-center justify-start",
                            "w-full h-fit gap-2"
                        )}
                    >
                        <span className="h-6 w-2 bg-amber-400"></span>
                        <span
                            className={cn("flex items-center justify-start", "w-fit h-fit gap-1")}
                        >
                            <GitBranch className="text-amber-400" size={12} />
                            <p
                                className={cn(
                                    "text-amber-400 text-base text-nowrap",
                                    "select-none pointer-events-none"
                                )}
                            >
                                main
                            </p>
                        </span>
                    </div>
                    <div className={cn("flex items-center justify-start", "w-full h-fit gap-1")}>
                        {showArrows && (
                            <ArrowButton
                                onClick={() => {
                                    const container = containerRef.current
                                    if (!container) return

                                    onScrollLeft(container)
                                    updateArrowsState(container)
                                }}
                                active={leftArrowActive}
                            >
                                &lt;
                            </ArrowButton>
                        )}
                        <div
                            ref={containerRef}
                            className={cn(
                                "flex items-center justify-start",
                                "flex-1 h-fit overflow-hidden"
                            )}
                        >
                            {ROUTES.map((nav, index) => {
                                return (
                                    <FooterNavButton
                                        button={nav}
                                        key={index}
                                        active={nav.path === basePath}
                                        onClick={() => router.push(nav.path)}
                                        className={
                                            nav.path === basePath
                                                ? "bg-teal-400 text-gray-950"
                                                : "bg-transparent text-gray-400"
                                        }
                                    />
                                )
                            })}
                        </div>
                        {showArrows && (
                            <ArrowButton
                                onClick={() => {
                                    const container = containerRef.current
                                    if (!container) return

                                    onScrollRight(container)
                                    updateArrowsState(container)
                                }}
                                active={rightArrowActive}
                            >
                                &gt;
                            </ArrowButton>
                        )}
                    </div>
                </div>
                <div className={cn("sm:hidden flex items-center justify-center", "w-fit h-fit")}>
                    <button
                        onClick={() => setLinksOpen((prev) => !prev)}
                        className={cn(
                            "flex items-center justify-center",
                            "text-nowrap select-none cursor-pointer",
                            "h-6 w-fit px-2",
                            linksOpen ? "bg-teal-400" : "bg-gray-400"
                        )}
                    >
                        {linksOpen ? (
                            <Globe className="text-gray-950" size={14} />
                        ) : (
                            <GlobeOff className="text-gray-950" size={14} />
                        )}
                    </button>
                </div>
                <div
                    className={cn(
                        "hidden sm:flex flex-col items-end justify-end",
                        "w-fit h-fit overflow-hidden gap-1"
                    )}
                >
                    <div
                        className={cn(
                            "flex flex-col items-center justify-end",
                            "w-fit h-fit gap-1"
                        )}
                    >
                        <p
                            className={cn(
                                "text-gray-400 text-base text-nowrap",
                                "select-none pointer-events-none"
                            )}
                        >
                            -- {!linksOpen ? "SHOW" : "HIDE"} --
                        </p>
                        <button
                            onClick={() => setLinksOpen((prev) => !prev)}
                            className={cn(
                                "text-gray-950 text-base bg-teal-400",
                                "px-3 h-6 w-fit min-w-full",
                                "cursor-pointer select-none"
                            )}
                        >
                            connections
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}
