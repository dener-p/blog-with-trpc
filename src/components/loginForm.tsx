import Link from "next/link"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { CreateUserInput } from "../schema/user.schema"
import { trpc } from "../utils/trpc"
import { Container } from "./container"

const VerifyToken = ({ hash }: { hash: string }) => {
  const { data, isLoading } = trpc.useQuery(["users.verify-otp", { hash }])
  const router = useRouter()

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Verifying...</h1>
  }

  router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/")
  return <p>Redirectin...</p>
}

function LoginForm() {
  const { handleSubmit, register } = useForm<CreateUserInput>()
  const router = useRouter()

  const { mutate, error, isSuccess } = trpc.useMutation(["users.request-otp"], {
    onSuccess: () => {
      router.push("/login")
    },
  })

  const onSubmit = (values: CreateUserInput) => {
    mutate({ ...values, redirect: router.asPath })
  }

  const hash = router.asPath.split("#token=")[1]
  if (hash) {
    return (
      <Container>
        <VerifyToken hash={hash} />
      </Container>
    )
  }

  return (
    <Container>
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-11/12 max-w-lg "
        >
          {error?.message}
          {isSuccess && <p>Check your email!</p>}
          <h1 className="font-bold text-xl">Login</h1>
          <input
            type="email"
            placeholder="example@example.com"
            className="p-2 bg-zinc-500 rounded placeholder:text-zinc-200 "
            {...register("email")}
          />

          <button
            type="submit"
            className="font-semibold rounded px-4 py-2 transition-colors bg-blue-500 focus:bg-blue-400 hover:bg-blue-400"
          >
            Login
          </button>
        </form>
        <Link href="/register">
          <a className="transiton-colors hover:text-blue-400">Register</a>
        </Link>
      </>
    </Container>
  )
}

export default LoginForm
