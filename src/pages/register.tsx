import Link from "next/link"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { Container } from "../components/container"
import { CreateUserInput } from "../schema/user.schema"
import { trpc } from "../utils/trpc"

function RegisterPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>()
  const router = useRouter()

  const { mutate, error } = trpc.useMutation(["users.register-user"], {
    onSuccess: () => {
      router.push("/login")
    },
  })

  const onSubmit = (values: CreateUserInput) => {
    mutate(values)
  }

  return (
    <Container>
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-11/12 max-w-lg "
        >
          {error && error.message}
          <h1 className="font-bold text-xl">Register</h1>
          <input
            type="email"
            className="p-2 bg-zinc-500 rounded placeholder:text-zinc-200 "
            placeholder="example@example.com"
            {...register("email")}
          />

          <input
            type="text"
            className="p-2 bg-zinc-500 rounded placeholder:text-zinc-200 "
            placeholder="name"
            {...register("name")}
          />

          <button
            type="submit"
            className="font-semibold rounded px-4 py-2 transition-colors bg-blue-500 focus:bg-blue-400 hover:bg-blue-400"
          >
            Register
          </button>
        </form>
        <Link href="/login">
          <a className="transiton-colors hover:text-blue-400">Login</a>
        </Link>
      </>
    </Container>
  )
}

export default RegisterPage
