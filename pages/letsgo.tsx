import Router from "next/router"
import { useUser } from "../lib/useUser"
import PublicLayout from "../components/layout/PublicLayout"
import { useForm } from "react-hook-form"
import { H1 } from "../components/system/Typography"
import { Label, Input, FormError } from "../components/system/Form"
import { PrimaryButton } from "../components/system/Button"
import { LogIn } from "react-feather"
import { useContext, useState } from "react"
import { ThemeContext } from "styled-components"
import { BarLoader } from "react-spinners"

const Signup: React.FC = () => {
  const theme = useContext(ThemeContext)
  const [loading, setLoading] = useState(false)
  useUser({ redirectTo: "/", redirectIfFound: true })
  const { register, handleSubmit, errors, watch, setError } = useForm()
  const pwd = watch("password")
  async function onSubmit(data) {
    setLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.status === 200) {
        Router.push("/login")
      } else {
        throw new Error(await res.text())
      }
      setLoading(false)
    } catch (error) {
      setError("request", "", error.message)
      setLoading(false)
    }
  }

  return (
    <PublicLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <H1>Sign up</H1>
        <FormError separateRow title={errors?.request?.message} />
        <Label>Email</Label>
        <Input
          placeholder="your@email.com"
          name="email"
          type="text"
          ref={register({
            required: "Email is required",
          })}
        />
        <FormError title={errors?.email?.message} />
        <Label>Name</Label>
        <Input
          placeholder="Your Name"
          name="name"
          type="text"
          ref={register({
            required: "Name is required",
          })}
        />
        <FormError title={errors?.name?.message} />
        <Label>Password</Label>
        <Input
          placeholder="Password"
          name="password"
          type="password"
          ref={register({
            required: "Password is required", // <p>error message</p>
          })}
        />
        <FormError title={errors?.password?.message} />
        <Label>Repeat Password</Label>
        <Input
          placeholder="Repeat password"
          name="rpassword"
          type="password"
          ref={register({
            required: "Retype password from above",
            validate: (value) => value === pwd || "The passwords don't match", // <p>error message</p>
          })}
        />
        <FormError title={errors?.rpassword?.message} />
        <div
          style={{ display: "flex", marginTop: "1rem", alignItems: "center" }}
        >
          <PrimaryButton
            style={{ marginRight: "1rem" }}
            icon={<LogIn />}
            onClick={handleSubmit(onSubmit)}
          >
            Create an account
          </PrimaryButton>
          {loading && <BarLoader color={theme.colors.textSecondary} />}
        </div>
      </form>
    </PublicLayout>
  )
}

export default Signup
