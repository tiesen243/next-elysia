This is a [Next.js](https://nextjs.org/) + [ElysiaJS](https://elysiajs.com/) project bootstrapped

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Getting Started](#getting-started)
3. [Notes](#notes)
4. [Learn More](#learn-more)

## Tech Stack

1. [ElysiaJS](https://elysiajs.com/)
2. [Next.js](https://nextjs.org/)
3. [Prisma ORM](https://prisma.io/)
4. [Auth.js](https://authjs.dev/)
5. [SWR](https://swr.vercel.app/)
6. [Shadcn/ui](http://ui.shadcn.com/)
7. And more....

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

You can access swagger ui at [/api/elysia/dcos](http://localhost:3000/api/elysia/docs)

## Notes

1. Note: `trigger` function form `swr/mutation` only works with method chaining. You can't use it with async/await. If you use async/await, `isMutating` will always return `false`, so you need to use `useFormStatus` to check the `pending` status of the form.

2. If you want to use `middleware`, this is the example:

```typescript
// middleware.ts

import { auth } from '@/server/auth'
import { NextResponse, type NextRequest } from 'next/server'

export const middleware = async (req: NextRequest) => {
  const session = await auth()
  const url = req.nextUrl
  const path = url.pathname

  // Redirect to sign in if user is not signed in and not on the sign in page
  if (!path.startsWith('/auth') && !session) return NextResponse.redirect(new URL('/auth/signin', url))

  // Redirect to dashboard if user is already signed in
  if (path.startsWith('/auth') && session) return NextResponse.redirect(new URL('/', url))

  // Redirect to homepage if user is not admin
  // Remember to add role to the user object in `schema.prisma`
  if (path.startsWith('/dashboard') && session && session.user.role !== 'ADMIN')
    return NextResponse.redirect(new URL('/', url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*'],
}
```

## Learn More

- Documentation: [here](https://tiesen.id.vn/blogs/next-elysia.html)
- ElysiaJS: [https://elysiajs.com/](https://elysiajs.com/)
- Next.js: [https://nextjs.org/](https://nextjs.org/)
