import useRecipes from "../lib/useRecipes"
import Loader from "./system/Loader"
import RecipeListItem from "./RecipeListItem"
import styled from "styled-components"
import { H2 } from "./system/Typography"
import { PrimaryButton } from "./system/Button"
import { PlusCircle } from "react-feather"
import { useUser } from "../lib/useUser"
import Link from "next/link"

const EmptySlate = styled.div`
  background: ${(p) => p.theme.colors.wash};
  border-radius: 0.5rem;
  & img {
    margin: 0 auto;
    display: block;
    width: 662px;
    max-width: 100%;
  }
`
const TextWrapper = styled.div`
  margin: 2rem auto;
  padding: 0 1rem 4rem;
  box-sizing: border-box;
  width: 32rem;
  max-width: 100%;
  a {
    background: ${(p) => p.theme.colors.accentWash};
    color: ${(p) => p.theme.colors.text};
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-weight: 600;
  }
`
const WelcomeTitle = styled(H2)`
  font-size: 2rem;
  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    font-size: 1.75rem;
  }
`

const RecipeList: React.FC = () => {
  const user = useUser()
  const { recipes, createRecipe } = useRecipes()
  return (
    <div className="page">
      <main style={{ marginTop: "3rem" }}>
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeListItem key={recipe.id} recipe={recipe} />
          ))
        ) : recipes && user ? (
          <EmptySlate>
            <img src="/images/welcome.svg" />
            <TextWrapper>
              <WelcomeTitle> Welcome, {user.name}!</WelcomeTitle>
              <p>
                I created Heirloom as a better way to save and re-visit my
                favorite recipes. They were all over the internet, hard to work
                with, and sometimes they just vanished.
              </p>
              <p>
                Heirloom favors speed and ease of use, and I'm planning to keep
                it as uncomplicated as possible. Whenever you're ready, feel
                free to{" "}
                <a href="" onClick={() => createRecipe()}>
                  create your first recipe
                </a>{" "}
                or
                <Link href="/bookmark/howto">save one from the web</Link>.
              </p>
              <p>
                I’m hoping this place brings you joy, and please let me know if
                you’d like to see some changes or improvements.
              </p>
              <p>
                Cheers, <br />
                Matej
              </p>
            </TextWrapper>
          </EmptySlate>
        ) : (
          <Loader />
        )}
      </main>
    </div>
  )
}

export default RecipeList
