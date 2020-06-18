import React from "react"
import Layout from "../components/layout/Layout"
import { getSession } from "../lib/iron"
import { UserSession } from "../types"
import { useCreateRecipe } from "../lib/hooks"
import { OutlineButton } from "../components/system/Button"
import Obfuscate from "react-obfuscate"
import Link from "next/link"
import PublicLayout from "../components/layout/PublicLayout"
import styled from "styled-components"
import UserMenu from "../components/UserMenu"
import { PlusCircle, LogIn } from "react-feather"
import RecipeList from "../components/RecipeList"

type Props = {
  session: UserSession
}

const Logo = styled.img`
  width: 100%;
`
const Hello = styled.div`
  & a {
    color: ${(p) => p.theme.colors.text};
  }
`

const Index: React.FC<Props> = (props) => {
  const createRecipe = useCreateRecipe()
  if (!Boolean(props.session)) {
    return (
      <PublicLayout>
        <Hello>
          <Logo
            src="/images/heirloom.svg"
            width="400"
            alt="Heirloom in script typeface"
          />
          <p>
            Heirloom is your personal recipe book. It’s a simple, small and fast
            web-based recipe manager I’m building mostly for myself.{" "}
            <Link href="/login">
              <a>Get in</a>
            </Link>{" "}
            if you already have an account or&nbsp;
            <Obfuscate
              email="matej@useheirloom.com"
              headers={{
                subject: "Let me iiiiin",
                body:
                  "Hi, My name is _____ and i'd like to give Heirloom a shot.\n\n Thanks!",
              }}
            >
              hit me up
            </Obfuscate>{" "}
            if you want to try it out and give me feedback.
          </p>
          <p>Cheers, Matej</p>
        </Hello>
      </PublicLayout>
    )
  }
  return (
    <Layout
      leftControl={
        <img
          src="/images/heirloom.svg"
          height="42"
          alt="Heirloom in script typeface"
        />
      }
      rightControl={
        props.session ? (
          <>
            <OutlineButton
              onClick={() => createRecipe()}
              icon={<PlusCircle />}
              style={{ marginRight: "8px" }}
            >
              New Recipe
            </OutlineButton>
            <UserMenu />
          </>
        ) : (
          <Link href="/login">
            <OutlineButton icon={<LogIn />}>Log In</OutlineButton>
          </Link>
        )
      }
    >
      <RecipeList />
    </Layout>
  )
}
// Making sure we don't have flash of logged in /  out content on homepage
export async function getServerSideProps(context) {
  const session = await getSession(context.req)
  return {
    props: { session: session || null },
  }
}
export default Index
