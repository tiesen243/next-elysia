'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { SendHorizonalIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import * as card from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { api, getQueryClient, useMutation } from '@/lib/api'

const CreateForm: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null)
  const { mutate, error, isPending } = useMutation<{ content: string }>({
    mutationFn: async (inp) => {
      const { data, error } = await api.post.create.post(inp)
      if (error) throw error.value
      return data
    },
    onError: (error) => !error.fieldsError && toast.error(String(error)),
    onSuccess: () => {
      toast.success('Create success')
      formRef.current?.reset()
      getQueryClient().invalidateQueries({ queryKey: ['posts'] })
    },
  })
  return (
    <form ref={formRef} action={(formData: FormData) => mutate({ content: String(formData.get('content')) })}>
      <card.Card>
        <card.CardHeader className="flex-row items-center gap-4 space-y-0">
          <FormField
            name="content"
            placeholder="What's on your mind?"
            className="flex-grow"
            message={error?.fieldsError?.content}
          />
          <Button type="submit" size="icon" isLoading={isPending}>
            <SendHorizonalIcon />
          </Button>
        </card.CardHeader>
      </card.Card>
    </form>
  )
}

export default CreateForm
