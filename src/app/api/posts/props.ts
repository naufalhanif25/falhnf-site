export interface PostData {
    title: string
    description: string
    publishedAt: string
    source: string
}

export interface PostProps extends PostData {
    id: string
}

export interface PostsRes {
    posts: PostProps[]
    total: number
}

export interface PostContentRes {
    id: string
    title: string
    publishedAt: string
    content: string
}
