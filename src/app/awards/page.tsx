import AwardsPage from "./awards-page"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Awards",
}

export default function Page() {
    return <AwardsPage />
}
