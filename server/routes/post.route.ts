import { Elysia } from 'elysia'

import PostModel from '@/server/models/post.model'
import AuthService from '@/server/services/auth.service'
import PostService from '@/server/services/post.servive'

export const postRoute = new Elysia({ name: 'Route.Post', prefix: '/post' })
  // Set up
  .decorate({ postService: new PostService() })
  .use(PostModel)

  // public routes

  // [GET] /api/elysia/post/getAll
  .get('/getAll', async ({ postService, query }) => postService.getPosts(query), {
    query: 'getPosts',
    detail: { tags: ['Post'] },
  })

  // protected routes
  .use(AuthService)

  // [POST] /api/elysia/post/create
  .post('/create', async ({ postService, user, body }) => postService.createPost(body, user), {
    body: 'createPost',
    detail: { tags: ['Post'] },
  })

  // [DELETE] /api/elysia/post/delete/:id
  .delete('/deletePost/:id', async ({ params: { id }, postService, user }) => postService.deletePost(id, user), {
    detail: { tags: ['Post'] },
  })
