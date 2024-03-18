'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import * as card from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { api } from '@/lib/api'
import { getQueryClient } from './provider'

const CreateForm: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null)
  const { mutate, isPending } = useMutation({
    mutationFn: api.post.create.post,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Create success')
      formRef.current?.reset()
      getQueryClient().invalidateQueries({ queryKey: ['posts'] })
    },
  })
  return (
    <form
      ref={formRef}
      action={(formData: FormData) =>
        mutate({ title: String(formData.get('title')), content: String(formData.get('content')) })
      }
    >
      <card.Card>
        <card.CardHeader>
          <card.CardTitle>Create Post</card.CardTitle>
        </card.CardHeader>

        <card.CardContent className="space-y-4">
          <FormField label="Title" name="title" />
          <FormField label="Content" name="content" multiline />
        </card.CardContent>

        <card.CardFooter>
          <Button type="submit" isLoading={isPending}>
            Create
          </Button>
        </card.CardFooter>
      </card.Card>
    </form>
  )
}

export default CreateForm
