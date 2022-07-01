import * as trpc from "@trpc/server"
import { createPostSchema, getSinglePostSchema } from "../../schema/post.schema"
import { createRouter } from "./context"

export const postRouter = createRouter()
  .mutation("create-post", {
    input: createPostSchema,
    async resolve({ ctx, input }) {
      if (!ctx.user) {
        new trpc.TRPCError({ code: "FORBIDDEN", message: "Please login" })
      }

      const post = await ctx.prisma.post.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.user?.id,
            },
          },
        },
      })

      return post
    },
  })
  .query("posts", {
    async resolve({ ctx }) {
      return ctx.prisma.post.findMany()
    },
  })
  .query("single-post", {
    input: getSinglePostSchema,
    async resolve({ input, ctx }) {
      return ctx.prisma.post.findFirst({
        where: {
          id: input.postId,
        },
      })
    },
  })
