'use client'

import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'
import useSWRMutation from 'swr/mutation'

import { Button } from '@/components/ui/button'
import * as card from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import type { SigninDto } from '@/server/models/user.model'
import { login } from './_action'

const Page: NextPage = () => {
  const router = useRouter()
  const { trigger, error } = useSWRMutation<Res, Error, string, SigninDto>('/signin', async (_, { arg }) =>
    login(arg).then((res) => (!res.success ? Promise.reject(res) : Promise.resolve({ message: res.message }))),
  )

  const action = (formData: FormData) => {
    trigger(Object.fromEntries(formData.entries()) as SigninDto).then(() => {
      router.push('/')
      router.refresh()
    })
  }

  return (
    <form action={action}>
      <card.Card>
        <card.CardHeader>
          <card.CardTitle>Sign In</card.CardTitle>
        </card.CardHeader>

        <card.CardContent className="space-y-4">
          <FormField label="Email" name="email" message={error?.fieldsError?.email} />
          <FormField label="Password" name="password" type="password" message={error?.fieldsError?.password} />
        </card.CardContent>

        <card.CardFooter>
          <SubmitButton />
        </card.CardFooter>
      </card.Card>
    </form>
  )
}

export default Page

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus()
  return (
    <Button className="w-full" type="submit" isLoading={pending}>
      Sign In
    </Button>
  )
}
