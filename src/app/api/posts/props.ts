export interface PostData {
    title: string
    description: string
    publishedAt: string
    keywords: string[]
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
    readingTime: {
        words: number
        minutes: number
    }
    content: string
}

export function estimateReadingTime(text: string, wordsPerMinute = 200) {
    const words = text.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)

    return {
        words,
        minutes,
    }
}