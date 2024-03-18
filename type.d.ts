interface Request extends NextRequest {
  user: User
}

interface User {
  id: string
  email: string
  username: string
}
