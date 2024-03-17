import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { postRoute } from "./routes/post";

export const app = new Elysia({ prefix: "/api/elysia" })
  .use(swagger())
  .use(postRoute);

export const GET = app.handle;
export const POST = app.handle;
export const PATCH = app.handle;
export const DELETE = app.handle;
