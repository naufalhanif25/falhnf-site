"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { cn } from "../lib/utils"
import Loading from "../components/loading"
import RepoBox from "../components/repos/repo-box"
import Scrollbar from "../components/scrollbar"
import { updateScrollbar, checkLoadingVisible, handleMouseDown } from "../components/repos/utils"
import { RepoRes, RepoResData } from "../api/repos/props"
import PageLayout from "../components/page-layout"

export default function ProjectsPage() {
    const [repos, setRepos] = useState<RepoResData[]>([])
    const cursorRef = useRef<string | null>(null)
    const [endOfRepo, setEndOfRepo] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showScrollbar, setShowScrollbar] = useState(false)
    const [updateTrigger, setUpdateTrigger] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLSpanElement>(null)
    const loadingRef = useRef<HTMLDivElement>(null)
    const isDraggingRef = useRef<boolean>(false)
    const pendingRef = useRef(false)
    const controllerRef = useRef<AbortController | null>(null)

    const fetchData = useCallback(async () => {
        if (pendingRef.current || endOfRepo) return

        pendingRef.current = true
        controllerRef.current?.abort()
        const controller = new AbortController()
        controllerRef.current = controller

        try {
            const res = await fetch(`/api/repos?cursor=${cursorRef.current || ""}`, {
                signal: controller.signal,
            })
            const repos = (await res.json()) as RepoRes

            cursorRef.current = repos.pageInfo.endCursor
            setRepos((prev) => [...prev, ...repos.repos])
            setEndOfRepo(!repos.pageInfo.hasNextPage)
            setUpdateTrigger((prev) => !prev)
        } catch (err) {
            if (!(err instanceof DOMException && err.name === "AbortError")) {
                console.error(err)
            }
        } finally {
            pendingRef.current = false
            setIsLoading(false)
        }
    }, [endOfRepo])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleScroll = () => {
        updateScrollbar(containerRef.current, scrollbarRef.current)

        if (!endOfRepo) {
            checkLoadingVisible(containerRef.current, loadingRef.current, (isVisible) => {
                if (isVisible && !isLoading) {
                    setIsLoading(true)
                    fetchData()
                }
            })
        }
    }
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
                onScroll={handleScroll}
                className={cn(
                    "flex flex-col items-start justify-start",
                    "flex-1 h-full overflow-y-auto scrollbar-none gap-1"
                )}
            >
                {repos.map((repo, index) => {
                    return (
                        <RepoBox
                            key={index}
                            repo={repo}
                            className={cn("w-full h-fit gap-1 p-2", "rounded-lg bg-gray-700/50")}
                        />
                    )
                })}
                <div
                    ref={loadingRef}
                    className={cn(
                        "flex flex-col items-center justify-center",
                        "w-full h-fit px-2 py-8 overflow-hidden"
                    )}
                >
                    {!endOfRepo ? (
                        (isLoading || repos.length === 0) && (
                            <Loading
                                className={cn(
                                    "gap-2 w-fit h-fit",
                                    "select-none pointer-events-none"
                                )}
                            />
                        )
                    ) : (
                        <h4
                            className={cn(
                                "text-base text-gray-400 text-center",
                                "select-none pointer-events-none max-w-full"
                            )}
                        >
                            -- No more repositories --
                        </h4>
                    )}
                </div>
            </div>
            {repos.length > 0 && showScrollbar && (
                <Scrollbar
                    ref={scrollbarRef}
                    className="w-fit h-full shrink-0"
                    onMouseDown={() => handleMouseDown(isDraggingRef)}
                />
            )}
        </PageLayout>
    )
}
