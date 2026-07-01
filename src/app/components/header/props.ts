import { LucideIcon, LucideProps } from "lucide-react"
import { HTMLAttributes } from "react"

export interface NameProps extends HTMLAttributes<HTMLDivElement> {
    name: string
}

export interface RoutePathProps extends HTMLAttributes<HTMLDivElement> {
    path: string
    user: string
    device: string
}

export class WindowButtonIcon {
    public icon: LucideIcon
    public props: LucideProps

    constructor({ ...params }: { icon: LucideIcon; props: LucideProps }) {
        this.icon = params.icon
        this.props = params.props
    }
}

export interface WindowButtonData extends HTMLAttributes<HTMLButtonElement> {
    button: WindowButtonIcon
    active: boolean
}

export interface HeaderData extends HTMLAttributes<HTMLElement> {
    title: string
    user: string
    device: string
    children: React.ReactNode
}
