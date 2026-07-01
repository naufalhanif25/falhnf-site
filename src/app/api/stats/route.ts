"use server"

import { NextResponse } from "next/server"
import { LangRes, LangStat } from "@/app/api/stats/props"
import { formatInTimeZone } from "date-fns-tz"

export async function GET() {
    try {
        const query = `
            query($username: String!) {
                user(login: $username) {
                    repositories(
                        ownerAffiliations: OWNER
                        privacy: PUBLIC
                        first: 100
                        orderBy: {
                            field: PUSHED_AT
                            direction: DESC
                        }
                    ) {
                        totalCount
                        nodes {
                            name
                            pushedAt
                            defaultBranchRef {
                                target {
                                    ... on Commit {
                                        committedDate
                                    }
                                }
                            }
                            languages(
                                first: 10
                                orderBy: {
                                    field: SIZE, 
                                    direction: DESC
                                }
                            ) {
                                edges {
                                    size
                                    node {
                                        name
                                    }
                                }
                            }
                        }
                    }
                    contributionsCollection {
                        contributionCalendar {
                            totalContributions
                        }
                    }
                }
            }
        `
        const res = await fetch(process.env.GH_API_URL!, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.GH_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                variables: { username: process.env.GH_USERNAME },
            }),
            cache: "force-cache",
        })
        const result = await res.json()

        if (result.errors) {
            return NextResponse.json({ error: result.errors }, { status: 500 })
        }
        const repos = result.data.user.repositories.nodes
        const lastCommit = repos[0]?.defaultBranchRef?.target?.committedDate ?? repos[0]?.pushedAt
        const repoCount = result.data.user.repositories.totalCount
        const contributionCount =
            result.data.user.contributionsCollection.contributionCalendar.totalContributions
        const langs = new Map<string, LangStat>()
        let totalSize = 0

        for (const repo of repos) {
            for (const edge of repo.languages.edges) {
                const lang = edge.node.name
                const size = edge.size
                const current = langs.get(lang)

                if (current) {
                    current.bytes += size
                    current.repos += 1
                } else {
                    langs.set(
                        lang,
                        new LangStat({
                            bytes: size,
                            repos: 1,
                        })
                    )
                }
                totalSize += size
            }
        }
        const rankings = [...langs.entries()].map(([language, stat]) => ({
            language,
            score: Math.pow(stat.bytes, 0.5) * Math.pow(stat.repos, 0.5),
        }))
        const totalScore = rankings.reduce((sum, lang) => sum + lang.score, 0)
        const percentages = rankings
            .map((lang) => ({
                language: lang.language,
                percentage: Number(((lang.score / totalScore) * 100).toFixed(2)),
            }))
            .sort((a, b) => b.percentage - a.percentage)

        return NextResponse.json(
            new LangRes({
                totalSize,
                stats: {
                    lastCommit: formatInTimeZone(
                        Date.parse(lastCommit),
                        "Asia/Jakarta",
                        "dd MMM yyyy, HH:mm"
                    ),
                    repos: repoCount,
                    langs: langs.size,
                    contribs: contributionCount,
                },
                langs: percentages,
            })
        )
    } catch (err) {
        console.error(err)

        return NextResponse.json({ error: "Failed to fetch GitHub statistics" }, { status: 500 })
    }
}
