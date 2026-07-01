"use client"

import { HTMLAttributes } from "react"
import { LangPercentage } from "@/app/api/stats/props"
import { LangStats } from "@/app/api/stats/props"

export interface StatBoxProps extends HTMLAttributes<HTMLDivElement> {
    percentage: LangPercentage
}

export class TermData {
    public name: string
    public content: (stats: LangStats) => React.ReactNode

    constructor({ ...params }: { name: string; content: (stats: LangStats) => React.ReactNode }) {
        this.name = params.name
        this.content = params.content
    }
}

export const TERMDATA: TermData[] = [
    new TermData({
        name: "Repositories",
        content: (stats) => {
            return <p className="flex-1 truncate text-nowrap">{stats.repos}</p>
        },
    }),
    new TermData({
        name: "Languages",
        content: (stats) => {
            return <p className="flex-1 truncate text-nowrap">{stats.langs}</p>
        },
    }),
    new TermData({
        name: "Contibutions",
        content: (stats) => {
            return <p className="flex-1 truncate text-nowrap">{stats.contribs}</p>
        },
    }),
    new TermData({
        name: "Last commit",
        content: (stats) => {
            return (
                <span className="flex-1 truncate text-nowrap">
                    <p className="sm:hidden">{stats.lastCommit.split(",")[0]}</p>
                    <p className="hidden sm:block">{stats.lastCommit}</p>
                </span>
            )
        },
    }),
]
