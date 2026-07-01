import { HTMLAttributes, RefObject } from "react"

export interface ScrollbarProps extends HTMLAttributes<HTMLSpanElement> {
    ref: RefObject<HTMLSpanElement | null>
}

export interface TerminalProps extends HTMLAttributes<HTMLDivElement> {
    command: string
}

export interface ErrorOverlayProps extends HTMLAttributes<HTMLDivElement> {
    status: number
    short: string
    message: string
}
