import { SigninForm } from "frontend/components/SigninForm"
import { useSocket } from "frontend/context/socket";


export const SigninPage: React.FC = () => {
  const { user } = useSocket();

  return (
    <>
    {!user && (
      <section>
        <h1>Signin</h1>
        <SigninForm />
      </section>
    )}
    </>
  )
}