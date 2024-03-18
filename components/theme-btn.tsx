'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Loader2Icon, MoonIcon, SunIcon } from 'lucide-react'

const ThemeBtn: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)
  useEffect(() => setMounted(true), [])
  if (!mounted)
    return (
      <Button variant="outline" size="icon">
        <Loader2Icon className="animate-spin" />
      </Button>
    )

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <Button onClick={toggleTheme} variant="outline" size="icon">
      {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}

export default ThemeBtn
