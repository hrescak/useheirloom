import { IngredientItemProps } from "../types"
import { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import styled from "styled-components"
import { AlignJustify, Trash2 } from "react-feather"
import { PrimaryButton, InlineButton } from "./system/Button"

const ItemWrapper = styled.div`
  align-items: center;
  background: ${(p) => p.theme.colors.wash};
  border-radius: 8px;
  box-sizing: border-box;
  color: ${(p) => p.theme.colors.textSecondary};
  display: flex;
  flex-direction: row;
  padding: 0 4px 0 12px;
  width: 100%;
`
const ItemRow = styled.div<{ dragged?: boolean; otherDragged?: boolean }>`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 4px 0;
  border-radius: 8px;
  transition: ${(p) => p.theme.transition};
  ${ItemWrapper} {
    ${(p) =>
      p.dragged &&
      `
      box-shadow: 0 3px 8px rgba(0,0,0,.2);
    `}
  }
  ${InlineButton} {
    display: none;
  }
  &:hover ${ItemWrapper} {
    ${(p) =>
      !(p.dragged || p.otherDragged) &&
      `
      margin-right: 8px;
    `}
  }
  &:hover ${InlineButton} {
    ${(p) =>
      !(p.dragged || p.otherDragged) &&
      `
      display:block;
    `}
  }
`
const InlineInput = styled.input`
  border: 0;
  background: 0;
  flex: 2;
  font-size: 1rem;
  padding: 1rem;
  padding-left: 0.5rem;
`

const IngredientItem: React.FC<IngredientItemProps> = (props) => {
  const [freeform, setFreeform] = useState(props.ingredient.freeform)
  if (props.editable) {
    return (
      <Draggable
        draggableId={"did" + props.ingredient.id}
        index={props.idx}
        key={props.ingredient.id}
        type="INGREDIENT"
      >
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <ItemRow
              aria-label="Editable Ingredient Item"
              dragged={snapshot.isDragging}
              otherDragged={props.isDragging}
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
                      <PrimaryButton
                        onClick={() =>
                          props.onEdit(props.ingredient.id, freeform)
                        }
                      >
                        Save
                      </PrimaryButton>
                    )}
                  </span>
                )}
              </ItemWrapper>
              <InlineButton
                onClick={() => props.onDelete(props.ingredient.id)}
                icon={<Trash2 />}
                hiddenLabel
              >
                Delete Ingredient
              </InlineButton>
            </ItemRow>
          </div>
        )}
      </Draggable>
    )
  }
  return <span>{props.ingredient.freeform}</span>
}

export default IngredientItem
