'use client'

import { useMutation } from '@tanstack/react-query'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import * as card from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { api } from '@/lib/elysia/client'

const Page: NextPage = () => {
  const router = useRouter()
  const { mutate, error, isPending } = useMutation<any, Error, { name: string; email: string; password: string }>({
    mutationFn: async (inp) => {
      const { data, error } = await api.user.signup.post(inp)
      if (error) throw error.value
      return data
    },
    onSuccess: () => {
      toast.success('Sign up success')
      router.push('/api/auth/signin')
    },
    onError: (error) => !error.fieldsError && toast.error(error.message),
  })

  return (
    <form
      action={(formData: FormData) =>
        mutate({
          name: String(formData.get('name')),
          email: String(formData.get('email')),
          password: String(formData.get('password')),
        })
      }
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
          <Button className="w-full" type="submit" isLoading={isPending}>
            Sign Up
          </Button>
        </card.CardFooter>
      </card.Card>
    </form>
  )
}

export default Page
