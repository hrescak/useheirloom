import React from "react"
import { useUser } from "../../../lib/useUser"
import useRecipe from "../../../lib/useRecipe"
import Layout from "../../../components/layout/Layout"
import RecipeView from "../../../components/RecipeView"
import ShareMenu from "../../../components/ShareMenu"
import Link from "next/link"
import { InlineButton, OutlineButton } from "../../../components/system/Button"
import { ChevronLeft, Edit3 } from "react-feather"

const RecipePage: React.FC = () => {
  const user = useUser()
  const { recipe, error } = useRecipe()

  return (
    <Layout
      title={recipe?.name}
      signedOut={!user}
      leftControl={
        <Link href={`/`}>
          <InlineButton noMargin icon={<ChevronLeft />}>
            Recipes
          </InlineButton>
        </Link>
      }
      rightControl={
        recipe &&
        user &&
        recipe.authorId === user.id && (
          <>
            <ShareMenu recipe={recipe} />
            <Link href={`/r/[slug]/edit`} as={`/r/${recipe?.publicID}/edit`}>
              <OutlineButton icon={<Edit3 />} style={{ marginLeft: "1rem" }}>
                Edit
              </OutlineButton>
            </Link>
          </>
        )
      }
    >
      {error ? (
        <p>{error.message}</p>
      ) : (
        <RecipeView user={user} data={recipe} />
      )}
    </Layout>
  )
}

export default RecipePage
