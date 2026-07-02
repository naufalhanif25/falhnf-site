"use server"

import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { WorkData } from "./props"

export async function GET() {
    try {
        const basepath = path.join(process.cwd(), "public", "works")
        const filepath = path.join(basepath, "works.json")
        const file = await fs.readFile(filepath, "utf8")
        const works = (JSON.parse(file) as WorkData[])
            .sort((a, b) => a.title.localeCompare(b.title))
        return NextResponse.json({
            works,
            total: works.length,
        })
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            {
                message: "Failed to retrieve works",
            },
            { status: 500 }
        )
    }
}
