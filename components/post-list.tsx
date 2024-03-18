import { api } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const PostList: React.FC = async () => {
  const { data, error } = await api.post.getAll.get()
  if (error) return <div>Error: {String(error.value)}</div>

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {data.map((post) => (
        <li key={post.id}>
          <Card>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.author.name}</CardDescription>
            </CardHeader>
            <CardContent>{post.content}</CardContent>
          </Card>
        </li>
      ))}
    </ul>
  )
}

export default PostList
