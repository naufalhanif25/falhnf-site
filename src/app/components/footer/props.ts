import { HTMLAttributes } from "react"

export interface NavButtonData extends HTMLAttributes<HTMLButtonElement> {
    button: NavButton
    active: boolean
}

export interface NavButtonProps {
    title: string
    shortcut: string
    path: string
    isActive?: boolean
}

export class NavButton {
    public title: string
    public shortcut: string
    public path: string

    constructor({ ...params }: NavButtonProps) {
        this.title = params.title
        this.shortcut = params.shortcut
        this.path = params.path
    }
}

export const ROUTES = [
    new NavButton({
        title: "home",
        shortcut: "h",
        path: "/",
    }),
    new NavButton({
        title: "works",
        shortcut: "w",
        path: "/works",
    }),
    new NavButton({
        title: "repos",
        shortcut: "r",
        path: "/repos",
    }),
    new NavButton({
        title: "stats",
        shortcut: "s",
        path: "/stats",
    }),
    new NavButton({
        title: "awards",
        shortcut: "a",
        path: "/awards",
    }),
    new NavButton({
        title: "posts",
        shortcut: "p",
        path: "/posts",
    }),
]

export class Link {
    public name: string
    public href: string
    public value: string

    constructor({ ...params }: { name: string; href: string; value: string }) {
        this.name = params.name
        this.href = params.href
        this.value = params.value
    }
}

export const LINKS: Link[] = [
    new Link({
        name: "Email",
        href: "mailto:naufal.hanif2525@gmail.com",
        value: "naufal.hanif2525@gmail.com",
    }),
    new Link({
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/falhnf",
        value: "linkedin.com/in/falhnf",
    }),
    new Link({
        name: "Instagram",
        href: "https://www.instagram.com/fal.hnf?igsh=cWl6MWt0cDRqMWw5",
        value: "@fal.hnf",
    }),
    new Link({
        name: "WhatsApp",
        href: "https://api.whatsapp.com/send/?phone=6282181916822&text&type=phone_number&app_absent=0",
        value: "+62 821-8191-6822",
    }),
    new Link({
        name: "CV",
        href: "https://drive.google.com/file/d/1K-SoRapWF3WBmiaKBddnOZDjvXWmGBvs/view?usp=sharing",
        value: "CV - NAUFAL HANIF",
    }),
    new Link({
        name: "Github",
        href: "https://github.com/naufalhanif25",
        value: "naufalhanif25",
    }),
    new Link({
        name: "NPM",
        href: "https://www.npmjs.com/~naufalhanif",
        value: "naufalhanif",
    }),
]
