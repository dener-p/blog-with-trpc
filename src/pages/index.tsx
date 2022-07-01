import type { NextPage } from "next"
import { Container } from "../components/container"
import LoginForm from "../components/loginForm"
import { useUserContext } from "../context/user.context"

const Home: NextPage = () => {
  const user = useUserContext()

  if (!user) {
    return <LoginForm />
  }

  return (
    <Container>
      <h1 className="font-bold text-xl">Welcome {user.name}</h1>
    </Container>
  )
}

export default Home
