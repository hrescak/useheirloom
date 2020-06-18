import { IngredientItemProps } from "../types"
import { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import styled from "styled-components"
import { AlignJustify, Trash2 } from "react-feather"
import { PrimaryButton, InlineButton } from "./system/Button"

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

const IngredientItem: React.FC<IngredientItemProps> = (props) => {
  const [freeform, setFreeform] = useState(props.ingredient.freeform)
  async function onSave() {
    await fetch(
      `/api/recipes/${props.recipeId}/recipe-ingredients/${props.ingredient.id}`,
      {
        method: "POST",
        body: JSON.stringify({ freeform: freeform }),
      }
    ).then(() => props.revalidate())
  }
  async function onDelete() {
    await fetch(
      `/api/recipes/${props.recipeId}/recipe-ingredients/${props.ingredient.id}`,
      {
        method: "DELETE",
      }
    ).then(() => props.revalidate())
  }
  if (props.editable) {
    return (
      <Draggable
        draggableId={"did" + props.ingredient.id}
        index={props.idx}
        key={props.ingredient.id}
      >
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: " 0.5rem 0",
                alignItems: "center",
              }}
              aria-label="Editable Ingredient Item"
            >
              <ItemWrapper>
                <div style={{ height: "24px" }} {...provided.dragHandleProps}>
                  <AlignJustify />
                </div>
                <InlineInput
                  type="text"
                  value={freeform}
                  onChange={(e) => setFreeform(e.target.value)}
                />
                {props.ingredient.id && (
                  <span>
                    {props.ingredient.freeform != freeform && (
                      <PrimaryButton onClick={() => onSave()}>
                        Save
                      </PrimaryButton>
                    )}
                  </span>
                )}
              </ItemWrapper>
              <InlineButton
                onClick={() => onDelete()}
                icon={<Trash2 />}
                hiddenLabel
              >
                Delete Ingredient
              </InlineButton>
            </div>
          </div>
        )}
      </Draggable>
    )
  }
  return <span>{props.ingredient.freeform}</span>
}

export default IngredientItem
