"use client"

import { cn } from "@/app/lib/utils"
import { updateScrollbar, handleMouseDown } from "@/app/components/repos/utils"
import { useEffect, useState, useRef } from "react"
import { PostContentRes } from "@/app/api/posts/props"
import Loading from "@/app/components/loading"
import PageLayout from "@/app/components/page-layout"
import Scrollbar from "@/app/components/scrollbar"
import { useParams } from "next/navigation"
import Markdown from "@/app/components/posts/markdown"
import { Clock, PencilLine } from "lucide-react"
import ErrorOverlay from "@/app/components/error-overlay"

export default function PostPage() {
    const params = useParams()
    const [showScrollbar, setShowScrollbar] = useState(false)
    const [updateTrigger, setUpdateTrigger] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLSpanElement>(null)
    const isDraggingRef = useRef<boolean>(false)
    const [content, setContent] = useState<PostContentRes | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = params.id
                const res = await fetch(`/api/posts/content?id=${id}`)
                const data = (await res.json()) as PostContentRes

                setContent(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [params.id])

    return (
        <PageLayout
            containerRef={containerRef}
            scrollbarRef={scrollbarRef}
            isDraggingRef={isDraggingRef}
            deps={[content]}
            trigger={updateTrigger}
            setTrigger={setUpdateTrigger}
            onTrigger={(state) => setShowScrollbar(state)}
            className={cn("flex items-start justify-start", "w-full h-full overflow-hidden gap-2")}
        >
            <div
                ref={containerRef}
                onScroll={() => updateScrollbar(containerRef.current, scrollbarRef.current)}
                className={cn(
                    "flex flex-col items-start justify-start",
                    "flex-1 h-full overflow-y-auto scrollbar-none gap-1"
                )}
            >
                {content ? (
                    content.title ? (
                        <div
                            className={cn(
                                "flex flex-col items-start justify-start",
                                "flex-1 w-fit gap-2"
                            )}
                        >
                            <div
                                className={cn(
                                    "flex flex-col items-center justify-center",
                                    "w-full min-h-32 h-fit p-6 gap-2",
                                    "bg-gray-700/50 rounded-lg overflow-hidden"
                                )}
                            >
                                <h1
                                    className={cn(
                                        "text-gray-200 text-base text-center",
                                        "max-w-100 select-none pointer-events-none"
                                    )}
                                >
                                    {content.title}
                                </h1>
                                <div
                                    className={cn(
                                        "flex items-center justify-center flex-wrap",
                                        "w-fit max-w-full h-fit gap-x-6 gap-y-1"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "flex items-center justify-center",
                                            "w-fit h-fit gap-2"
                                        )}
                                    >
                                        <PencilLine className="text-teal-400" size={12} />
                                        <h4
                                            className={cn(
                                                "text-sm text-nowrap text-teal-400",
                                                "select-none pointer-events-none"
                                            )}
                                        >
                                            {content.publishedAt}
                                        </h4>
                                    </span>
                                    <span
                                        className={cn(
                                            "flex items-center justify-center",
                                            "w-fit h-fit gap-2"
                                        )}
                                    >
                                        <Clock className="text-amber-400" size={12} />
                                        <h4
                                            className={cn(
                                                "text-sm text-nowrap text-amber-400",
                                                "select-none pointer-events-none"
                                            )}
                                        >
                                            {content.readingTime.minutes} min read
                                        </h4>
                                    </span>
                                </div>
                            </div>
                            <div
                                className={cn(
                                    "flex flex-col items-start justify-start",
                                    "flex-1 h-fit gap-2 select-none py-1"
                                )}
                            >
                                <Markdown>{content.content}</Markdown>
                            </div>
                        </div>
                    ) : (
                        <ErrorOverlay
                            className="w-full h-full gap-6"
                            status={404}
                            short="Post Not Found"
                            message="The requested post could not be found"
                        />
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
