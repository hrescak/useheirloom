import { useRecipes, useUser, useCreateRecipe } from '../lib/hooks'
import Loader from "./system/Loader";
import RecipeListItem from "./RecipeListItem";
import styled from 'styled-components'
import { H2 } from './system/Typography';
import { PrimaryButton } from './system/Button';
import { PlusCircle } from 'react-feather';

const EmptySlate = styled.div`
    background: ${p=>p.theme.colors.wash};
    border-radius:0.5rem;
    & img {
        margin: 0 auto;
        display:block;
        height:271px;
        width:662px;
    }
`
const TextWrapper = styled.div`
    margin: 2rem auto 3rem;
    width: 24rem;
`
const ButtonWrapper = styled.div`
    padding-bottom:4rem;
    text-align:center;
`

const RecipeList: React.FC = () => {
    const user = useUser()
    const recipes = useRecipes()
    const createRecipe = useCreateRecipe()
    return( 
        <div className="page">
            <main style={{marginTop:'3rem'}}>
            {recipes && recipes.length > 0 ? (
                recipes.map(recipe =>  <RecipeListItem key={recipe.id} recipe={recipe}/>)
            ) : (
                recipes ? (
                    <EmptySlate>
                        <img src="/images/welcome.svg"/>
                        <TextWrapper>
                            <H2 style={{fontSize:'2rem'}}> Welcome, {user.name}!</H2>
                            <p>
                            I created Heirloom because I wanted a better way to save and re-visit my favorite recipes. They were  all over the internet, hard to work with, and sometimes they just vanished.
                            </p><p>
                            Heirloom is your personal recipe book. It’s a very simple app right now, and I’m hoping to not add too many features to take away from the speed and ease of use it enjoys now.
                            <p></p>
                            I’m hoping you Heirloom brings you joy, and please let me know if you’d like to see some changes or improvements.
                            <p></p>
                            Cheers, <br/>Matej
                            </p>
                        </TextWrapper>
                        <ButtonWrapper>
                            <PrimaryButton icon={<PlusCircle/>} onClick={()=>createRecipe()}>Create your first recipe</PrimaryButton>
                        </ButtonWrapper>
                    </EmptySlate>
                ) : (
                    <Loader/>
                )
            ) 
            }
            </main>
        </div>
    )
}

export default RecipeList