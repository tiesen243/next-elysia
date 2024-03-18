'use client'

import { useQuery } from '@tanstack/react-query'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'

const PostList: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => api.post.getAll.get().then((res) => res.data),
    queryKey: ['posts'],
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {data?.map((post) => (
        <li key={post.id}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.author.name}</CardDescription>
            </CardHeader>
            <CardContent className="break-all">{post.content}</CardContent>
          </Card>
        </li>
      ))}
    </ul>
  )
}

export default PostList
