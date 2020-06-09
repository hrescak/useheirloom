import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/layout/RecipeLayout'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { WithUser } from '../../components/hoc/withUser'
import { RecipeProps } from '../../types'
import IngredientList from '../../components/IngredientList'
import SectionHeader from '../../components/system/SectionHeader'
import { H1,P } from '../../components/system/Typography'
import styled from 'styled-components'

const SourceSection = styled.div`
  font-size: 0.875rem;
  color: ${p=>p.theme.colors.textSecondary};
  & a {
    color: ${p=>p.theme.colors.textSecondary}
  }
  @media(max-width: ${(p)=>p.theme.breakpoints.medium}) {
      font-size:1rem;
  }
`
const Summary = styled.p`
  font-style:italic;
  margin:0 0 0.5rem;
  color: ${p=>p.theme.colors.textSecondary};
  @media(max-width: ${(p)=>p.theme.breakpoints.medium}) {
      font-size:1.125rem;
  }
`

const RecipePage: React.FC = () => {
  const router = useRouter()
  const {id} = router.query
  const {data,error, mutate}:{data?:RecipeProps,error?:any,mutate?:any} = useSWR(`/api/recipes/${id}`,  url => fetch(url).then(r => r.json()))
  return (
    <Layout recipeId={Number(id)}>
        <H1>{data?.name || "Untitled Recipe"}</H1>
        {data?.summary && 
         <Summary>{data.summary}</Summary>
        }
        {data?.sourceName && (
            <SourceSection> Source:&nbsp;
          {data.sourceURL ? (
            <a href={data.sourceURL} target="_blank">{data.sourceName}</a>
          ) : (
            <span>{data.sourceName}</span>
          )}
          </SourceSection>
        )}
        <SectionHeader>Ingredients</SectionHeader>
          <IngredientList recipeId={Number(id)} editable={false}/>
        <SectionHeader>Instructions</SectionHeader>
        <P>
          {data?.instructions || 'Instructions unclear'}
        </P>
    </Layout>
  )
}

export default WithUser(RecipePage);
