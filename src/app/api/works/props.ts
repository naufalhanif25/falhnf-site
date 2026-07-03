export interface WorkData {
    title: string
    description: string
    stack: string[]
    source?: {
        code?: string
        app?: string
    }
}

export interface WorksRes {
    works: WorkData[]
    total: number
}
