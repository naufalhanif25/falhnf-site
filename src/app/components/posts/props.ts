import { HTMLAttributes } from "react"
import { PostProps } from "@/app/api/posts/props"

export interface PostBoxProps extends HTMLAttributes<HTMLDivElement> {
    post: PostProps
    onClick: () => void
}
