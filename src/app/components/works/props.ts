import { WorkData } from "@/app/api/works/props"
import { HTMLAttributes } from "react"

export interface WorkBoxProps extends HTMLAttributes<HTMLDivElement> {
    work: WorkData
}
