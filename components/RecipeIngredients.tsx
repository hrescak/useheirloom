import React from "react"
import { RecipeIngredientProps } from "../types"
import IngredientList from "./IngredientList"

const RecipeIngredients: React.FC<RecipeIngredientProps> = (props) => {
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
        ingredients={props.initialData}
        editable={props.editable}
        recipePublicId={props.recipePublicId}
      />
      {props.sections &&
        props.sections.map((section, idx) => (
          <IngredientList
            key={section.name}
            ingredients={section.ingredients}
            editable={props.editable}
            sectionId={section.id}
            sectionName={section.name}
            recipePublicId={props.recipePublicId}
            onSectionUpdate={onSectionUpdate}
          />
        ))}
      {!props.editable &&
        props.initialData &&
        props.initialData.length == 0 &&
        props.sections &&
        props.sections.length == 0 && <>No Ingredients yet.</>}
    </>
  )
}

export default RecipeIngredients
