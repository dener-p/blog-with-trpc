// src/server/router/index.ts
import superjson from "superjson"
import { createRouter } from "./context"
import { postRouter } from "./post"

import { userRouter } from "./user"

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("users.", userRouter)
  .merge("post.", postRouter)

// export type definition of API
export type AppRouter = typeof appRouter
