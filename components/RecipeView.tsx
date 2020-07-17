import Loader from "./system/Loader"
import { H1 } from "./system/Typography"
import SectionHeader from "./system/SectionHeader"
import { RecipeProps } from "../types"
import styled from "styled-components"
import RecipeInstructions from "./RecipeInstructions"
import RecipeIngredients from "./RecipeIngredients"
import useLocalStorage from "../lib/useLocalStorage"
import { Maximize2, Minimize2 } from "react-feather"
import { OverlayButton } from "./system/Button"

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
const Image = styled.div<{ url: string; collapsed: boolean }>`
  width: 100%;
  height: 0;
  padding-top: ${(p) => (p.collapsed ? "56px" : "48%")};
  background-color: ${(p) => p.theme.colors.wash};
  background-image:url(${(p) => p.url});
  background-repeat:no-repeat;
  background-position: center;
  background-size: cover;
  border-radius:0.375rem;
  margin-top:1rem;
  position: relative;
  transition: ${(p) => p.theme.transition};

  > button {
    opacity: 0
    position:absolute;
    top:8px;
    right:8px;
  }
  &:hover > button {
    opacity:1
  }
`

const RecipeView: React.FC<{ data: RecipeProps; user: any }> = ({
  data,
  user,
}) => {
  const [imageCollapsed, setImageCollapsed] = useLocalStorage(
    "imageCollapsed",
    false
  )
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
      {data.imageURL && (
        <Image url={data.imageURL} collapsed={imageCollapsed}>
          <OverlayButton
            icon={imageCollapsed ? <Maximize2 /> : <Minimize2 />}
            hiddenLabel={true}
            onClick={() => setImageCollapsed(!imageCollapsed)}
          >
            Collapse / Expand Image
          </OverlayButton>
        </Image>
      )}
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
