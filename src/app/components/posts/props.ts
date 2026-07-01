import { HTMLAttributes } from "react"
import { PostProps } from "@/app/api/posts/props"
import { CSSProperties } from "react"

export const THEME: { [key: string]: CSSProperties } = {
    'pre[class*="language-"]': {
        background: "transparent",
        color: "var(--color-gray-200)",
        fontSize: "14px",
    },
    keyword: {
        color: "var(--color-red-400)",
    },
    regex: {
        color: "var(--color-teal-400)",
    },
    constant: {
        color: "var(--color-amber-400)",
    },
    namespace: {
        color: "var(--color-orange-400)",
    },
    string: {
        color: "var(--color-emerald-400)",
    },
    char: {
        color: "var(--color-emerald-400)",
    },
    comment: {
        color: "var(--color-gray-400)",
    },
    function: {
        color: "var(--color-amber-400)",
    },
    punctuation: {
        color: "var(--color-gray-400)",
    },
    number: {
        color: "var(--color-teal-400)",
    },
    boolean: {
        color: "var(--color-fuchsia-400)",
    },
    operator: {
        color: "var(--color-gray-400)",
    },
    doctype: {
        color: "var(--color-red-400)",
    },
    tag: {
        color: "var(--color-red-400)",
    },
    builtin: {
        color: "var(--color-orange-400)",
    },
    "class-name": {
        color: "var(--color-orange-400)",
    },
}

export interface PostBoxProps extends HTMLAttributes<HTMLDivElement> {
    post: PostProps
    onClick: () => void
}
