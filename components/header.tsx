import { auth } from '@/server/auth'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

const Header: React.FC = async () => {
  const session = await auth()
  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
      <div className="container flex justify-between">
        <Link href="/" className="text-2xl font-bold">
          Nextjs + Elysia
        </Link>

        {!session || !session.user ? (
          <span className="flex gap-2">
            <Link href="/api/auth/signin">SignIn</Link>/<Link href="/register">SignUp</Link>
          </span>
        ) : (
          <div className="space-x-2">
            <span>Hi, {session.user.name}</span>
            <Link href="/api/auth/signout" className={buttonVariants({ variant: 'ghost' })}>
              SignOut
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
