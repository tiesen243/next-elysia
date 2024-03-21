import { Elysia } from 'elysia'

import UserService from '@/server/services/user.service'
import UserModel from '@/server/models/user.model'

export const userRoute = new Elysia({ name: 'Route.User', prefix: '/user' })
  // Set up
  .decorate({ userService: new UserService() })
  .use(UserModel)

  // public routes

  // [GET] /api/elysia/user/getAll
  .get('/getAll', async ({ userService }) => userService.getUsers(), { detail: { tags: ['User'] } })

  // [GET] /api/elysia/user/getById/:id
  .get('/getById/:id', async ({ params: { id }, userService }) => userService.getUser(id), {
    detail: { tags: ['User'] },
  })

  // [POST] /api/elysia/user/signup
  .post('/signup', async ({ body, userService }) => userService.signup(body), {
    body: 'signup',
    detail: { tags: ['User'] },
  })

  // [POST] /api/elysia/user/signin
  .post('/signin', async ({ body, userService }) => userService.signin(body), {
    body: 'signin',
    detail: { tags: ['User'] },
  })
