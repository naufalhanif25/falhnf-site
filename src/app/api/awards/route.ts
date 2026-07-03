"use server"

import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { AwardData } from "./props"

export async function GET() {
    try {
        const basepath = path.join(process.cwd(), "public", "awards")
        const filepath = path.join(basepath, "awards.json")
        const file = await fs.readFile(filepath, "utf8")
        const awards = (JSON.parse(file) as AwardData[]).sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        return NextResponse.json({
            awards,
            total: awards.length,
        })
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            {
                message: "Failed to retrieve awards",
            },
            { status: 500 }
        )
    }
}
