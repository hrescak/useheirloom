import Link from "next/link"
import { useRecipes, useCreateRecipe } from '../lib/hooks'
import { H1, H2 } from "./system/Typography";
import styled from 'styled-components'

const Meta = styled.span`

`
const Recipe = styled.a`
display:block;
    text-decoration: none;
    color:${p=>p.theme.colors.text};
    margin-bottom:2rem;
    cursor:pointer;
    &:hover span{
        color:${p=>p.theme.colors.textSecondary}
    }
`

const RecipeList: React.FC = () => {
    const recipes = useRecipes();
    const createRecipe = useCreateRecipe();
    return(
        <div className="page">
            <H1>Recipes</H1>
            <main style={{marginTop:'2rem'}}>
            {recipes && recipes.map(recipe => (
                <div key={recipe.id} >
                <Link href={`/recipes/[id]`} as={`/recipes/${recipe.id}`}>
                    <Recipe>
                        <H2>{recipe.name ? recipe.name : "Untitled Recipe"}</H2>
                        <Meta>
                        {recipe.sourceName && 'From ' + recipe.sourceName + '. '}{recipe.summary && recipe.summary.slice(0,200)}.</Meta>
                    </Recipe>
                </Link>
                </div>
            ))}
            </main>
        </div>
    )
}

export default RecipeList