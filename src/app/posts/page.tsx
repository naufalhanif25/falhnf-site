"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "../lib/utils"
import { updateScrollbar, handleMouseDown } from "../components/repos/utils"
import PageLayout from "../components/page-layout"
import Scrollbar from "../components/scrollbar"
import Loading from "../components/loading"
import { PostsRes } from "../api/posts/props"
import { useRouter } from "next/navigation"
import PostBox from "../components/posts/post-box"

export default function PostsPage() {
    const router = useRouter()
    const [showScrollbar, setShowScrollbar] = useState(false)
    const [updateTrigger, setUpdateTrigger] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLSpanElement>(null)
    const isDraggingRef = useRef<boolean>(false)
    const [posts, setPosts] = useState<PostsRes | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/posts")
                const data = (await res.json()) as PostsRes

                setPosts(data)
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
            deps={[posts]}
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
                {posts ? (
                    posts.total > 0 ? (
                        <div
                            className={cn("grid grid-cols-1 md:grid-cols-2", "w-full h-fit gap-1")}
                        >
                            {posts.posts.map((post, index) => {
                                return (
                                    <PostBox
                                        key={index}
                                        className={cn(
                                            "w-full px-3 py-2 gap-2",
                                            "bg-gray-700/50 rounded-lg overflow-hidden"
                                        )}
                                        post={post}
                                        onClick={() => router.push(`/posts/${post.id}`)}
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
                                -- No posts found --
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
            {posts && showScrollbar && (
                <Scrollbar
                    ref={scrollbarRef}
                    className="w-fit h-full"
                    onMouseDown={() => handleMouseDown(isDraggingRef)}
                />
            )}
        </PageLayout>
    )
}
