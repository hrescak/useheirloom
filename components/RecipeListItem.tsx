import React from 'react'
import styled from 'styled-components'
import { Recipe } from '@prisma/client'
import Link from 'next/link'
import { H2 } from './system/Typography'
import { FileText, Globe, Lock, AlignJustify, Link2 } from 'react-feather'

interface Props {
    recipe:Recipe
    key: string | number
}

const Description = styled.div`
    color:${p=>p.theme.colors.textSecondary};
`
const Meta = styled.div`
    font-size: 0.75rem;
    margin-top: 0.5rem;
    color:${p=>p.theme.colors.textSecondary};
`
const RecipeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
    align-items: center;
`
const RecipePreview = styled.div`
    width:3.5rem;
    height:3.5rem;
    display:flex;
    align-items:center;
    justify-content: center;
    margin-right:1rem;
    box-sizing: border-box;
    border: 2px solid ${p=>p.theme.colors.wash};
    border-radius:4px;
    align-self: flex-start;
`

const RecipeContent = styled.div`
    display:block;
    flex:2;
    text-decoration: none;
    color:${p=>p.theme.colors.text};
    cursor:pointer;
    &:hover ${Description}{
        color:${p=>p.theme.colors.text};
    }
`
const RecipeListItem: React.FC<Props> = ({recipe, key}) =>{
    return (
        <div key={key}>
            <Link href={`/recipes/[id]`} as={`/recipes/${recipe.id}`}>
                <RecipeWrapper>
                    <RecipePreview>
                        <FileText/>
                    </RecipePreview>
                <RecipeContent>
                    <H2 style={{marginTop:'0.25rem'}}>{recipe.name ? recipe.name : "Untitled Recipe"}</H2>
                    {recipe.summary && 
                        <Description> {recipe.summary.slice(0,200)} </Description>
                    }
                    <Meta>
                        {recipe.isPublic? (
                            <span><Globe size={12} style={{margin:'-3px 4px 0 0',verticalAlign:'middle'}}/>Public Recipe</span>
                        ):(
                            <span><Lock size={12} style={{margin:'-3px 4px 0 0',verticalAlign:'middle'}}/>Private Recipe</span>
                        )}
                        {recipe.sourceName && 
                            <span><Link2 size={12} style={{margin:'-3px 4px 0 12px',verticalAlign:'middle'}}/> from {recipe.sourceName}</span>
                        }
                    </Meta>
                </RecipeContent>
                </RecipeWrapper>
            </Link>
        </div>
    )
}

export default RecipeListItem