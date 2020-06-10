import React from 'react'
import { useRouter } from 'next/router'
import { RecipeProps } from '../../types'
import Recipe from '../../components/Recipe'
import { useFetcher } from '../../lib/hooks'
import Wrapper from '../../components/system/Wrapper'

const RecipePage: React.FC = () => {
  const router = useRouter()
  const {slug} = router.query
  const {data, error}:{data?:RecipeProps,error?:any} = useFetcher(`/api/recipes/slug/` + slug)
  return (
    <Wrapper>
        <div style={{height:'92px'}}/>
        {error ? (
          <p>{error.message}</p>
        ): (
          <Recipe data={data} />
        ) 
        }
    </Wrapper>
  )
}

export default RecipePage;
