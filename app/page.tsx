import type { NextPage } from 'next'
import Image from 'next/image'

import CreateForm from '@/components/create-form'
import PostList from '@/components/post-list'
import { Typography } from '@/components/ui/typography'
import { auth } from '@/server/auth'

const Page: NextPage = async () => {
  const session = await auth()
  return (
    <>
      <Typography as="code" className="border border-muted-foreground p-2">
        Get started by editing `app/page.tsx` and `server/routes/*.ts`
      </Typography>

      <div className="flex aspect-video items-center justify-center">
        <div className="relative z-[-1] flex items-center gap-8 before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
          <Image src="/nextjs.svg" width={150} height={150} alt="Next.js logo" />
          <span className="text-4xl font-bold">X</span>
          <Image src="/elysia.svg" width={150} height={150} alt="Elysiajs logo" />
        </div>
      </div>

      <Typography as="blockquote" className="mt-12">
        view Swagger API documentation at{' '}
        <a href="/api/elysia/swagger" target="_blank" rel="noopener noreferrer">
          `/api/elysia/swagger`
        </a>
      </Typography>

      {!session || !session.user ? (
        <Typography as="link" href="/api/auth/signin">
          Sign in
        </Typography>
      ) : (
        <CreateForm />
      )}

      <Typography as="h2" className="mt-12">
        View the latest posts
      </Typography>

      <PostList userId={!session || !session.user ? '' : session.user.id} />
    </>
  )
}

export default Page
