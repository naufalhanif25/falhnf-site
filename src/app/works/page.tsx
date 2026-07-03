"use client"

import { cn } from "../lib/utils"
import { useState, useEffect, useRef } from "react"
import { handleMouseDown, updateScrollbar } from "../components/repos/utils"
import PageLayout from "../components/page-layout"
import Scrollbar from "../components/scrollbar"
import { WorksRes } from "../api/works/props"
import WorkBox from "../components/works/work-box"
import Loading from "../components/loading"

export default function WorksPage() {
    const [showScrollbar, setShowScrollbar] = useState(false)
    const [updateTrigger, setUpdateTrigger] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLSpanElement>(null)
    const isDraggingRef = useRef<boolean>(false)
    const [works, setWorks] = useState<WorksRes | null>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/works")
                const data = (await res.json()) as WorksRes

                setWorks(data)
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
            deps={[works]}
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
                {works ? (
                    works.total > 0 ? (
                        <div
                            className={cn(
                                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                                "w-fit h-fit gap-1"
                            )}
                        >
                            {works.works.map((work, index) => {
                                return (
                                    <WorkBox
                                        key={index}
                                        work={work}
                                        className={cn(
                                            "w-full px-3 py-2 gap-2",
                                            "bg-gray-700/50 rounded-lg overflow-hidden"
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
                                    "text-base text-gray-400 text-center",
                                    "select-none pointer-events-none max-w-full"
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
            {works && showScrollbar && (
                <Scrollbar
                    ref={scrollbarRef}
                    className="w-fit h-full shrink-0"
                    onMouseDown={() => handleMouseDown(isDraggingRef)}
                />
            )}
        </PageLayout>
    )
}
