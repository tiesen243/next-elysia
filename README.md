This is a [Next.js](https://nextjs.org/) + [ElysiaJS](https://elysiajs.com/) project bootstrapped

## Getting Started

First, clone this repository

```bash
bun create next-app --example https://github.com/tiesen243/next-elysia [your-app-name]
cd [your-app-name]
bun install
```

Then, create environment variables

```
# .env
DATABASE_URL=""

# Generate a random string for NEXTAUTH_SECRET
# openssl rand -base64 32
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

## Learn More

- Documentation: [here](https://tiesen.id.vn/blogs/next-elysia.html)
- ElysiaJS: [https://elysiajs.com/](https://elysiajs.com/)
- Next.js: [https://nextjs.org/](https://nextjs.org/)
