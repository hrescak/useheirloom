import React, { useState } from "react"
import Layout from "../../../components/layout/Layout"
import { WithUser } from "../../../components/hoc/withUser"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import SectionHeader from "../../../components/system/SectionHeader"
import { Input, Textarea, Label } from "../../../components/system/Form"
import {
  InlineButton,
  PrimaryButton,
  AccentButton,
} from "../../../components/system/Button"
import { Plus, ChevronLeft, Trash2, CheckCircle } from "react-feather"
import Link from "next/link"
import styled from "styled-components"
import Stack from "../../../components/system/Stack"
import RecipeIngredients from "../../../components/RecipeIngredients"
import _ from "lodash"
import useRecipe from "../../../lib/useRecipe"

const Aside = styled.span`
  display: flex;
  margin-top: 2.5rem;
  font-size: 0.75rem;
  color: ${(p) => p.theme.colors.textSecondary};
  & a {
    color: ${(p) => p.theme.colors.textSecondary};
  }
  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    margin-top: 0.5rem;
  }
`
const Half = styled.div`
  width: 50%;
  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    width: 100%;
    padding: 0 !important;
  }
`

const EditRecipe: React.FC = () => {
  const router = useRouter()
  const [showSummary, setShowSummary] = useState(false)
  const [showSource, setShowSource] = useState(false)
  const { slug } = router.query
  const { recipe, updateRecipe, deleteRecipe } = useRecipe()
  const { register, handleSubmit, errors } = useForm()

  async function onSubmit(formData) {
    const payload = _.pickBy(formData, (value, key) => recipe[key] != value)
    // if there's nothing to change, navigate right away
    if (_.isEmpty(payload)) {
      router.push(`/r/${slug}`)
      return
    }
    // save data and redirect to recipe page
    updateRecipe(payload, true)
  }
  return (
    <Layout
      invertHeader
      title="Edit Recipe"
      leftControl={
        <Link href={`/r/[slug]`} as={`/r/${slug}`}>
          <PrimaryButton icon={<ChevronLeft />}>Back</PrimaryButton>
        </Link>
      }
      rightControl={
        <>
          <PrimaryButton
            icon={<Trash2 />}
            style={{ marginRight: "0.5rem" }}
            onClick={() => deleteRecipe()}
          >
            Delete
          </PrimaryButton>
          <AccentButton icon={<CheckCircle />} onClick={handleSubmit(onSubmit)}>
            Save
          </AccentButton>
        </>
      }
    >
      <Label>Recipe Title</Label>
      <Input
        type="text"
        placeholder="Something super tasty"
        name="name"
        defaultValue={recipe?.name}
        ref={register}
      />
      {((!showSummary && !recipe?.summary) ||
        (!showSource && !recipe?.sourceName)) && (
        <div>
          {!showSummary && !recipe?.summary && (
            <InlineButton onClick={() => setShowSummary(true)} icon={<Plus />}>
              Add a Summary
            </InlineButton>
          )}
          {!showSource && !recipe?.sourceName && (
            <InlineButton onClick={() => setShowSource(true)} icon={<Plus />}>
              Add Source
            </InlineButton>
          )}
        </div>
      )}
      {(showSummary || recipe?.summary) && (
        <>
          <Label>Recipe Summary or Description</Label>
          <Textarea
            name="summary"
            defaultValue={recipe?.summary}
            ref={register}
            rows={3}
          />
        </>
      )}
      {(showSource || recipe?.sourceName) && (
        <Stack row>
          <Half style={{ paddingRight: "1rem" }}>
            <Label>Source Title</Label>
            <Input
              type="text"
              placeholder="Food blog name, or 'Grandma'"
              name="sourceName"
              defaultValue={recipe?.sourceName}
              ref={register}
            />
          </Half>
          <Half style={{ paddingLeft: "1rem" }}>
            <Label>Optional Source URL</Label>
            <Input
              type="url"
              placeholder="http://"
              name="sourceURL"
              defaultValue={recipe?.sourceURL}
              ref={register}
            />
          </Half>
        </Stack>
      )}
      <SectionHeader>Ingredients</SectionHeader>
      <RecipeIngredients
        recipePublicId={recipe?.publicID}
        editable={true}
        initialData={recipe?.ingredients}
        sections={recipe?.ingredientSections}
      />
      <Stack row>
        <SectionHeader style={{ flex: 2 }}>Instructions</SectionHeader>
        <Aside>
          Supports&nbsp;{" "}
          <a
            href="https://github.github.com/gfm/#what-is-github-flavored-markdown-"
            target="_blank"
            rel="noreferrer"
          >
            Github-flavored Markdown
          </a>
        </Aside>
      </Stack>
      <Textarea
        name="instructions"
        defaultValue={recipe?.instructions}
        ref={register}
        rows={20}
      />
    </Layout>
  )
}

export default WithUser(EditRecipe)
