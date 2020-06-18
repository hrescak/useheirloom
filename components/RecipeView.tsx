import Loader from "./system/Loader"
import { P, H1 } from "./system/Typography"
import SectionHeader from "./system/SectionHeader"
import IngredientList from "./IngredientList"
import { RecipeProps } from "../types"
import styled from "styled-components"

const SourceSection = styled.div`
  font-size: 0.875rem;
  color: ${(p) => p.theme.colors.textSecondary};
  & a {
    color: ${(p) => p.theme.colors.textSecondary};
  }
  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    font-size: 1rem;
  }
`
const Summary = styled.p`
  font-style: italic;
  margin: 0 0 0.5rem;
  color: ${(p) => p.theme.colors.textSecondary};
  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    font-size: 1.125rem;
  }
`

const RecipeView: React.FC<{ data: RecipeProps }> = ({ data }) =>
  data ? (
    <>
      <H1>{data.name || "Draft Recipe"}</H1>
      {data.summary && <Summary>{data.summary}</Summary>}
      {data.sourceName && (
        <SourceSection>
          {" "}
          Source:&nbsp;
          {data.sourceURL ? (
            <a href={data.sourceURL} target="_blank" rel="noreferrer">
              {data.sourceName}
            </a>
          ) : (
            <span>{data.sourceName}</span>
          )}
        </SourceSection>
      )}
      <SectionHeader>Ingredients</SectionHeader>
      <IngredientList
        recipeId={Number(data.id)}
        editable={false}
        initialData={data.ingredients}
      />
      <SectionHeader>Instructions</SectionHeader>
      <P>{data.instructions || "No instructions yet."}</P>
    </>
  ) : (
    <Loader />
  )

export default RecipeView
