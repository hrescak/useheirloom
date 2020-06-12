import React from 'react'
import { useRouter } from 'next/router'
import { RecipeProps } from '../../types'
import RecipeView from '../../components/RecipeView'
import { useFetcher } from '../../lib/hooks'
import Layout from '../../components/layout/Layout'
import { InlineButton } from '../../components/system/Button'
import { User } from 'react-feather'

const RecipePage: React.FC = () => {
  const router = useRouter()
  const {slug} = router.query
  const {data, error}:{data?:RecipeProps,error?:any} = useFetcher(`/api/recipes/slug/` + slug)
  return (
    <Layout title={data?.name} leftControl={<InlineButton noMargin icon={<User/>}>{data?.kitchen.name}</InlineButton>}>
        {error ? (
          <p>{error.message}</p>
        ): (
          <RecipeView data={data} />
        )}
    </Layout>
  )
}

export default RecipePage;
