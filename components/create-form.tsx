'use client'

import { SendHorizonalIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import * as card from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { usePost } from '@/lib/hooks'

const CreateForm: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null)
  const { trigger, isMutating, createError, mutate } = usePost({})

  const action = async (formData: FormData) => {
    trigger({ content: formData.get('content') as string }).then(() => mutate().then(() => formRef.current?.reset()))
  }

  return (
    <card.Card>
      <card.CardHeader>
        <form ref={formRef} className="flex items-center gap-4" action={action}>
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
