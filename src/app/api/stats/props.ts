export interface LangStatProps {
    bytes: number
    repos: number
}

export class LangStat {
    public bytes: number
    public repos: number

    constructor({ ...params }: LangStatProps) {
        this.bytes = params.bytes
        this.repos = params.repos
    }
}

export interface LangPercentage {
    language: string
    percentage: number
}

export interface LangStats {
    lastCommit: string
    repos: number
    langs: number
    contribs: number
}

export interface LangResProps {
    totalSize: number
    stats: LangStats
    langs: LangPercentage[]
}

export class LangRes {
    public totalSize: number
    public stats: LangStats
    public langs: LangPercentage[]

    constructor({ ...params }: LangResProps) {
        this.totalSize = params.totalSize
        this.stats = params.stats
        this.langs = params.langs
    }
}