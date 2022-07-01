import Error from "next/error"
import { useRouter } from "next/router"
import { Container } from "../../components/container"
import { trpc } from "../../utils/trpc"

function SinglePostPage() {
  const router = useRouter()

  const postId = router.query.postId as string

  const { data, isLoading } = trpc.useQuery(["post.single-post", { postId }])

  if (isLoading) {
    return (
      <Container>
        <p>loading...</p>
      </Container>
    )
  }

  if (!data) {
    return <Error statusCode={404} />
  }

  return (
    <Container>
      <div>
        <h1>{data.title}</h1>
        <p>{data.body}</p>
      </div>
    </Container>
  )
}

export default SinglePostPage
