import StatsPage from "./stats-page"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Stats",
}

export default function Page() {
    return <StatsPage />
}
