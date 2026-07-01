import { RefObject } from "react"
import { HTMLAttributes } from "react"
import { RepoResData } from "@/app/api/repos/props"

export interface RepoData extends HTMLAttributes<HTMLDivElement> {
    repo: RepoResData
}

export function getScrollArea(container: HTMLDivElement | null, scrollbar: HTMLSpanElement | null) {
    if (container) {
        const { clientHeight, scrollHeight } = container

        if (scrollbar) {
            const scrollbarNewHeight = clientHeight - (scrollHeight / clientHeight) * 100
            scrollbar.style.height = `${scrollbarNewHeight}px`
        }
    }
}

export function handleMouseMove(
    event: MouseEvent,
    container: HTMLDivElement | null,
    scrollbar: HTMLSpanElement | null,
    isDragging: boolean
) {
    if (!isDragging || !container || !scrollbar) return

    const trackHeight = container.clientHeight
    const thumbHeight = scrollbar.offsetHeight
    const trackRect = scrollbar.parentElement?.getBoundingClientRect()

    if (!trackRect) return

    const mouseY = event.clientY - trackRect.top
    const thumbTop = Math.max(0, Math.min(mouseY - thumbHeight / 2, trackHeight - thumbHeight))
    const progress = thumbTop / (trackHeight - thumbHeight)
    container.scrollTop = progress * (container.scrollHeight - container.clientHeight)
}

export function updateScrollbar(
    container: HTMLDivElement | null,
    scrollbar: HTMLSpanElement | null
) {
    if (!container || !scrollbar) return

    const { scrollTop, scrollHeight, clientHeight } = container
    const thumbHeight = (clientHeight / scrollHeight) * clientHeight
    const progress = scrollTop / (scrollHeight - clientHeight)
    const thumbTop = progress * (clientHeight - thumbHeight)

    scrollbar.style.height = `${thumbHeight}px`
    scrollbar.style.transform = `translateY(${thumbTop}px)`
}

export function checkLoadingVisible(
    container: HTMLDivElement | null,
    loading: HTMLDivElement | null,
    onVisible: (isVisible: boolean) => void
) {
    if (!container || !loading) return

    const containerRect = container.getBoundingClientRect()
    const loadingRect = loading.getBoundingClientRect()
    const isVisible =
        loadingRect.top < containerRect.bottom && loadingRect.bottom > containerRect.top

    onVisible(isVisible)
}

export function handleMouseDown(ref: RefObject<boolean>) {
    ref.current = true
}

export function handleMouseUp(ref: RefObject<boolean>) {
    ref.current = false
}
