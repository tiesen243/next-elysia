'use client'

import { SendHorizonalIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import * as card from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { usePost } from '@/lib/hooks/post'

const CreateForm: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null)
  const { trigger, isMutating, createError } = usePost({})

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

        <card.CardDescription className="text-destructive">{createError?.fieldsError?.content}</card.CardDescription>
      </card.CardHeader>
    </card.Card>
  )
}

export default CreateForm
