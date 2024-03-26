import { auth, signOut } from '@/server/auth'
import ThemeBtn from './theme-btn'
import { Button } from './ui/button'
import { Typography } from './ui/typography'

const Header: React.FC = async () => {
  const session = await auth()

  const logout = async () => {
    'use server'
    await signOut()
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
      <div className="container flex items-center justify-between">
        {!session || !session.user ? (
          <span className="flex gap-2">
            <Typography as="link" href="/auth/signin">
              Sign In
            </Typography>
            /
            <Typography as="link" href="/auth/register">
              Sign Up
            </Typography>
          </span>
        ) : (
          <Typography as="h4">Welcome, {session.user.name}</Typography>
        )}

        <section className="flex items-center gap-2">
          {session && session.user && (
            <form action={logout}>
              <Button type="submit" variant="ghost">
                Sign Out
              </Button>
            </form>
          )}
          <ThemeBtn />
        </section>
      </div>
    </header>
  )
}

export default Header
