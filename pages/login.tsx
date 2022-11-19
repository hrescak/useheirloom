import Router from "next/router"
import { useUser } from "../lib/useUser"
import PublicLayout from "../components/layout/PublicLayout"
import { useForm } from "react-hook-form"
import { Label, Input } from "../components/system/Form"
import { PrimaryButton } from "../components/system/Button"
import { H1 } from "../components/system/Typography"
import { FormError } from "../components/system/Form"
import { LogIn } from "react-feather"
import { ThemeContext } from "styled-components"
import { BarLoader } from "react-spinners"
import { useContext, useState } from "react"

const Login = () => {
  const theme = useContext(ThemeContext)
  const [loading, setLoading] = useState(false)
  useUser({ redirectTo: "/", redirectIfFound: true })
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  async function onSubmit(data) {
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.status === 200) {
        Router.push("/")
      } else {
        throw new Error(await res.text())
      }
      setLoading(false)
    } catch (error) {
      setError("request", { message: error.message })
      setLoading(false)
    }
  }

  return (
    <PublicLayout title="Welcome back!">
      <form onSubmit={handleSubmit(onSubmit)}>
        <H1>Log in</H1>
        <FormError separateRow title={`${errors?.request?.message}`} />
        <Label>Email</Label>
        <Input
          placeholder="your@email.com"
          autoCapitalize="off"
          type="text"
          {...register("email", {
            required: "Your email can't be blank",
          })}
        />
        <FormError title={`${errors?.email?.message}`} />
        <Label>Password</Label>
        <Input
          placeholder="password"
          type="password"
          {...register("password", {
            required: "Your password can't be blank", // <p>error message</p>
          })}
        />
        <FormError title={`${errors?.password?.message}`} />
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
        >
          <PrimaryButton
            style={{ marginRight: "1rem" }}
            icon={<LogIn />}
            onClick={handleSubmit(onSubmit)}
          >
            Log in
          </PrimaryButton>
          {loading && <BarLoader color={theme.colors.textSecondary} />}
        </div>
      </form>
    </PublicLayout>
  )
}

export default Login
