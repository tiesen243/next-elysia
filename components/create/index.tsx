'use client'

import { useMutation } from '@tanstack/react-query'
import { Button } from '../ui/button'
import { FormField } from '../ui/form-field'

import { create } from './_action'
import { toast } from 'sonner'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'

const CreateForm: React.FC = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: create,
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success('Create success'),
  })
  return (
    <form
      action={(formData: FormData) =>
        mutate({ title: String(formData.get('title')), content: String(formData.get('content')) })
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <FormField label="Title" name="title" />
          <FormField label="Content" name="content" />
        </CardContent>

        <CardFooter>
          <Button type="submit" isLoading={isPending}>
            Create
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default CreateForm
