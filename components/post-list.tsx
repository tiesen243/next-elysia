'use client'

import { useQuery } from '@tanstack/react-query'
import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import * as card from '@/components/ui/card'
import { api } from '@/lib/api'

const PostList: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => api.post.getAll.get().then((res) => res.data),
    queryKey: ['posts'],
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {data?.map((post) => (
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
                  onClick={() => api.post.delete.delete({ id: post.id }).then(() => refetch())}
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
