import PostPage from "./post-page"
import { Metadata } from "next"
import getPost from "@/app/api/posts/content/post"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const { id } = await params
    const post = await getPost(id)

    return {
        title: post?.title ?? "Post Not Found",
        description: post?.description,
    }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return <PostPage id={id} />
}
