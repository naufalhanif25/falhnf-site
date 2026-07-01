"use server"

import { NextResponse, NextRequest } from "next/server"
import { format } from "date-fns"
import { RepoResData, RepoResDataProps } from "@/app/api/repos/props"

export async function GET(req: NextRequest) {
    try {
        const cursor = req.nextUrl.searchParams.get("cursor")
        const query = `
            query($cursor: String, $username: String!) {
                user(login: $username) {
                    repositories(
                        ownerAffiliations: OWNER
                        privacy: PUBLIC
                        first: 30
                        after: $cursor
                        orderBy: {
                            field: PUSHED_AT
                            direction: DESC
                        }
                    ) {
                        nodes {
                            name
                            description
                            url
                            pushedAt
                            primaryLanguage {
                                name
                            }
                        }
                        pageInfo {
                            hasNextPage
                            endCursor
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
                variables: {
                    cursor: cursor || null,
                    username: process.env.GH_USERNAME,
                },
            }),
            cache: "force-cache",
        })
        const result = await res.json()

        if (result.errors) {
            return NextResponse.json({ error: result.errors }, { status: 500 })
        }
        const repos = result.data.user.repositories.nodes.map(
            (repo: RepoResDataProps) =>
                new RepoResData({
                    name: repo.name,
                    description: repo.description,
                    primaryLanguage: repo.primaryLanguage,
                    url: repo.url,
                    pushedAt: format(Date.parse(repo.pushedAt), "dd MMM yyyy, HH:mm"),
                })
        )
        const pageInfo = result.data.user.repositories.pageInfo

        return NextResponse.json({
            size: repos.length,
            repos,
            pageInfo,
        })
    } catch (err) {
        console.error(err)

        return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 })
    }
}
