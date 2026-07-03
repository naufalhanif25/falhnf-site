"use client"

import { cn } from "./lib/utils"
import { useEffect, useState, useMemo, useRef } from "react"
import { updateScrollbar, handleMouseDown } from "./components/repos/utils"
import Scrollbar from "./components/scrollbar"
import Badges from "./components/home/badges"
import { EXPERTISE } from "./components/home/props"
import PageLayout from "./components/page-layout"

export default function Home() {
    const expertise = useMemo(() => EXPERTISE, [])
    const [showScrollbar, setShowScrollbar] = useState(false)
    const [displayExpertise, setDisplayExpertise] = useState<string>("")
    const [updateTrigger, setUpdateTrigger] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLSpanElement>(null)
    const isDraggingRef = useRef<boolean>(false)

    useEffect(() => {
        let expertiseIndex: number = 0
        let charIndex: number = 0
        let isDeleting: boolean = false
        let timeoutId: NodeJS.Timeout

        const animate = () => {
            const currentSkill = expertise[expertiseIndex]

            if (!isDeleting) {
                charIndex++
                setDisplayExpertise(currentSkill.slice(0, charIndex))

                if (charIndex === currentSkill.length) {
                    isDeleting = true
                    timeoutId = setTimeout(animate, 1500)
                    return
                }
                timeoutId = setTimeout(animate, 100)
            } else {
                charIndex--
                setDisplayExpertise(currentSkill.slice(0, charIndex))

                if (charIndex === 0) {
                    isDeleting = false
                    expertiseIndex = (expertiseIndex + 1) % expertise.length
                    timeoutId = setTimeout(animate, 500)
                    return
                }
                timeoutId = setTimeout(animate, 50)
            }
        }
        animate()
        return () => clearTimeout(timeoutId)
    }, [expertise])

    return (
        <PageLayout
            containerRef={containerRef}
            scrollbarRef={scrollbarRef}
            isDraggingRef={isDraggingRef}
            deps={[]}
            trigger={updateTrigger}
            setTrigger={setUpdateTrigger}
            onTrigger={(state) => setShowScrollbar(state)}
            className={cn("flex items-center justify-start", "w-full h-full overflow-hidden")}
        >
            <div
                ref={containerRef}
                onScroll={() => updateScrollbar(containerRef.current, scrollbarRef.current)}
                className={cn(
                    "flex items-start justify-center",
                    "w-full h-full overflow-y-auto scrollbar-none"
                )}
            >
                <div
                    className={cn(
                        "flex flex-col items-center justify-center",
                        "w-fit max-w-full min-h-full h-fit gap-8 py-4",
                        "overflow-hidden"
                    )}
                >
                    <span
                        className={cn(
                            "flex flex-col items-start justify-center",
                            "w-fit max-w-full h-fit",
                            "select-none overflow-hidden"
                        )}
                    >
                        <h4 className="text-base text-gray-400 text-nowrap">Hola, i am</h4>
                        <h2
                            className={cn(
                                "text-gray-200 text-[clamp(2rem,12vw,2.4rem)]",
                                "sm:text-5xl text-nowrap truncate max-w-full",
                                "leading-10 sm:leading-(--text-5xl--line-height)"
                            )}
                        >
                            Naufal Hanif
                        </h2>
                        <span
                            className={cn(
                                "flex items-center justify-start gap-2",
                                "text-nowrap text-teal-400 text-lg",
                                "max-w-full overflow-hidden w-fit"
                            )}
                        >
                            <p>&gt;</p>
                            <span
                                className={cn(
                                    "flex items-center justify-start",
                                    "w-fit max-w-full overflow-hidden"
                                )}
                            >
                                <p className="truncate">{displayExpertise}</p>
                                <p className="animate-cursor">|</p>
                            </span>
                        </span>
                    </span>
                    <span
                        className={cn(
                            "flex flex-col items-start justify-center",
                            "w-fit h-fit select-none"
                        )}
                    >
                        <p
                            className={cn(
                                "text-base text-gray-400 text-center",
                                "max-w-150 w-full"
                            )}
                        >
                            Informatics undergraduate at Syiah Kuala University with a strong focus
                            on software engineering, from low-level systems to artificial
                            intelligence.
                        </p>
                    </span>
                    <Badges
                        className={cn(
                            "flex flex-wrap sm:flex-nowrap items-center justify-center",
                            "w-fit h-fit gap-4"
                        )}
                    />
                </div>
            </div>
            {showScrollbar && (
                <Scrollbar
                    ref={scrollbarRef}
                    className="w-fit h-full shrink-0"
                    onMouseDown={() => handleMouseDown(isDraggingRef)}
                />
            )}
        </PageLayout>
    )
}
