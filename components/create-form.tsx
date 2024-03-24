'use client'

import { SendHorizonalIcon } from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'
import useSWRMutation from 'swr/mutation'

import { Button } from '@/components/ui/button'
import * as card from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { api } from '@/lib/api'

const CreateForm: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null)
  const { trigger, isMutating, error } = useSWRMutation<unknown, Error, string, { content: string }>(
    'posts',
    async (_, { arg }) => api.post.create.post(arg).then(({ error }) => error && Promise.reject(error.value)),

    {
      onError: (error) => !error.fieldsError && toast.error(error.message),
      onSuccess: () => toast.success('Post created'),
    },
  )

  return (
    <card.Card>
      <card.CardHeader>
        <form
          ref={formRef}
          className="flex items-center gap-4"
          action={(formData: FormData) => {
            trigger({ content: formData.get('content') as string }).then(() => formRef.current?.reset())
          }}
        >
          <FormField name="content" placeholder="What's on your mind?" className="flex-grow" />
          <Button type="submit" size="icon" isLoading={isMutating}>
            <SendHorizonalIcon />
          </Button>
        </form>

        <card.CardDescription className="text-destructive">{error?.fieldsError?.content}</card.CardDescription>
      </card.CardHeader>
    </card.Card>
  )
}

export default CreateForm
