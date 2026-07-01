"use client"

import { cn } from "@/app/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { THEME } from "./props"

export default function Markdown({ children }: { children: string | null | undefined }) {
    return (
        <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({ children, ...params }) => (
                    <h1 className="text-gray-200 text-base font-medium" {...params}>
                        {children}
                    </h1>
                ),
                h2: ({ children, ...params }) => (
                    <h2 className="text-gray-200 text-base font-medium" {...params}>
                        {children}
                    </h2>
                ),
                p: ({ children, ...params }) => (
                    <p className="text-gray-400 text-sm" {...params}>
                        {children}
                    </p>
                ),
                strong: ({ children, ...params }) => (
                    <strong className="text-gray-200 text-sm font-medium" {...params}>
                        {children}
                    </strong>
                ),
                em: ({ children, ...params }) => (
                    <em className="text-gray-200 text-sm" {...params}>
                        {children}
                    </em>
                ),
                table: ({ children, ...params }) => (
                    <table className="w-full h-fit text-sm" {...params}>
                        {children}
                    </table>
                ),
                thead: ({ children, ...params }) => (
                    <thead className="w-full h-fit bg-gray-700/50 font-medium" {...params}>
                        {children}
                    </thead>
                ),
                tr: ({ children, ...params }) => (
                    <tr className="w-full h-fit font-medium text-gray-200" {...params}>
                        {children}
                    </tr>
                ),
                tbody: ({ children, ...params }) => (
                    <tbody className="w-full h-fit bg-gray-800/50" {...params}>
                        {children}
                    </tbody>
                ),
                th: ({ children, ...params }) => (
                    <th className="h-fit px-2 py-1 border-gray-700/50 border" {...params}>
                        {children}
                    </th>
                ),
                td: ({ children, ...params }) => (
                    <td className="h-fit px-2 py-1 border-gray-700/50 border" {...params}>
                        {children}
                    </td>
                ),
                hr: ({ children, ...params }) => (
                    <hr className="bg-gray-700/50 w-full h-0.5" {...params}>
                        {children}
                    </hr>
                ),
                code: ({ children, className, ...params }) => {
                    const match = /language-(\w+)/.exec(className || "")

                    if (match) {
                        return (
                            <SyntaxHighlighter language={match[1]} style={THEME}>
                                {String(children)}
                            </SyntaxHighlighter>
                        )
                    }
                    return (
                        <code
                            className={cn(
                                "text-gray-200 text-sm",
                                "bg-gray-700/50 px-2 rounded-sm"
                            )}
                            {...params}
                        >
                            {children}
                        </code>
                    )
                },
                pre: ({ children, ...params }) => (
                    <pre
                        className={cn(
                            "text-gray-200 text-sm",
                            "bg-gray-700/50 px-3 py-2 rounded-md"
                        )}
                        {...params}
                    >
                        {children}
                    </pre>
                ),
                a: ({ children, ...params }) => (
                    <a
                        className={cn("text-teal-400 text-sm", "cursor-pointer hover:underline")}
                        {...params}
                    >
                        {children}
                    </a>
                ),
                ul: ({ children, ...params }) => (
                    <ul className="text-gray-200 text-sm" {...params}>
                        {children}
                    </ul>
                ),
                li: ({ children, ...params }) => (
                    <li className="text-gray-200 text-sm" {...params}>
                        - {children}
                    </li>
                ),
            }}
        >
            {children}
        </ReactMarkdown>
    )
}
