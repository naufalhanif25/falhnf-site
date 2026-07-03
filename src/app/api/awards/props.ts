export interface AwardData {
    title: string
    type: string
    issuer: string
    description: string
    date: string
    url?: string
}

export interface AwardsRes {
    awards: AwardData[]
    total: number
}