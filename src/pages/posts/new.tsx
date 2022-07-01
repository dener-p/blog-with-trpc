import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { Container } from "../../components/container"
import { createPostInput } from "../../schema/post.schema"
import { trpc } from "../../utils/trpc"

function CreatePostPage() {
  const { handleSubmit, register } = useForm<createPostInput>()
  const router = useRouter()

  const { mutate, error } = trpc.useMutation(["post.create-post"], {
    onSuccess: ({ id }) => {
      router.push(`/posts/${id}`)
    },
  })

  function onSubmit(values: createPostInput) {
    mutate(values)
  }

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-11/12 max-w-lg"
      >
        {error?.message}
        <h1 className="text-2xl font-bold">Create Post</h1>

        <input
          type="text"
          placeholder="Post title"
          {...register("title")}
          className="rounded p-2 bg-slate-700 font-semibold placeholder:text-slate-200"
        />
        <textarea
          placeholder="Post body"
          {...register("body")}
          className="rounded p-2 bg-slate-700 font-semibold placeholder:text-slate-200"
        />

        <button
          type="submit"
          className="rounded py-2 px-4 bg-blue-500 hover:bg-blue-600 transition-colors font-bold text-lg"
        >
          Create Post
        </button>
      </form>
    </Container>
  )
}

export default CreatePostPage
