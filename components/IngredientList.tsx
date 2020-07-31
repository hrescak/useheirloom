import { IngredientListProps } from "../types"
import _ from "lodash"
import { Droppable, Draggable } from "react-beautiful-dnd"
import styled from "styled-components"
import { Trash2, AlignJustify } from "react-feather"
import { PrimaryButton, InlineButton } from "./system/Button"
import { UL, H3 } from "./system/Typography"
import useRecipeIngredients from "../lib/useRecipeIngredients"
import { useState } from "react"
import { Input } from "./system/Form"
import { useRecipeSection } from "../lib/useRecipeSections"
import NewIngredientForm from "./NewIngredientForm"
import IngredientItem from "./IngredientItem"

const HeaderEditWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding-bottom: 4px;
`
const HeaderEdit = styled.div`
  border: 1px solid ${(p) => p.theme.colors.wash};
  border-radius: 0.5rem;
  display: flex;
  flex: 2;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
  padding-right: 0.5rem;
  padding-left: 12px;
`
const HeaderInput = styled(Input)`
  background: none;
  font-weight: 600;
  font-size: 1.25rem;
  padding-left: 8px;
  margin: 0 0.5rem 0 0;
`

const ListWrapper = styled.div<{ isSection?: boolean }>`
  ${(p) =>
    p.isSection &&
    `
    border-radius: 8px;
    padding: 1rem 0 0.5rem;
    background:white;
  `}
`

const IngredientList: React.FC<IngredientListProps> = (props) => {
  const [sectionHeader, setSectionHeader] = useState(props.sectionName)
  const {
    ingredientsInSection,
    createIngredient,
    renameIngredient,
    deleteIngredient,
  } = useRecipeIngredients(props.ingredients, !props.editable)
  const ingredients = ingredientsInSection(props.sectionId)
  const { renameSection, removeSection } = useRecipeSection()

  const onHeaderRename = () => {
    renameSection(sectionHeader, props.sectionId)
  }
  const onHeaderDelete = () => {
    removeSection(props.sectionId)
  }
  const renderEditableIngredients = () => (
    <Droppable droppableId={`droppable-${props.sectionId}`} type="INGREDIENT">
      {(provided, snapshot) => (
        <div ref={provided.innerRef}>
          {ingredients &&
            _.sortBy(ingredients, (i) => i.priority).map(
              (ingredient, index) => (
                <div key={ingredient.freeform}>
                  <IngredientItem
                    ingredient={ingredient}
                    idx={index}
                    recipePublicId={props.recipePublicId}
                    editable={props.editable}
                    onDelete={deleteIngredient}
                    onEdit={renameIngredient}
                    isDragging={snapshot.isDraggingOver}
                  />
                </div>
              )
            )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )

  const renderNewIngredientForm = () => (
    <NewIngredientForm
      placeholder={`Add an ingredient${
        props.sectionName ? " to this section" : ""
      }...`}
      onFormSubmit={createIngredient}
      sectionId={props.sectionId}
    />
  )

  return (
    <div>
      {props.editable ? (
        <ListWrapper isSection={props.sectionId != null}>
          {props.sectionName ? (
            <Draggable
              draggableId={"sid" + props.sectionId}
              index={props.idx}
              key={props.sectionId}
              type="SECTION"
            >
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps}>
                  <div style={{ background: "white", borderRadius: "8px" }}>
                    <HeaderEditWrapper>
                      <HeaderEdit>
                        <div
                          style={{ height: "24px" }}
                          {...provided.dragHandleProps}
                        >
                          <AlignJustify />
                        </div>
                        <HeaderInput
                          type="text"
                          placeholder="Ingredient section name"
                          onChange={(e) => setSectionHeader(e.target.value)}
                          value={sectionHeader}
                        />
                        {props.sectionName != sectionHeader && (
                          <PrimaryButton onClick={() => onHeaderRename()}>
                            Save
                          </PrimaryButton>
                        )}
                      </HeaderEdit>
                      <InlineButton
                        onClick={() => onHeaderDelete()}
                        icon={<Trash2 />}
                        hiddenLabel
                      >
                        Delete Ingredient Section
                      </InlineButton>
                    </HeaderEditWrapper>
                    {renderEditableIngredients()}
                    {renderNewIngredientForm()}
                  </div>
                </div>
              )}
            </Draggable>
          ) : (
            <>
              {renderEditableIngredients()}
              {renderNewIngredientForm()}
            </>
          )}
        </ListWrapper>
      ) : (
        <>
          {props.sectionName && <H3>{props.sectionName}</H3>}
          <UL>
            {ingredients &&
              ingredients.length > 0 &&
              _.sortBy(ingredients, (i) => i.priority).map(
                (ingredient, index) => (
                  <li key={ingredient.freeform}>
                    <IngredientItem
                      ingredient={ingredient}
                      idx={index}
                      recipePublicId={props.recipePublicId}
                      editable={props.editable}
                    />
                  </li>
                )
              )}
          </UL>
        </>
      )}
    </div>
  )
}

export default IngredientList
