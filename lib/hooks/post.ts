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
      const page = Number(key.replace('posts-', '')) || 1
      const { data, error } = await api.post.getAll.get({ query: { page, limit: PAGE_SIZE } })
      if (error) throw error.value
      return data
    },
  )

  const {
    trigger,
    isMutating,
    error: createError,
  } = useSWRMutation<Res, Error, string, { content: string }>('posts', async (_, { arg }) => {
    const { data, error } = await api.post.create.post(arg)
    if (error) throw error.value
    else return { message: data.message, data: data }
  })

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
    mutate,
  }
}
