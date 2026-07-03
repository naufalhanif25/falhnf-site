import { HTMLAttributes } from "react"
import { AwardData } from "@/app/api/awards/props"

export interface AwardBoxProps extends HTMLAttributes<HTMLDivElement> {
    award: AwardData
}
