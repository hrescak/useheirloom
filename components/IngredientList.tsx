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

const Separator = styled.div`
  height: 2px;
  background: ${(p) => p.theme.colors.wash};
  margin: 0.75rem;
`
const ItemWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  padding: 0 4px 0 12px;
  margin-right: 8px;
  background: ${(p) => p.theme.colors.wash};
`
const InlineInput = styled.input`
  border: 0;
  background: 0;
  font-size: 1rem;
  padding: 16px;
  flex: 2;
`
const ListWrapper = styled.div<{ isSection?: boolean }>`
  ${(p) =>
    p.isSection &&
    `
    border: 1px solid black;
    border-radius: 8px;
    padding: 1rem;
  `}
`

const IngredientList: React.FC<IngredientListProps> = (props) => {
  const { register, setValue, handleSubmit } = useForm()
  const {
    createIngredient,
    renameIngredient,
    moveIngredient,
    deleteIngredient,
  } = useRecipeIngredients(props.ingredients)

  async function onSubmit(formData) {
    createIngredient(formData)
    setValue("freeform", "")
  }
  return (
    <div>
      {props.editable ? (
        <ListWrapper isSection={props.sectionId != null}>
          {props.sectionName && <H3>{props.sectionName}</H3>}
          <DragDropContext onDragEnd={moveIngredient}>
            <Droppable droppableId="ingredients" direction="vertical">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  {props.ingredients &&
                    _.sortBy(props.ingredients, (i) => i.priority).map(
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
          {props.ingredients && props.ingredients.length > 0 && <Separator />}
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
                  placeholder="Add an Ingredient..."
                  name="freeform"
                  ref={register}
                />
                {props.sectionId != null && (
                  <input
                    type="hidden"
                    name="section"
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
            {props.ingredients &&
              props.ingredients.length > 0 &&
              _.sortBy(props.ingredients, (i) => i.priority).map(
                (ingredient, index) => (
                  <li key={ingredient.freeform} style={{ padding: "4px 0" }}>
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
