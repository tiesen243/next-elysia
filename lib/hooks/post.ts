import { toast } from 'sonner'
import useSWRInfinite from 'swr/infinite'
import useSWRMutation from 'swr/mutation'

import { api } from '@/lib/api'

export const usePost = ({ PAGE_SIZE = 2 }: { PAGE_SIZE?: number }) => {
  const {
    data,
    error: getError,
    isLoading,
    size,
    setSize,
    mutate,
  } = useSWRInfinite(
    (index) => String(index + 1),
    async (key) => {
      const page = Number(key.replace('post-', '')) || 1
      const { data, error } = await api.post.getAll.get({ query: { page, limit: PAGE_SIZE } })
      if (error) throw error.value
      return data
    },
  )

  const {
    trigger,
    isMutating,
    error: createError,
  } = useSWRMutation<unknown, Error, string, { content: string }>(
    `posts`,
    async (_, { arg }) => {
      const { data, error } = await api.post.create.post(arg)
      if (error) throw error.value
      return data
    },
    {
      onError: (error) => !error.fieldsError && toast.error(error.message),
      onSuccess: () => {
        mutate()
        toast.success('Post created successfully')
      },
    },
  )

  const posts = data ? data.flat() : []

  const isReachingEnd = getError?.message === 'No posts found'

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined' && isReachingEnd === false)

  const deletePost = async (id: string) => {
    const { error } = await api.post.deletePost({ id }).delete()
    if (error) throw error.value
    mutate()
  }

  return {
    posts,
    isLoading,
    isMutating,
    isLoadingMore,
    isReachingEnd,
    createError,
    getError,
    trigger,
    setSize,
    deletePost,
  }
}
