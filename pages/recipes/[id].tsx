import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/layout/RecipeLayout'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { WithUser } from '../../components/hoc/withUser'
import { RecipeProps } from '../../types'
import Recipe from '../../components/Recipe'

const RecipePage: React.FC = () => {
  const router = useRouter()
  const {id} = router.query
  const {data, error}:{data?:RecipeProps,error?:any,mutate?:any} = useSWR(`/api/recipes/` + id,  url => fetch(url).then(r => r.json()))
  return (
    <Layout recipeId={Number(data?.id)} title={data?.name}>
      {error?(
        {error}
      ): (
        <Recipe data={data} />
      )}
    </Layout>
  )
}

export default WithUser(RecipePage);
