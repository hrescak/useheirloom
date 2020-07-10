import Loader from "./system/Loader"
import { P, H1, List } from "./system/Typography"
import SectionHeader from "./system/SectionHeader"
import IngredientList from "./IngredientList"
import { RecipeProps } from "../types"
import styled from "styled-components"
import ReactMarkdown from "react-markdown"
import RecipeInstructions from "./RecipeInstructions"
import RecipeIngredients from "./RecipeIngredients"

const KitchenIntro = styled.span`
  font-weight: 600;
  color: ${(p) => p.theme.colors.text};
`
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

const RecipeView: React.FC<{ data: RecipeProps; user: any }> = ({
  data,
  user,
}) => {
  return data ? (
    <>
      <H1>{data.name || "Draft Recipe"}</H1>
      {data.summary && <Summary>{data.summary}</Summary>}
      <SourceSection>
        {(!user || (user && data.authorId != user.id)) && (
          <>
            from <KitchenIntro>{data.kitchen.name}</KitchenIntro>
            {data.sourceName && " · "}
          </>
        )}
        {data.sourceName && (
          <>
            Source:&nbsp;
            {data.sourceURL ? (
              <a href={data.sourceURL} target="_blank" rel="noreferrer">
                {data.sourceName}
              </a>
            ) : (
              <span>{data.sourceName}</span>
            )}
          </>
        )}
      </SourceSection>
      <SectionHeader>Ingredients</SectionHeader>
      <RecipeIngredients
        recipePublicId={data.publicID}
        editable={false}
        sections={data.ingredientSections}
        initialData={data.ingredients}
      />
      <SectionHeader>Instructions</SectionHeader>
      <RecipeInstructions instructions={data.instructions} />
    </>
  ) : (
    <Loader />
  )
}

export default RecipeView
