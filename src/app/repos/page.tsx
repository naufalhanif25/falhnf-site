import ReposPage from "./repos-page"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Repos",
}

export default function Page() {
    return <ReposPage />
}
