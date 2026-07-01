"use client"

import { cn } from "./lib/utils"
import ErrorOverlay from "./components/error-overlay"

export default function NotFound() {
    return (
        <div className={cn("flex items-center justify-center", "w-full p-2 grow overflow-hidden")}>
            <ErrorOverlay
                className="w-fit h-fit gap-6"
                status={404}
                short="Page Not Found"
                message="The requested page could not be found"
            />
        </div>
    )
}
