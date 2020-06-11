import React,{ ReactNode } from 'react'
import Wrapper from '../system/Wrapper'
import styled from 'styled-components'
import {User} from 'react-feather'
import {InlineButton} from '../system/Button'
import Link from 'next/link'
import HeaderWrapper from './HeaderWrapper'
import Meta from './Meta'

type Props = {
  children: ReactNode
  title? : string
  kitchenName: string
}
const Layout: React.FC<Props> = ( props ) => (
    <>
    <Meta title={props.title && props.title + " · Heirloom"}/>
    <HeaderWrapper>
        <InlineButton noMargin icon={<User/>}>{props.kitchenName}</InlineButton>
        <div style={{height:"44p;x"}}>&nbsp;</div>
    </HeaderWrapper>
    <Wrapper>
    <div>{props.children}</div>
  </Wrapper>
  </>
)
export default Layout
