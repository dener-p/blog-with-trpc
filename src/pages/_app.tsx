// src/pages/_app.tsx
import { httpBatchLink } from "@trpc/client/links/httpBatchLink"
import { loggerLink } from "@trpc/client/links/loggerLink"
import { withTRPC } from "@trpc/next"
import type { AppType } from "next/dist/shared/lib/utils"
import type { AppRouter } from "../server/router"

import superjson from "superjson"
import { getBaseUrl } from "../contants"
import { UserContextProvider } from "../context/user.context"
import "../styles/globals.css"
import { trpc } from "../utils/trpc"

const MyApp: AppType = ({ Component, pageProps }) => {
  const { data, isLoading } = trpc.useQuery(["users.me"])

  if (isLoading) {
    return <p>Loading User...</p>
  }

  return (
    <UserContextProvider value={data}>
      <div className="bg-slate-600">
        <Component {...pageProps} />
      </div>
    </UserContextProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ]

    return {
      queryClientConfig: {
        defaultOptions: {
          staleTime: 60,
        },
      },
      headers() {
        if (ctx?.req) {
          return { ...ctx.req.headers, "x-ssr": "1" }
        }
        return {}
      },
      links,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp)
