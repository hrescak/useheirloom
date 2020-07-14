import React from "react"
import { RecipeIngredientProps } from "../types"
import IngredientList from "./IngredientList"
import _ from "lodash"
import useRecipeIngredients from "../lib/useRecipeIngredients"

const RecipeIngredients: React.FC<RecipeIngredientProps> = (props) => {
  let ingredients = props.initialData
  if (props.editable) {
    const fetchedData = useRecipeIngredients(props.initialData)
    ingredients = fetchedData.ingredients
  }
  const noSectionIngredients =
    ingredients &&
    ingredients.filter((ingredient) => ingredient.section == null)
  const yesSectionIngredients =
    ingredients &&
    ingredients.filter((ingredient) => ingredient.section != null)
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
      {ingredients && ingredients.length === 0 && !props.editable && (
        <>No Ingredients yet</>
      )}
    </>
  )
}

export default RecipeIngredients
