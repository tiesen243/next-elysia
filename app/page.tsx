import type { NextPage } from 'next'

import CreateForm from '@/components/create-form'
import PostList from '@/components/post-list'
import { auth } from '@/server/auth'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

const Page: NextPage = async () => {
  const session = await auth()
  return (
    <>
      <article className="space-y-2 text-xl">
        <h1 className="text-center text-4xl font-bold">Next.js + Elysiajs template</h1>

        <p>
          This is a template for a fullstack Next.js application using Elysiajs, Prisma, React Query, Auth.js, Tailwind
          CSS, and more.
        </p>

        <p>
          This page is a simple example of how to use the template. It includes a form to create a post and a list of
          posts.
        </p>

        <p>
          Swaggert UI is available at{' '}
          <Link href="/api/elysia/swagger" className="underline-offset-4 hover:underline">
            here
          </Link>
        </p>
      </article>

      {!session || !session.user ? (
        <Link href="/api/auth/signin" className={buttonVariants({ className: 'w-full' })}>
          Sign in
        </Link>
      ) : (
        <CreateForm />
      )}
      <PostList />
    </>
  )
}

export default Page
