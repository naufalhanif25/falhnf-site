# Naufal Hanif Portfolio

A personal portfolio website built with Next.js that showcases projects, technical articles, GitHub repositories, development statistics, and achievements through a terminal-inspired interface.

The project is designed with a focus on responsiveness, custom UI components, Markdown-based articles, structured JSON content management, and GitHub API integration.

## Features

* Terminal-inspired user interface
* Responsive layout with custom scrollbar
* GitHub repository explorer
* GitHub statistics dashboard
* Project showcase
* Achievement and awards showcase
* Markdown-powered blog system
* Dynamic routing for articles
* Estimated reading time for posts
* Syntax highlighting for code blocks
* Custom REST API routes powered by Next.js
* Structured JSON content management
* Built with TypeScript and Tailwind CSS

## Tech Stack

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* Bun
* React Markdown
* Remark & Rehype
* Lucide React
* date-fns-tz

## Pages

* Home
* Repositories
* Statistics
* Works
* Awards
* Posts
* Post Detail (`/posts/[id]`)

## Getting Started

Clone the repository:

```bash
git clone https://github.com/naufalhanif25/falhnf-site.git
cd falhnf-site
```

Install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 in your browser.

## Content Management

The portfolio content is managed through JSON files stored inside the `public` directory.

### Projects

```
public/works/works.json
```

### Awards

```
public/awards/awards.json
```

### Posts

```
public/posts/posts.json
```

Markdown articles are stored in:

```
public/posts/contents/
```

Each Markdown file contains front matter metadata followed by the article content.

JSON Schema files are provided alongside each dataset to ensure consistent content structure.

## API Routes

The application exposes several internal API endpoints for retrieving portfolio data.

* `/api/repos`
* `/api/stats`
* `/api/works`
* `/api/awards`
* `/api/posts`
* `/api/posts/content`

## Environment Variables

Create a `.env.local` file before running the project.

Example:

```env
GH_API_URL=
GH_TOKEN=
GH_USERNAME=
```

These variables are required for retrieving GitHub repositories and development statistics.

## Build

Create a production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun run build
```

Start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun run start
```

## License

This project is licensed under the MIT License. You are free to use, modify, distribute, and republish this project in accordance with the terms of the license.
