import React from "react"
import { RecipeIngredientProps } from "../types"
import IngredientList from "./IngredientList"
import useRecipeIngredients from "../lib/useRecipeIngredients"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import { useRecipeSection } from "../lib/useRecipeSections"
import _ from "lodash"
import NewIngredientForm from "./NewIngredientForm"
import styled from "styled-components"

const Separator = styled.div`
  height: 2px;
  background: ${(p) => p.theme.colors.wash};
  margin: 0.5rem 0.75rem 0.75rem;
`

const RecipeIngredients: React.FC<RecipeIngredientProps> = (props) => {
  const { moveIngredient } = useRecipeIngredients(
    props.initialData,
    !props.editable
  )
  const sections = _.sortBy(props.sections, "priority")
  console.log(sections)
  const { moveSection, createSection } = useRecipeSection(sections)
  const onDragEnd = (result: DropResult) => {
    console.log(result.type)
    if (result.type == "INGREDIENT") {
      moveIngredient(result)
    }
    if (result.type == "SECTION") {
      moveSection(result)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <IngredientList
        ingredients={props.initialData}
        editable={props.editable}
        recipePublicId={props.recipePublicId}
      />
      {props.sections && (
        <Droppable droppableId="sectionDroppable" type="SECTION">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {sections.map((section, idx) => (
                <IngredientList
                  key={section.name}
                  ingredients={section.ingredients}
                  editable={props.editable}
                  sectionId={section.id}
                  idx={idx}
                  sectionName={section.name}
                  recipePublicId={props.recipePublicId}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
      {props.editable && (
        <>
          <Separator />
          <NewIngredientForm
            placeholder="Add new section of ingredients..."
            onFormSubmit={createSection}
          />
        </>
      )}
      {!props.editable &&
        props.initialData &&
        props.initialData.length == 0 &&
        props.sections &&
        props.sections.length == 0 && <>No Ingredients yet.</>}
    </DragDropContext>
  )
}

export default RecipeIngredients
