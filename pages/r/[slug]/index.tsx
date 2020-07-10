import React, { useState } from "react"
import fetch from "isomorphic-unfetch"
import Layout from "../../../components/layout/Layout"
import { useRouter } from "next/router"
import useSWR from "swr"
import { RecipeProps } from "../../../types"
import RecipeView from "../../../components/RecipeView"
import ShareMenu from "../../../components/ShareMenu"
import Link from "next/link"
import { InlineButton, OutlineButton } from "../../../components/system/Button"
import { ChevronLeft, Edit3 } from "react-feather"
import { useUser } from "../../../lib/hooks"

const RecipePage: React.FC = () => {
  const router = useRouter()
  const user = useUser()
  const { slug } = router.query
  const {
    data,
    error,
  }: {
    data?: RecipeProps
    error?: any
    mutate?: any
  } = useSWR(
    () => (slug != undefined ? `/api/recipes/` + slug : null),
    (url) =>
      fetch(url).then((r) => {
        if (r.status != 200) {
          router.push("/")
        }
        return r.json()
      })
  )

  return (
    <Layout
      title={data?.name}
      signedOut={!user}
      leftControl={
        <Link href={`/`}>
          <InlineButton noMargin icon={<ChevronLeft />}>
            Recipes
          </InlineButton>
        </Link>
      }
      rightControl={
        data &&
        user &&
        data.authorId === user.id && (
          <>
            <ShareMenu recipe={data} />
            <Link href={`/r/[slug]/edit`} as={`/r/${data?.publicID}/edit`}>
              <OutlineButton icon={<Edit3 />} style={{ marginLeft: "1rem" }}>
                Edit
              </OutlineButton>
            </Link>
          </>
        )
      }
    >
      {error ? <p>{error.message}</p> : <RecipeView user={user} data={data} />}
    </Layout>
  )
}

export default RecipePage
