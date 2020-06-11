import React,{ ReactNode } from 'react'
import Wrapper from '../system/Wrapper'
import {ChevronLeft, Edit3 } from 'react-feather'
import {InlineButton, OutlineButton} from '../system/Button'
import Link from 'next/link'
import HeaderWrapper from './HeaderWrapper'
import Meta from './Meta'
import { RecipeProps } from '../../types'
import ShareMenu from '../ShareMenu'


type Props = {
  children: ReactNode
  recipe: RecipeProps
  title? : string
}
const Layout: React.FC<Props> = ( props ) => {
  return(
    <>
      <Meta title={props.title}/>
      <HeaderWrapper>
          <Link href={`/`}>
              <InlineButton noMargin icon={<ChevronLeft/>}>Recipes</InlineButton>
          </Link>
          {props.recipe &&
            <>
              <div style={{flex:2}}/>
              <ShareMenu recipe = {props.recipe} />
              <Link href={`/recipes/edit/[id]`} as ={`/recipes/edit/${props.recipe?.id}`}>
                  <OutlineButton icon={<Edit3/>} style={{marginLeft:'1rem'}}>Edit</OutlineButton>
              </Link>
            </>
          }
      </HeaderWrapper>
      <Wrapper>
      <div>{props.children}</div>
    </Wrapper>
    </>
  )
}
export default Layout
