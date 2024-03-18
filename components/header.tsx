import { auth } from '@/server/auth'
import Link from 'next/link'
import ThemeBtn from './theme-btn'
import { buttonVariants } from './ui/button'

const Header: React.FC = async () => {
  const session = await auth()
  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
      <div className="container flex max-w-screen-md items-center justify-between">
        {!session || !session.user ? (
          <span className="flex gap-2">
            <Link href="/api/auth/signin">SignIn</Link>/<Link href="/register">SignUp</Link>
          </span>
        ) : (
          <span>Hi, {session.user.name}</span>
        )}

        <section className="flex items-center gap-2">
          {session && session.user && (
            <Link href="/api/auth/signout" className={buttonVariants({ variant: 'ghost' })}>
              Sign Out
            </Link>
          )}
          <ThemeBtn />
        </section>
      </div>
    </header>
  )
}

export default Header
