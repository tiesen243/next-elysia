'use client'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const typographyVariants = cva('font-sans text-pretty', {
  variants: {
    as: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6 text-balance',
      span: 'inline',
      link: 'hover:underline underline-offset-4',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    },

    clr: {
      primary: 'text-foreground',
      secondary: 'text-muted-foreground',
      success: 'text-green-600 dark:text-green-400',
      info: 'text-blue-600 dark:text-blue-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      error: 'text-destructive',
    },
  },
  defaultVariants: {
    as: 'p',
    clr: 'primary',
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {
  href?: string
  isExternal?: boolean
}

export const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ as = 'p', clr = 'primary', className = '', isExternal = false, ...props }, ref) => {
    const Comp = as ? Slot : 'p'

    if (as === 'link')
      return (
        <Comp ref={ref} className={cn(typographyVariants({ as, clr, className }))} {...props}>
          <Link href={props.href ?? ''} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {props.children}
          </Link>
        </Comp>
      )

    const AsComp = as ?? 'p'

    return (
      <Comp ref={ref} className={cn(typographyVariants({ as, clr, className }))} {...props}>
        <AsComp>{props.children}</AsComp>
      </Comp>
    )
  },
)

Typography.displayName = 'Typography'
