'use client'

import { useMutation } from '@tanstack/react-query'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import * as card from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { login } from './_action'

const Page: NextPage = () => {
  const router = useRouter()
  const { mutate, error, isPending } = useMutation<any, Error, { email: string; password: string }>({
    mutationFn: async (data) =>
      login(data).then((res) => {
        if (res.success) return
        else throw res
      }),
    onSuccess: () => {
      toast.success('Sign up success')
      router.push('/')
      router.refresh()
    },
    onError: (error) => !error.fieldsError && toast.error(error.message),
  })

  return (
    <form
      action={(formData: FormData) =>
        mutate({
          email: String(formData.get('email')),
          password: String(formData.get('password')),
        })
      }
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
          <Button className="w-full" type="submit" isLoading={isPending}>
            Sign In
          </Button>
        </card.CardFooter>
      </card.Card>
    </form>
  )
}

export default Page
