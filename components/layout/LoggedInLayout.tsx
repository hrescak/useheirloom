import React from "react"
import Layout from "./Layout"
import { useUser } from "../../lib/useUser"
import { OutlineButton } from "../system/Button"
import { PlusCircle } from "react-feather"
import UserMenu from "../UserMenu"
import useRecipes from "../../lib/useRecipes"
import Link from "next/link"

const LoggedInLayout: React.FC = (props) => {
  const user = useUser()
  const { createRecipe } = useRecipes()
  return (
    <Layout
      leftControl={
        <Link href="/">
          <a>
            <img
              src="/images/heirloom.svg"
              height="36"
              alt="Heirloom in script typeface"
            />
          </a>
        </Link>
      }
      rightControl={
        user && (
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
        )
      }
    >
      {props.children}
    </Layout>
  )
}

export default LoggedInLayout
