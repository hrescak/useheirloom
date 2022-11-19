import React from "react"
import styled from "styled-components"
import Layout from "../../components/layout/Layout"
import { H1, H2 } from "../../components/system/Typography"
import { Label, Input, FormError } from "../../components/system/Form"
import { useForm } from "react-hook-form"
import { WithUser } from "../../components/hoc/withUser"
import { useRouter } from "next/router"
import Link from "next/link"
import { PrimaryButton, AccentButton } from "../../components/system/Button"
import { ChevronLeft, CheckCircle } from "react-feather"
import { UserSession } from "../../types"

const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    flex-direction: column;
  }
`
const RowDetail = styled.div`
  width: 50%;
  padding: 0.75rem 0 0 1rem;
  font-size: 0.875rem;
  color: ${(p) => p.theme.colors.textSecondary};
  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    width: 100%;
    padding: 0.25rem 0 1rem 0;
  }
`
const Half = styled.div`
  width: 50%;
  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    width: 100%;
  }
`
const SettingsPage: React.FC<{ user: UserSession }> = (props) => {
  const router = useRouter()
  const { handleSubmit, register, errors, setError, watch } = useForm()
  const newPassword = watch("newPassword")
  async function onSubmit(formData) {
    try {
      const res = await fetch(`/api/user`, {
        method: "POST",
        body: JSON.stringify(formData),
      })
      if (res.status === 200) {
        router.push("/")
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      // dude you jank
      const parsedError = JSON.parse(error.message)
      setError("request", "", parsedError.message)
    }
  }
  return (
    <Layout
      title="User Settings"
      invertHeader
      leftControl={
        <Link href={`/`} legacyBehavior>
          <PrimaryButton icon={<ChevronLeft />}>Back</PrimaryButton>
        </Link>
      }
      rightControl={
        <AccentButton icon={<CheckCircle />} onClick={handleSubmit(onSubmit)}>
          Save
        </AccentButton>
      }
    >
      <H1>Account Settings</H1>
      <FormError separateRow title={errors?.request?.message} />
      {props.user && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>Email</Label>
          <InputRow>
            <Half>
              <Input
                placeholder="your@email.com"
                defaultValue={props.user.email}
                {...register("email", {
                  required: "Your email can't be blank",
                })}
              />
              <FormError title={errors?.email?.message} />
            </Half>
            <RowDetail>
              How we get in touch with you, and how you log in to Heirloom.
            </RowDetail>
          </InputRow>
          <Label>Name</Label>
          <InputRow>
            <Half>
              <Input
                placeholder="First Last"
                defaultValue={props.user.name}
                {...register("name", {
                  required: "Your name can't be blank",
                })}
              />
              <FormError title={errors?.name?.message} />
            </Half>
            <RowDetail>
              Your name, to use in all the places where you need to be called by
              name. Can be anything.
            </RowDetail>
          </InputRow>
          <Label>Kitchen name</Label>
          <InputRow>
            <Half>
              <Input
                placeholder="Joe's Kitchen"
                defaultValue={props.user.kitchenName}
                {...register("kitchenName", {
                  required: "Kitchen name can't be blank",
                })}
              />
              <FormError title={errors?.kitchenName?.message} />
            </Half>
            <RowDetail>
              This will be the title of all the recipes when you share them with
              your friends (and enemies).
            </RowDetail>
          </InputRow>
          <H2 style={{ marginTop: "3rem" }}>Change Your Password</H2>
          <Label>New Password</Label>
          <InputRow>
            <Half>
              <Input
                placeholder="New Password"
                type="password"
                {...register("newPassword")}
              />
              <FormError title={errors?.newPassword?.message} />
            </Half>
            <RowDetail>
              I recommend a combination of letters and numbers at least 8
              characters long. Leave blank for no change.
            </RowDetail>
          </InputRow>
          {newPassword && (
            <>
              <Label>Re-enter New Password</Label>
              <InputRow>
                <Half>
                  <Input
                    type="password"
                    placeholder="New Password Again"
                    {...register("confirmNewPassword", {
                      validate: (value) =>
                        value === newPassword || "The passwords don't match", // <p>error message</p>
                    })}
                  />
                  <FormError title={errors?.confirmNewPassword?.message} />
                </Half>
                <RowDetail>Re-type the new password</RowDetail>
              </InputRow>
              <Label>Old Password</Label>
              <InputRow>
                <Half>
                  <Input
                    type="password"
                    placeholder="Old Password"
                    {...register("oldPassword")}
                  />
                  <FormError title={errors?.oldPassword?.message} />
                </Half>
                <RowDetail>Confirm the change with your old password</RowDetail>
              </InputRow>
            </>
          )}
        </form>
      )}
    </Layout>
  )
}

export default WithUser(SettingsPage)
