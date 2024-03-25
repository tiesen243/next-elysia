'use client'

import { Button } from '@/components/ui/button'
import * as card from '@/components/ui/card'
import { api } from '@/lib/api'
import { XIcon } from 'lucide-react'
import useSWRInfinite from 'swr/infinite'

const PostList: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, size, setSize, isValidating, isLoading, mutate } = useSWRInfinite(
    (index) => `posts-${index}`,
    async (key) => {
      const page = Number(key.split('-')[1]) + 1
      const { data, error } = await api.post.getAll.get({ query: { page, limit: 2 } })
      if (error) throw error.value
      return data
    },
  )

  const isEmpty = data?.[0]?.length === 0
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 2)

  return (
    <>
      <section className="space-y-4">
        {data?.flat().map((post) => (
          <card.Card key={post.id} className="relative">
            {userId === post.author.id && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 z-10"
                onClick={() =>
                  api.post
                    .deletePost({ id: post.id })
                    .delete()
                    .then(() => mutate())
                }
              >
                <XIcon />
              </Button>
            )}
            <card.CardHeader>
              <card.CardDescription>{post.author.name}</card.CardDescription>
              <card.CardTitle>{post.content}</card.CardTitle>
            </card.CardHeader>
          </card.Card>
        ))}
      </section>

      <Button
        variant="ghost"
        className="mt-4 w-full"
        onClick={() => setSize((prev) => prev + 1)}
        isLoading={isLoading || isValidating}
        disabled={isLoadingMore || isReachingEnd}
      >
        {isLoadingMore || isReachingEnd ? 'No More' : 'Load More'}
      </Button>
    </>
  )
}
export default PostList
