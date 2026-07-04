import PostsPage from "./posts-page"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Posts",
}

export default function Page() {
    return <PostsPage />
}
