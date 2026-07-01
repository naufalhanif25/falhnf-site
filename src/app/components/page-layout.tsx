"use client"

import { useEffect, RefObject, SetStateAction, Dispatch, DependencyList } from "react"
import { getScrollArea, updateScrollbar, handleMouseMove, handleMouseUp } from "./repos/utils"
import { HTMLAttributes } from "react"

interface PageLayoutProps extends HTMLAttributes<HTMLDivElement> {
    containerRef: RefObject<HTMLDivElement | null>
    scrollbarRef: RefObject<HTMLSpanElement | null>
    isDraggingRef: RefObject<boolean>
    trigger: boolean
    setTrigger: Dispatch<SetStateAction<boolean>>
    onTrigger?: (state: boolean) => void
    children?: React.ReactNode
    deps: DependencyList
}

export default function PageLayout({
    className,
    containerRef,
    scrollbarRef,
    isDraggingRef,
    deps,
    onTrigger,
    trigger,
    setTrigger,
    children,
    ...props
}: PageLayoutProps) {
    useEffect(() => {
        const container = containerRef.current

        if (!container) return

        const update = () => {
            setTrigger((prev) => !prev)
        }
        update()
        const observer = new ResizeObserver(update)
        observer.observe(container)
        return () => observer.disconnect()
    }, [containerRef, setTrigger])

    useEffect(() => {
        const container = containerRef.current
        const scrollbar = scrollbarRef.current

        if (!container) return

        getScrollArea(container, scrollbar)
        updateScrollbar(container, scrollbar)
        onTrigger?.(container.scrollHeight > container.clientHeight)
    }, [trigger, containerRef, scrollbarRef, onTrigger, deps])

    useEffect(() => {
        window.addEventListener("mousemove", (event) =>
            handleMouseMove(
                event,
                containerRef.current,
                scrollbarRef.current,
                isDraggingRef.current
            )
        )
        window.addEventListener("mouseup", () => handleMouseUp(isDraggingRef))

        return () => {
            window.removeEventListener("mousemove", (event) =>
                handleMouseMove(
                    event,
                    containerRef!.current,
                    scrollbarRef!.current,
                    isDraggingRef!.current
                )
            )
            window.removeEventListener("mouseup", () => handleMouseUp(isDraggingRef))
        }
    }, [containerRef, scrollbarRef, isDraggingRef])

    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
}
