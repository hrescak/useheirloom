import { IngredientListProps } from "../types"
import _ from "lodash"
import { useForm } from "react-hook-form"
import IngredientItem from "./IngredientItem"
import { Droppable, DragDropContext } from "react-beautiful-dnd"
import styled from "styled-components"
import { Plus, PlusCircle } from "react-feather"
import { PrimaryButton } from "./system/Button"
import { UL, H3 } from "./system/Typography"
import useRecipeIngredients from "../lib/useRecipeIngredients"
import { useState } from "react"
import { Input } from "./system/Form"
import { useRecipeSection } from "../lib/useRecipeSections"

const Separator = styled.div`
  height: 2px;
  background: ${(p) => p.theme.colors.wash};
  margin: 0.75rem;
`
const ItemWrapper = styled.div`
  align-items: center;
  background: ${(p) => p.theme.colors.wash};
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin-right: 8px;
  padding: 0 4px 0 12px;
  width: 100%;
`
const InlineInput = styled.input`
  background: 0;
  border: 0;
  flex: 2;
  font-size: 1rem;
  padding: 16px;
`
const HeaderEdit = styled.div`
  border: 1px solid ${(p) => p.theme.colors.wash};
  border-radius: 0.5rem;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const HeaderInput = styled(Input)`
  background: none;
  font-weight: 600;
  font-size: 1.25rem;
  margin: 0 0.5rem 0 0;
`

const ListWrapper = styled.div<{ isSection?: boolean }>`
  ${(p) =>
    p.isSection &&
    `
    border-radius: 8px;
    padding: 1rem 0;
  `}
`

const IngredientList: React.FC<IngredientListProps> = (props) => {
  const [sectionHeader, setSectionHeader] = useState(props.sectionName)
  const { register, setValue, handleSubmit } = useForm()
  const {
    ingredients,
    createIngredient,
    renameIngredient,
    moveIngredient,
    deleteIngredient,
  } = useRecipeIngredients(props.ingredients, props.sectionId, !props.editable)
  const { renameSection } = useRecipeSection()

  async function onSubmit(formData) {
    createIngredient(formData)
    setValue("freeform", "")
  }
  const onHeaderRename = () => {
    renameSection(sectionHeader, props.sectionId)
  }
  return (
    <div>
      {props.editable ? (
        <ListWrapper isSection={props.sectionId != null}>
          {props.sectionName && (
            <HeaderEdit>
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
          )}
          <DragDropContext onDragEnd={moveIngredient}>
            <Droppable droppableId="ingredients" direction="vertical">
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
                          />
                        </div>
                      )
                    )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {ingredients && ingredients.length > 0 && <Separator />}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                margin: "0.5rem 0",
              }}
            >
              <ItemWrapper>
                <Plus />
                <InlineInput
                  type="text"
                  placeholder={`Add an ingredient${
                    props.sectionName ? " to this section" : ""
                  }...`}
                  name="freeform"
                  ref={register}
                />
                {props.sectionId && (
                  <input
                    type="hidden"
                    name="sectionId"
                    value={props.sectionId}
                    ref={register}
                  />
                )}
              </ItemWrapper>
              <PrimaryButton
                onClick={handleSubmit(onSubmit)}
                icon={<PlusCircle />}
                hiddenLabel
              >
                {" "}
                Add an ingredient
              </PrimaryButton>
            </div>
          </form>
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
