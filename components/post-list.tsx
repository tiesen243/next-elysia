'use client'

import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import * as card from '@/components/ui/card'
import { api } from '@/lib/api'
import useSWR from 'swr'

const PostList: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, isLoading, error, mutate } = useSWR('posts', () => api.post.getAll.get())

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {data?.data?.map((post) => (
        <li key={post.id}>
          <card.Card className="h-full">
            <card.CardHeader>
              <card.CardDescription>{post.author.name}</card.CardDescription>
              <card.CardTitle>{post.content}</card.CardTitle>

              {userId === post.author.id && (
                <Button
                  className="absolute right-2 top-2 size-6"
                  variant="destructive"
                  size="icon"
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
            </card.CardHeader>
          </card.Card>
        </li>
      ))}
    </ul>
  )
}

export default PostList
