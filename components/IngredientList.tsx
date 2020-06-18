import { IngredientListProps } from "../types"
import { RecipeIngredient } from "@prisma/client"
import useSWR from "swr"
import _ from "lodash"
import { useForm } from "react-hook-form"
import IngredientItem from "./IngredientItem"
import { Droppable, DragDropContext } from "react-beautiful-dnd"
import { useMoveRecipeIngredient } from "../lib/hooks"
import styled from "styled-components"
import { Plus, PlusCircle } from "react-feather"
import { PrimaryButton } from "./system/Button"
import { UL } from "./system/Typography"

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

const IngredientList: React.FC<IngredientListProps> = (props) => {
  const initialData = props.initialData
  const {
    data,
    mutate,
  }: {
    data?: Partial<RecipeIngredient>[]
    error?: any
    mutate?: any
  } = useSWR(
    `/api/recipes/${props.recipeId}/recipe-ingredients`,
    (url) => fetch(url).then((r) => r.json()),
    { initialData }
  )
  const { register, setValue, handleSubmit } = useForm()
  async function onMove(ingredient) {
    const mutateData = data.map((ing) =>
      ing.id == ingredient.id ? { priority: ingredient.priority, ...ing } : ing
    )
    await fetch(
      `/api/recipes/${props.recipeId}/recipe-ingredients/${ingredient.id}`,
      {
        method: "POST",
        body: JSON.stringify(ingredient),
      }
    ).then(() => mutate())
    mutate(mutateData, false)
  }
  const { moveIngredient, highestPriority } = useMoveRecipeIngredient(
    _.sortBy(data, (i) => i.priority),
    onMove
  )
  async function onSubmit(formData) {
    const mutateData = data ? [...data, formData] : [formData]
    await fetch(`/api/recipes/${props.recipeId}/recipe-ingredients`, {
      method: "POST",
      body: JSON.stringify(formData),
    }).then(() => mutate())
    mutate(mutateData, false)
    setValue("freeform", "")
  }
  return (
    <div>
      {props.editable ? (
        <>
          <DragDropContext onDragEnd={moveIngredient}>
            <Droppable droppableId="ingredients" direction="vertical">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  {data &&
                    _.sortBy(data, (i) => i.priority).map(
                      (ingredient, index) => (
                        <div key={ingredient.freeform}>
                          <IngredientItem
                            ingredient={ingredient}
                            idx={index}
                            recipeId={props.recipeId}
                            editable={props.editable}
                            revalidate={mutate}
                          />
                        </div>
                      )
                    )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {data && data.length > 0 && <Separator />}
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
                <input
                  type="hidden"
                  name="priority"
                  value={highestPriority() + 1}
                  ref={register}
                />
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
        </>
      ) : (
        <UL>
          {data && data.length > 0
            ? _.sortBy(data, (i) => i.priority).map((ingredient, index) => (
                <li key={ingredient.freeform} style={{ padding: "4px 0" }}>
                  <IngredientItem
                    ingredient={ingredient}
                    idx={index}
                    recipeId={props.recipeId}
                    editable={props.editable}
                    revalidate={mutate}
                  />
                </li>
              ))
            : "No ingredients yet."}
        </UL>
      )}
    </div>
  )
}

export default IngredientList
