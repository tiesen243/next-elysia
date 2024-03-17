import { Elysia, t } from "elysia";

const posts = [
  {
    id: 1,
    title: "Hello, World!",
  },
  {
    id: 2,
    title: "Hello, Elysia!",
  },
];

export const postRoute = new Elysia({ prefix: "/post" })
  .get("/getAll", async () => ({ posts }))

  .get("/id/:id", async ({ params: { id } }) => ({
    post: posts.find((post) => post.id === Number(id)),
  }))
  .post(
    "/create",
    async ({ body }) => {
      posts.push({
        id: posts.length + 1,
        title: body.title,
      });
      return {
        id: posts.length,
        title: body.title,
      };
    },
    {
      body: t.Object({
        title: t.String({ minLength: 4 }),
      }),
    },
  )
  .delete("/delete/:id", async ({ params: { id } }) => {
    const index = posts.findIndex((post) => post.id === Number(id));
    if (index === -1) return { message: "Not found" };

    posts.splice(index, 1);
    return { message: "Deleted" };
  });
