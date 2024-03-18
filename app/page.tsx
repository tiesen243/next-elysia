import type { NextPage } from 'next'

import CreateForm from '@/components/create'
import PostList from '@/components/post-list'
import { auth } from '@/server/auth'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

const Page: NextPage = async () => {
  const session = await auth()
  return (
    <>
      <h1 className="text-center text-4xl font-bold">
        Next.js + Elysiajs template
        <br />
        using Prisma, React Query, Tailwind CSS, and more
      </h1>

      <p className="mt-4 text-center text-lg">
        This is a template for building a fullstack application using Next.js and Elysiajs. It includes authentication,
        database, and more.
      </p>

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
