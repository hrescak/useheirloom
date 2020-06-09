import React,{ ReactNode } from 'react'
import Wrapper from '../system/Wrapper'
import styled from 'styled-components'
import {ChevronLeft, Edit3} from 'react-feather'
import {InlineButton, OutlineButton} from '../system/Button'
import Link from 'next/link'
import HeaderWrapper from './HeaderWrapper'

type Props = {
  children: ReactNode
  recipeId: number
}
const Layout: React.FC<Props> = ( props ) => (
    <>
    <HeaderWrapper>
        <Link href={`/`}>
            <InlineButton noMargin icon={<ChevronLeft/>}>Recipes</InlineButton>
        </Link>
        <div style={{flex:2}}/>
        <Link href={`/recipes/edit/[id]`} as ={`/recipes/edit/${props.recipeId}`}>
            <OutlineButton icon={<Edit3/>}>Edit</OutlineButton>
        </Link>
    </HeaderWrapper>
    <Wrapper>
    <div className="layout">{props.children}</div>
  </Wrapper>
  </>
)
export default Layout
