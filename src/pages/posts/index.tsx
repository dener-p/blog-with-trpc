import type { NextPage } from "next"
import Error from "next/error"
import Link from "next/link"
import { Container } from "../../components/container"
import { useUserContext } from "../../context/user.context"
import { trpc } from "../../utils/trpc"

const Posts: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["post.posts"])
  const user = useUserContext()

  if (isLoading) {
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    )
  }

  if (!data) {
    return <Error statusCode={500} />
  }

  return (
    <Container>
      <div className="h-full max-w-7xl w-11/12">
        <div className="text-2xl my-12 flex justify-between  ">
          <h1 className="">Posts</h1>
          {user && (
            <Link href="/posts/new" className=" ">
              <a className="underline underline-offset-2 hover:text-slate-300 ">
                New Post
              </a>
            </Link>
          )}
        </div>
        <section className="grid grid-cols-2 gap-4">
          {data?.map((post) => (
            <article
              key={post.id}
              className="outline rounded bg-slate-700 flex p-3 items-center justify-between"
            >
              <h2>{post.title}</h2>
              <Link href={`/posts/${post.id}`}>
                <a className="underline underline-offset-2 hover:text-slate-300 ">
                  Read Post
                </a>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </Container>
  )
}

export default Posts
