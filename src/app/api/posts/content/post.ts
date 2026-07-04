import fs from "fs/promises"
import path from "path"
import { PostData } from "../props"

export default async function getPost(id: string) {
    const posts = await fs.readFile(
        path.join(process.cwd(), "public", "posts", "posts.json"),
        "utf-8"
    )
    const postlist = JSON.parse(posts) as PostData[]

    return postlist
        .map((post) => ({
            id: path.basename(post.source).replaceAll(/[ _]/g, "-").split(".")[0],
            ...post,
        }))
        .find((data) => data.id === id)
}
