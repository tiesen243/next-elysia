'use client'

import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import useSWRMutation from 'swr/mutation'

import { Button } from '@/components/ui/button'
import * as card from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import type { SigninDto } from '@/server/models/user.model'
import { login } from './_action'

const Page: NextPage = () => {
  const router = useRouter()
  const { trigger, error, isMutating } = useSWRMutation<unknown, Error, string, SigninDto, null>(
    '/signin',
    async (_, { arg }) => login(arg).then((res) => !res.success && Promise.reject(res)),
    {
      throwOnError: false,
      onError: (error) => !error.fieldsError && toast.error(error.message),
      onSuccess: () => {
        toast.success('Sign in successful!')
        router.push('/')
        router.refresh()
      },
    },
  )

  return (
    <form
      action={async (fd: FormData) => {
        await trigger(Object.fromEntries(fd.entries()) as SigninDto)
      }}
    >
      <card.Card>
        <card.CardHeader>
          <card.CardTitle>Sign In</card.CardTitle>
        </card.CardHeader>

        <card.CardContent className="space-y-4">
          <FormField label="Email" name="email" message={error?.fieldsError?.email} />
          <FormField label="Password" name="password" type="password" message={error?.fieldsError?.password} />
        </card.CardContent>

        <card.CardFooter>
          <Button className="w-full" type="submit" isLoading={isMutating}>
            Sign In
          </Button>
        </card.CardFooter>
      </card.Card>
    </form>
  )
}

export default Page
