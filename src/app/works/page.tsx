import WorksPage from "./works-page"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Works",
}

export default function Page() {
    return <WorksPage />
}
