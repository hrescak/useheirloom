import React from "react"
import { getSession } from "../lib/iron"
import { UserSession } from "../types"
import Obfuscate from "react-obfuscate"
import Link from "next/link"
import PublicLayout from "../components/layout/PublicLayout"
import styled from "styled-components"
import RecipeList from "../components/RecipeList"
import { useUser } from "../lib/useUser"
import LoggedInLayout from "../components/layout/LoggedInLayout"

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
  const user = useUser({}, { initialProps: props.session })
  if (!user && !props.session) {
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
            <Link href="/login">Log in</Link> if you already have an account
            or&nbsp;
            <Obfuscate
              email="message.heirloom@gmail.com"
              headers={{
                subject: "Let me iiiiin",
                body:
                  "Hi, My name is _____ and i'd like to give Heirloom a shot.\n\n Thanks!",
              }}
            >
              hit me up
            </Obfuscate>{" "}
            if you want to try it out.
          </p>
          <p>Cheers, Matej</p>
          <p style={{ opacity: 0.4 }}>
            P.S. Here's a really good{" "}
            <a
              href="https://useheirloom.com/r/sourdough-waffles"
              rel="noreferrer"
            >
              Sourdough Waffles
            </a>{" "}
            recipe.{" "}
          </p>
        </Hello>
      </PublicLayout>
    )
  }
  return (
    <LoggedInLayout>
      <RecipeList />
    </LoggedInLayout>
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
