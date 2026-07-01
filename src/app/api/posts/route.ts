"use server"

import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { PostProps, PostData } from "./props"

export async function GET() {
    try {
        const basepath = path.join(process.cwd(), "public", "posts")
        const filepath = path.join(basepath, "posts.json")
        const file = await fs.readFile(filepath, "utf8")
        const postlist = (JSON.parse(file) as PostData[]).sort(
            (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
        const posts: PostProps[] = postlist.map((post) => ({
            id: path.basename(post.source).replaceAll(/[ _]/g, "-").split(".")[0],
            ...post,
        }))
        return NextResponse.json({
            posts,
            total: posts.length,
        })
    } catch (err) {
        console.error(err)

        return NextResponse.json(
            {
                message: "Failed to retrieve posts",
            },
            { status: 500 }
        )
    }
}
