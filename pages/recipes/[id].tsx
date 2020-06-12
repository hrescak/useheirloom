import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/layout/Layout'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { WithUser } from '../../components/hoc/withUser'
import { RecipeProps } from '../../types'
import RecipeView from '../../components/RecipeView'
import ShareMenu from '../../components/ShareMenu'
import Link from 'next/link'
import { InlineButton, OutlineButton } from '../../components/system/Button'
import { ChevronLeft, Edit3 } from 'react-feather'

const RecipePage: React.FC = () => {
  const router = useRouter()
  const {id} = router.query
  const {data, error}:{data?:RecipeProps,error?:any,mutate?:any} = useSWR(`/api/recipes/` + id,  url => fetch(url).then(r => r.json()))
  return (
    <Layout title={data?.name}
      leftControl={
        <Link href={`/`}>
            <InlineButton noMargin icon={<ChevronLeft/>}>Recipes</InlineButton>
        </Link>
      }
      rightControl={
        data && (
          <>
            <ShareMenu recipe={data} />
            <Link href={`/recipes/edit/[id]`} as ={`/recipes/edit/${data?.id}`}>
                <OutlineButton icon={<Edit3/>} style={{marginLeft:'1rem'}}>Edit</OutlineButton>
            </Link>
          </>
        )
      }
      >
      {error ? (
        <p>{error.message}</p>
      ): (
        <RecipeView data={data} />
      )}
    </Layout>
  )
}

export default WithUser(RecipePage);
