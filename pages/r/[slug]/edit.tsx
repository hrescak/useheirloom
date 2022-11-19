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
  const [showImage, setShowImage] = useState(false)
  const { slug } = router.query
  const { recipe, updateRecipe, deleteRecipe } = useRecipe()
  const { register, handleSubmit } = useForm()

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
        <Link href={`/r/[slug]`} as={`/r/${slug}`} legacyBehavior>
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
        defaultValue={recipe?.name}
        {...register("name")}
      />
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
        {!showImage && !recipe?.imageURL && (
          <InlineButton onClick={() => setShowImage(true)} icon={<Plus />}>
            Add Photo
          </InlineButton>
        )}
      </div>
      {(showSummary || recipe?.summary) && (
        <>
          <Label>Recipe Summary or Description</Label>
          <Textarea
            defaultValue={recipe?.summary}
            rows={3}
            {...register("summary")}
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
              defaultValue={recipe?.sourceName}
              {...register("sourceName")}
            />
          </Half>
          <Half style={{ paddingLeft: "1rem" }}>
            <Label>Optional Source URL</Label>
            <Input
              type="url"
              placeholder="http://"
              defaultValue={recipe?.sourceURL}
              {...register("sourceURL")}
            />
          </Half>
        </Stack>
      )}
      {(showImage || recipe?.imageURL) && (
        <>
          <Label>Recipe Photo URL</Label>
          <Input
            type="text"
            placeholder="https://www.recipe_photos.com/photo.png"
            defaultValue={recipe?.imageURL}
            {...register("imageURL")}
          />
        </>
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
        defaultValue={recipe?.instructions}
        rows={20}
        {...register("instructions")}
      />
    </Layout>
  )
}

export default WithUser(EditRecipe)
