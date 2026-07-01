import type { Metadata } from "next"
import { Fira_Code, Fira_Mono } from "next/font/google"
import { cn } from "./lib/utils"
import Image from "next/image"
import "./globals.css"
import Window from "./components/window/window"

const firaCode = Fira_Code({
    variable: "--font-fira-code",
    subsets: ["latin"],
})

const firaMono = Fira_Mono({
    variable: "--font-fira-mono",
    weight: "400",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Naufal Hanif",
    description:
        "Portfolio of Naufal Hanif, an Informatics undergraduate at Syiah Kuala University " +
        "passionate about software engineering, systems programming, web development, " +
        "and artificial intelligence.",
    keywords: [
        "Naufal Hanif",
        "Falhnf",
        "Software Engineer",
        "Software Developer",
        "Computer Science",
        "Informatics",
        "Syiah Kuala University",
        "Systems Programming",
        "Web Development",
        "Backend Development",
        "Frontend Development",
        "Full Stack Developer",
        "Artificial Intelligence",
        "Machine Learning",
        "Portfolio",
    ],
    icons: "/icon.ico",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={cn(
                `${firaCode.variable} ${firaMono.variable}`,
                "h-full antialiased",
                "overflow-hidden sm:overflow-y-auto overscroll-none"
            )}
        >
            <body
                className={cn(
                    "flex flex-col items-center justify-center",
                    "w-dwv min-h-120 h-screen max-h-dvh",
                    "sm:p-6 bg-gray-800 relative",
                    "transition-[padding] duration-200"
                )}
            >
                <Image
                    src="/bg.jpg"
                    alt="Background Image"
                    fill
                    priority
                    quality={75}
                    className={cn(
                        "brightness-50 select-none pointer-events-none",
                        "fixed object-cover h-full w-full"
                    )}
                />
                <Window className="bg-gray-950/80 border-gray-900/80 border-2">{children}</Window>
            </body>
        </html>
    )
}
