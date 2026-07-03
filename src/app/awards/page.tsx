"use client"

import { cn } from "../lib/utils"
import { handleMouseDown, updateScrollbar } from "../components/repos/utils"
import { useState, useRef, useEffect } from "react"
import Scrollbar from "../components/scrollbar"
import Loading from "../components/loading"
import PageLayout from "../components/page-layout"
import { AwardsRes } from "../api/awards/props"
import AwardBox from "../components/awards/award-box"

export default function AwardsPage() {
    const [showScrollbar, setShowScrollbar] = useState(false)
    const [updateTrigger, setUpdateTrigger] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLSpanElement>(null)
    const isDraggingRef = useRef<boolean>(false)
    const [awards, setAwards] = useState<AwardsRes | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/awards")
                const data = (await res.json()) as AwardsRes

                setAwards(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [])

    return (
        <PageLayout
            containerRef={containerRef}
            scrollbarRef={scrollbarRef}
            isDraggingRef={isDraggingRef}
            deps={[]}
            trigger={updateTrigger}
            setTrigger={setUpdateTrigger}
            onTrigger={(state) => setShowScrollbar(state)}
            className={cn("flex items-start justify-start", "w-full h-full overflow-hidden gap-2")}
        >
            <div
                ref={containerRef}
                onScroll={() => updateScrollbar(containerRef.current, scrollbarRef.current)}
                className={cn(
                    "flex flex-col items-center justify-start",
                    "flex-1 h-full overflow-y-auto scrollbar-none gap-1"
                )}
            >
                {awards ? (
                    awards.total > 0 ? (
                        <div
                            className={cn(
                                "flex flex-col items-start justify-start",
                                "w-full h-fit gap-1"
                            )}
                        >
                            {awards.awards.map((award, index) => {
                                return (
                                    <AwardBox
                                        key={index}
                                        award={award}
                                        className={cn(
                                            "w-full h-fit px-3 py-2 gap-2",
                                            "rounded-lg bg-gray-700/50 overflow-hidden"
                                        )}
                                    />
                                )
                            })}
                        </div>
                    ) : (
                        <div
                            className={cn(
                                "flex flex-col items-center justify-center",
                                "w-full h-fit px-2 py-8 overflow-hidden"
                            )}
                        >
                            <h4
                                className={cn(
                                    "text-gray-400 text-base text-nowrap",
                                    "select-none pointer-events-none"
                                )}
                            >
                                -- No works found --
                            </h4>
                        </div>
                    )
                ) : (
                    <div
                        className={cn(
                            "flex flex-col items-center justify-center",
                            "w-full h-fit px-2 py-8 overflow-hidden"
                        )}
                    >
                        <Loading
                            className={cn("gap-2 w-fit h-fit", "select-none pointer-events-none")}
                        />
                    </div>
                )}
            </div>
            {awards && showScrollbar && (
                <Scrollbar
                    ref={scrollbarRef}
                    className="w-fit h-full"
                    onMouseDown={() => handleMouseDown(isDraggingRef)}
                />
            )}
        </PageLayout>
    )
}
