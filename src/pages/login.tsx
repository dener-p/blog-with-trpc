import dynamic from "next/dynamic"
import { Suspense } from "react"

const LoginForm = dynamic(() => import("../components/loginForm"), {
  ssr: false,
})

function LoginPage() {
  return (
    <Suspense fallback={"Loading..."}>
      <LoginForm />
    </Suspense>
  )
}

export default LoginPage
