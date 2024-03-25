'use client'

import { Button } from '@/components/ui/button'
import * as card from '@/components/ui/card'
import { api } from '@/lib/api'
import { XIcon } from 'lucide-react'
import useSWR from 'swr'

const PostList: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, error, isLoading, mutate } = useSWR('posts', () =>
    api.post.getAll.get({ query: {} }).then(({ error, data }) => (error ? Promise.reject(error) : data)),
  )

  if (isLoading) return <div>Loading...</div>
  if (error || !data) return <div>Error: {error.message}</div>

  return (
    <section className="space-y-4">
      {data.map((post) => (
        <card.Card key={post.id} className="relative">
          {userId === post.author.id && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2 z-10"
              onClick={async () =>
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
  )
}
export default PostList
