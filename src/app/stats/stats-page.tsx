"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "../lib/utils"
import { LangRes } from "../api/stats/props"
import Loading from "../components/loading"
import Scrollbar from "../components/scrollbar"
import Terminal from "../components/terminal"
import StatBox from "../components/stats/stat-box"
import { updateScrollbar, handleMouseDown } from "../components/repos/utils"
import PageLayout from "../components/page-layout"
import { TERMDATA } from "../components/stats/props"

export default function StatsPage() {
    const [langPercentages, setLangPercentages] = useState<LangRes | null>(null)
    const [showScrollbar, setShowScrollbar] = useState(false)
    const [updateTrigger, setUpdateTrigger] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLSpanElement>(null)
    const isDraggingRef = useRef<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/stats")
                const data = await res.json()

                if (!data) return

                setLangPercentages(data as LangRes)
                setUpdateTrigger((prev) => !prev)
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
            className={cn(
                "flex flex-col items-start justify-start",
                "w-full h-full overflow-hidden gap-2"
            )}
        >
            <div
                className={cn(
                    "flex items-start justify-start",
                    "w-full flex-1 overflow-hidden gap-2"
                )}
            >
                <div
                    ref={containerRef}
                    onScroll={() => updateScrollbar(containerRef.current, scrollbarRef.current)}
                    className={cn(
                        "flex flex-col items-start justify-start",
                        "flex-1 h-full overflow-y-auto scrollbar-none gap-1"
                    )}
                >
                    {!langPercentages && (
                        <div
                            className={cn(
                                "flex flex-col items-center justify-center",
                                "w-full h-fit px-2 py-8 overflow-hidden"
                            )}
                        >
                            <Loading
                                className={cn(
                                    "gap-2 w-fit h-fit",
                                    "select-none pointer-events-none"
                                )}
                            />
                        </div>
                    )}
                    {langPercentages?.langs.map((lang, index) => {
                        return (
                            <StatBox
                                key={index}
                                percentage={lang}
                                className={cn(
                                    "flex items-center justify-start",
                                    "rounded-md bg-gray-700/50"
                                )}
                            />
                        )
                    })}
                </div>
                {langPercentages && showScrollbar && (
                    <Scrollbar
                        ref={scrollbarRef}
                        className="w-fit h-full shrink-0"
                        onMouseDown={() => handleMouseDown(isDraggingRef)}
                    />
                )}
            </div>
            {langPercentages && (
                <Terminal
                    command="cat summary.txt"
                    className="w-full h-fit px-3 py-2 gap-1 overflow-hidden"
                >
                    {TERMDATA.map((data, index) => {
                        return (
                            <h5
                                key={index}
                                className={cn(
                                    "flex items-start justify-start",
                                    "w-full overflow-hidden"
                                )}
                            >
                                <p className="w-6 text-gray-400 truncate shrink-0 pointer-events-none">
                                    {index + 1}
                                </p>
                                <span
                                    className={cn(
                                        "flex items-center justify-start flex-wrap",
                                        "flex-1 h-fit overflow-hidden"
                                    )}
                                >
                                    <p className="max-w-36 min-w-32 flex-1 truncate pointer-events-none">
                                        [
                                        <ins className="no-underline text-teal-400">
                                            {data.name}
                                        </ins>
                                        ]
                                    </p>
                                    <ins className="no-underline flex-1 overflow-hidden min-w-30">
                                        {data.content(langPercentages.stats)}
                                    </ins>
                                </span>
                            </h5>
                        )
                    })}
                </Terminal>
            )}
        </PageLayout>
    )
}
