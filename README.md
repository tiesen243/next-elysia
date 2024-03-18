This is a [Next.js](https://nextjs.org/) + [ElysiaJS](https://elysiajs.com/) project bootstrapped 

## Getting Started

First, clone this repository

```bash
git clone git@github.com:tiesen243/next-elysia.git
cd next-elysia
bun install
```

Then, create environment variables 

```
# .env
DATABASE_URL=""
NEXTAUTH_SECRET=""
```

Finally, run the development server:

```
bun db:push
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

You can access swagger ui at [/api/elysia/swagger](http://localhost:3000/api/elysia/swager)
