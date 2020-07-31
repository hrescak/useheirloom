import React, { ReactNode } from "react"
import { useForm } from "react-hook-form"
import { Plus, PlusCircle } from "react-feather"
import styled from "styled-components"
import { PrimaryButton } from "./system/Button"

interface NewIngredientFormProps {
  children?: ReactNode
  placeholder?: string
  sectionId?: number
  onFormSubmit: (any) => void
}

const ItemWrapper = styled.div`
  align-items: center;
  color: ${(p) => p.theme.colors.textSecondary};
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  padding: 0 4px 0 12px;
  width: 100%;
`
const InlineInput = styled.input`
  background: 0;
  border: 0;
  flex: 2;
  font-size: 1rem;
  padding: 1rem;
  padding-left: 0.5rem;
`

const NewIngredientForm: React.FC<NewIngredientFormProps> = ({
  placeholder,
  onFormSubmit,
  sectionId,
}) => {
  const { register, watch, setValue, handleSubmit } = useForm()
  const watchNewIngredient = watch("freeform")
  async function onSubmit(formData) {
    onFormSubmit(formData)
    setValue("freeform", "")
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ItemWrapper>
          <Plus />
          <InlineInput
            type="text"
            placeholder={placeholder ? placeholder : `Add new item...`}
            name="freeform"
            ref={register}
          />
          {sectionId && (
            <input
              type="hidden"
              name="sectionId"
              value={sectionId}
              ref={register}
            />
          )}
        </ItemWrapper>
        {watchNewIngredient && (
          <PrimaryButton
            style={{ marginLeft: "8px" }}
            onClick={handleSubmit(onSubmit)}
            icon={<PlusCircle />}
            hiddenLabel
          >
            {" "}
            Add an ingredient
          </PrimaryButton>
        )}
      </div>
    </form>
  )
}

export default NewIngredientForm
