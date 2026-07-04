"use client"

import { cn } from "../../lib/utils"
import { HTMLAttributes, useEffect, useReducer, useState } from "react"
import Header from "../header/header"
import Footer from "../footer/footer"
import WindowButton from "../header/window-button"
import { WindowButtonIcon } from "../header/props"
import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { historyReducer } from "./props"

export default function Window({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
    const router = useRouter()
    const pathname = usePathname()
    const [state, dispatch] = useReducer(historyReducer, {
        history: [],
        index: -1,
    })
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    useEffect(() => {
        dispatch({
            type: "PUSH",
            pathname,
        })
    }, [pathname])

    const handleBack = () => {
        dispatch({ type: "BACK" })
        const path = state.history[state.index - 1]
        if (path) router.push(path)
    }
    const handleForward = () => {
        dispatch({ type: "FORWARD" })
        const path = state.history[state.index + 1]
        if (path) router.push(path)
    }
    const handleRefresh = () => {
        setIsRefreshing(true)
        router.refresh()
        setTimeout(() => {
            setIsRefreshing(false)
        }, 1000)
    }
    return (
        <section
            className={cn(
                "flex flex-col items-center justify-center",
                "w-full h-full sm:rounded-2xl overflow-hidden",
                "sm:max-w-6xl sm:max-h-200",
                "z-100 p-2 backdrop-blur-md scrollbar-none",
                className
            )}
            {...props}
        >
            <Header
                title="NHTerm"
                user="falhnf"
                device="NAUFAL-HANIF"
                className={cn("flex items-center justify-center", "w-full h-fit px-1 gap-2 mb-1")}
            >
                <div
                    className={cn(
                        "flex items-center justify-end",
                        "flex-1 min-w-0 max-w-35 h-full gap-2",
                        "text-gray-200 overflow-hidden"
                    )}
                >
                    <WindowButton
                        active={state.index > 0}
                        button={
                            new WindowButtonIcon({
                                icon: ArrowLeft,
                                props: {
                                    size: 14,
                                    className: cn(
                                        "group-active:text-gray-400",
                                        "transition duration-100 ease-out"
                                    ),
                                },
                            })
                        }
                        onClick={handleBack}
                        className={cn("group flex items-center justify-center")}
                    />
                    <WindowButton
                        active={state.index < state.history.length - 1}
                        button={
                            new WindowButtonIcon({
                                icon: ArrowRight,
                                props: {
                                    size: 14,
                                    className: cn(
                                        "group-active:text-gray-400",
                                        "transition duration-100 ease-out"
                                    ),
                                },
                            })
                        }
                        onClick={handleForward}
                        className={cn("group flex items-center justify-center")}
                    />
                    <WindowButton
                        active={!isRefreshing}
                        button={
                            new WindowButtonIcon({
                                icon: RefreshCw,
                                props: {
                                    size: 14,
                                    className: cn(
                                        "group-active:text-gray-400",
                                        "transition duration-100 ease-out",
                                        isRefreshing && "animate-spin"
                                    ),
                                },
                            })
                        }
                        onClick={handleRefresh}
                        className={cn("group flex items-center justify-center")}
                    />
                </div>
            </Header>
            <main
                className={cn(
                    "flex items-center justify-center",
                    "w-full px-1 py-2 flex-1 overflow-hidden"
                )}
            >
                {children}
            </main>
            <Footer
                className={cn(
                    "flex flex-col items-end justify-start",
                    "w-full h-fit px-1 gap-2 mb-1"
                )}
            />
        </section>
    )
}
