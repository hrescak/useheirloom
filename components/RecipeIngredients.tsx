import React from "react"
import useSWR from "swr"
import { RecipeIngredient } from "@prisma/client"
import { RecipeIngredientProps } from "../types"
import IngredientList from "./IngredientList"
import _ from "lodash"

const RecipeIngredients: React.FC<RecipeIngredientProps> = (props) => {
  var data: RecipeIngredient[] = props.initialData
  if (!data || props.editable) {
    let swr = useSWR(
      `/api/recipes/${props.recipePublicId}/recipe-ingredients`,
      (url) => fetch(url).then((r) => r.json()),
      { initialData: props.initialData }
    )
    data = swr.data
  }
  const noSectionIngredients =
    data && data.filter((ingredient) => ingredient.section == null)
  const yesSectionIngredients =
    data && data.filter((ingredient) => ingredient.section != null)
  const ingredientsBySection =
    yesSectionIngredients &&
    _.chain(yesSectionIngredients).groupBy("section").values().value()

  const onSectionUpdate = () => {
    const rename = (newName: string, index: number) => {}
    const add = (newName: string) => {}
    const remove = (index: number) => {}
    const move = (oldIndex: number, newIndex: number) => {}

    return { rename, add, remove, move }
  }
  const saveSections = (sections: string[]) => {}

  return (
    <>
      <IngredientList
        ingredients={noSectionIngredients}
        editable={props.editable}
        recipePublicId={props.recipePublicId}
      />
      {ingredientsBySection &&
        props.sections &&
        ingredientsBySection.map((section, idx) => (
          <IngredientList
            ingredients={ingredientsBySection[idx]}
            editable={props.editable}
            sectionId={idx}
            sectionName={props.sections[idx]}
            recipePublicId={props.recipePublicId}
            onSectionUpdate={onSectionUpdate}
          />
        ))}
      {data && data.length === 0 && !props.editable && <>No Ingredients yet</>}
    </>
  )
}

export default RecipeIngredients
