import React, { useState } from "react"
import Layout from "../../../components/layout/Layout"
import { WithUser } from "../../../components/hoc/withUser"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { RecipeProps } from "../../../types"
import SectionHeader from "../../../components/system/SectionHeader"
import { Input, Textarea, Label } from "../../../components/system/Form"
import {
  InlineButton,
  PrimaryButton,
  AccentButton,
} from "../../../components/system/Button"
import { Plus, ChevronLeft, Trash2, CheckCircle } from "react-feather"
import { useFetcher } from "../../../lib/hooks"
import Link from "next/link"
import styled from "styled-components"
import Stack from "../../../components/system/Stack"
import RecipeIngredients from "../../../components/RecipeIngredients"
import _ from "lodash"

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
  const {
    data,
    error,
    mutate,
  }: { data?: RecipeProps; error?: any; mutate?: any } = useFetcher(
    `/api/recipes/${slug}`,
    slug != undefined
  )
  const { register, handleSubmit, errors } = useForm()
  async function onSubmit(formData) {
    console.log(formData)
    mutate(formData, false)
    const payload = _.pickBy(formData, (value, key) => data[key] != value)
    console.log(payload)
    mutate(
      await fetch(`/api/recipes/${slug}`, {
        method: "POST",
        body: JSON.stringify(payload),
      })
    )
      .then((p) => p.json())
      .then((data) => router.push(`/r/${data.publicID}`))
  }

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this recipe?")) {
      mutate(
        await fetch(`/api/recipes/${slug}`, {
          method: "DELETE",
          body: JSON.stringify(data),
        })
      ).then((p) => router.push(`/`))
    }
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
            onClick={() => handleDelete()}
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
        defaultValue={data?.name}
        ref={register}
      />
      {((!showSummary && !data?.summary) ||
        (!showSource && !data?.sourceName)) && (
        <div>
          {!showSummary && !data?.summary && (
            <InlineButton onClick={() => setShowSummary(true)} icon={<Plus />}>
              Add a Summary
            </InlineButton>
          )}
          {!showSource && !data?.sourceName && (
            <InlineButton onClick={() => setShowSource(true)} icon={<Plus />}>
              Add Source
            </InlineButton>
          )}
        </div>
      )}
      {(showSummary || data?.summary) && (
        <>
          <Label>Recipe Summary or Description</Label>
          <Textarea
            name="summary"
            defaultValue={data?.summary}
            ref={register}
            rows={3}
          />
        </>
      )}
      {(showSource || data?.sourceName) && (
        <Stack row>
          <Half style={{ paddingRight: "1rem" }}>
            <Label>Source Title</Label>
            <Input
              type="text"
              placeholder="Food blog name, or 'Grandma'"
              name="sourceName"
              defaultValue={data?.sourceName}
              ref={register}
            />
          </Half>
          <Half style={{ paddingLeft: "1rem" }}>
            <Label>Optional Source URL</Label>
            <Input
              type="url"
              placeholder="http://"
              name="sourceURL"
              defaultValue={data?.sourceURL}
              ref={register}
            />
          </Half>
        </Stack>
      )}
      <SectionHeader>Ingredients</SectionHeader>
      <RecipeIngredients
        recipePublicId={data?.publicID}
        editable={true}
        initialData={data?.ingredients}
        sections={data?.ingredientSections}
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
        defaultValue={data?.instructions}
        ref={register}
        rows={20}
      />
    </Layout>
  )
}

export default WithUser(EditRecipe)
