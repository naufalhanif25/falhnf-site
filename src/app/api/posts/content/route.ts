"use server"

import { NextResponse, NextRequest } from "next/server"
import fs from "fs/promises"
import path from "path"
import { PostData } from "../props"
import { estimateReadingTime } from "../props"

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id")

        if (!id) {
            return NextResponse.json(
                {
                    message: "Post ID is required",
                },
                { status: 400 }
            )
        }
        const basepath = path.join(process.cwd(), "public", "posts")
        const postpath = path.join(basepath, "contents")
        const posts = await fs.readFile(path.join(basepath, "posts.json"), "utf-8")
        const postlist = JSON.parse(posts) as PostData[]
        const post = postlist
            .map((post) => ({
                id: path.basename(post.source).replaceAll(/[ _]/g, "-").split(".")[0],
                ...post,
            }))
            .find((data) => data.id === id)
        const files = await fs.readdir(postpath)
        const target = files.find((f) => f.replaceAll(/[ _]/g, "-").split(".")[0] === id)

        if (!target) {
            return NextResponse.json(
                {
                    message: "Post not found",
                },
                { status: 400 }
            )
        }
        const filepath = path.join(postpath, target)
        const content = await fs.readFile(filepath, "utf-8")

        return NextResponse.json({
            id,
            title: post?.title,
            publishedAt: post?.publishedAt,
            readingTime: estimateReadingTime(content),
            content,
        })
    } catch (err) {
        console.error(err)

        return NextResponse.json(
            {
                message: "Failed to load post",
            },
            { status: 500 }
        )
    }
}
