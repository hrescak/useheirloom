import { useRecipes } from '../lib/hooks'
import Loader from "./system/Loader";
import RecipeListItem from "./RecipeListItem";


const RecipeList: React.FC = () => {
    const recipes = useRecipes();
    return(
        <div className="page">
            <main style={{marginTop:'3rem'}}>
            {recipes ? (
                recipes.map(recipe =>  <RecipeListItem key={recipe.id} recipe={recipe}/>)
            ) : (
                <Loader/>
            ) 
            }
            </main>
        </div>
    )
}

export default RecipeList