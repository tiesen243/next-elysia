'use client'

import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'

import { Button } from '@/components/ui/button'
import * as card from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { api } from '@/lib/api'
import type { SignupDto } from '@/server/models/user.model'

const Page: NextPage = () => {
  const router = useRouter()

  const { trigger, error, isMutating } = useSWRMutation<Res, Error, string, SignupDto>('/signup', (_, { arg }) =>
    api.user.signup
      .post(arg)
      .then(({ error }) => (error ? Promise.reject(error.value) : Promise.resolve({ message: 'Sign up success' }))),
  )

  return (
    <form
      action={(fd: FormData) => {
        trigger(Object.fromEntries(fd.entries()) as SignupDto).then(() => router.push('/signin'))
      }}
    >
      <card.Card>
        <card.CardHeader>
          <card.CardTitle>Sign Up</card.CardTitle>
        </card.CardHeader>

        <card.CardContent className="space-y-4">
          <FormField label="Name" name="name" message={error?.fieldsError?.name} />
          <FormField label="Email" name="email" message={error?.fieldsError?.email} />
          <FormField label="Password" name="password" type="password" message={error?.fieldsError?.password} />
        </card.CardContent>

        <card.CardFooter>
          <Button className="w-full" type="submit" isLoading={isMutating}>
            Sign Up
          </Button>
        </card.CardFooter>
      </card.Card>
    </form>
  )
}

export default Page
