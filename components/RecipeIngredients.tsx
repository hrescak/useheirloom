import React from "react"
import useSWR from "swr"
import { RecipeIngredient } from "@prisma/client"
import { RecipeIngredientProps } from "../types"
import IngredientList from "./IngredientList"
import _ from "lodash"

const RecipeIngredients: React.FC<RecipeIngredientProps> = (props) => {
  const {
    data,
    mutate,
  }: {
    data?: RecipeIngredient[]
    error?: any
    mutate?: any
  } = useSWR(
    `/api/recipes/${props.recipeId}/recipe-ingredients`,
    (url) => fetch(url).then((r) => r.json()),
    { initialData: props.initialData }
  )
  const noSectionIngredients =
    data && data.filter((ingredient) => ingredient.section == null)
  const yesSectionIngredients =
    data && data.filter((ingredient) => ingredient.section != null)
  const ingredientsBySection =
    yesSectionIngredients &&
    _.chain(yesSectionIngredients).groupBy("section").values().value()
  console.log(ingredientsBySection)

  return (
    <>
      <IngredientList
        ingredients={noSectionIngredients}
        editable={props.editable}
        recipeId={props.recipeId}
      />
      {ingredientsBySection &&
        props.sections &&
        ingredientsBySection.map((section, idx) => (
          <IngredientList
            ingredients={ingredientsBySection[idx]}
            editable={props.editable}
            sectionId={idx}
            sectionName={props.sections[idx]}
            recipeId={props.recipeId}
          />
        ))}
      {data && data.length === 0 && <>No Ingredients yet</>}
    </>
  )
}

export default RecipeIngredients
