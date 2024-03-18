'use client'

import { useMutation } from '@tanstack/react-query'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { mutationFn } from './_action'

const Page: NextPage = () => {
  const { push } = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: () => {
      toast.success('Sign up success')
      push('/api/auth/signin')
    },
    onError: (error) => toast.error(error.message),
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
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <FormField label="Name" name="name" />
          <FormField label="Email" name="email" />
          <FormField label="Password" name="password" type="password" />
        </CardContent>

        <CardFooter>
          <Button className="w-full" type="submit" isLoading={isPending}>
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default Page
