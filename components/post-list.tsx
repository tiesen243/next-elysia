'use client'

import { Button } from '@/components/ui/button'
import * as card from '@/components/ui/card'
import { usePost } from '@/lib/hooks'
import { XIcon } from 'lucide-react'

const PostList: React.FC<{ userId: string }> = ({ userId }) => {
  const { posts, deletePost, setSize, isLoadingMore, isReachingEnd } = usePost({})

  return (
    <section className="space-y-4">
      {posts.map((post) => (
        <card.Card key={post.id} className="relative">
          {userId === post.author.id && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2 z-10"
              onClick={async () => deletePost(post.id)}
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

      <Button
        variant="ghost"
        onClick={() => setSize((size) => size + 1)}
        className="w-full"
        isLoading={isLoadingMore === true && isReachingEnd === false}
        disabled={isReachingEnd}
      >
        {isReachingEnd ? 'No more posts' : 'Load more'}
      </Button>
    </section>
  )
}
export default PostList
