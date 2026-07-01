export interface RepoResDataProps {
    name: string
    description?: string
    url: string
    pushedAt: string
    primaryLanguage?: {
        name?: string
    }
}

export class RepoResData {
    public name: string
    public description?: string
    public url: string
    public pushedAt: string
    public language: string | null

    constructor({ ...params }: RepoResDataProps) {
        this.name = params.name
        this.description = params.description
        this.url = params.url
        this.pushedAt = params.pushedAt
        this.language = params.primaryLanguage?.name || null
    }
}

export interface RepoRes {
    size: number
    repos: RepoResData[]
    pageInfo: {
        hasNextPage: boolean
        endCursor: string | null
    }
}
