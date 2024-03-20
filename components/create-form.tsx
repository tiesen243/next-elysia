'use client'

import { useMutation } from '@tanstack/react-query'
import { SendHorizonalIcon } from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import * as card from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { api, getQueryClient } from '@/lib/api'
import { type CreatePostDto } from '@/server/dto/post.dto'

const CreateForm: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null)
  const { mutate, error, isPending } = useMutation<Res, Error, CreatePostDto>({
    mutationFn: async ({ content }) => {
      const { data, error } = await api.post.create.post({ content })
      if (error) throw error.value
      return data
    },
    onError: (error) => !error.fieldsError && toast.error(error.message),
    onSuccess: async ({ message }) => {
      console.log(message)
      toast.success('Post created')
      formRef.current?.reset()
      await getQueryClient().invalidateQueries({ queryKey: ['posts'] })
    },
  })
  return (
    <card.Card>
      <card.CardHeader>
        <form
          ref={formRef}
          className="flex items-center gap-4"
          action={(formData: FormData) => mutate({ content: String(formData.get('content')) })}
        >
          <FormField name="content" placeholder="What's on your mind?" className="flex-grow" />
          <Button type="submit" size="icon" isLoading={isPending}>
            <SendHorizonalIcon />
          </Button>
        </form>

        <card.CardDescription className="text-destructive">{error?.fieldsError?.content ?? ''}</card.CardDescription>
      </card.CardHeader>
    </card.Card>
  )
}

export default CreateForm
