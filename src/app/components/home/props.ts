import { HTMLAttributes } from "react"

export interface BadgeDataProps extends HTMLAttributes<HTMLSpanElement> {
    name: string
    value: string | number | boolean | undefined
}

export class BadgeData {
    public name: string
    public value: string | number | boolean | undefined

    constructor({ ...params }: { name: string; value: string | number | boolean | undefined }) {
        this.name = params.name
        this.value = params.value
    }
}

export const BADGES: BadgeData[] = [
    new BadgeData({
        name: "Major",
        value: "Informatics",
    }),
    new BadgeData({
        name: "Year",
        value: "3rd",
    }),
    new BadgeData({
        name: "GPA",
        value: 3.71,
    }),
]

export const EXPERTISE = [
    "Web Development",
    "Android Development",
    "Systems Programming",
    "Game Development",
    "AI & Machine Learning",
]
