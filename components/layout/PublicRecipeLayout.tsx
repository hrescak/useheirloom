import React,{ ReactNode } from 'react'
import Wrapper from '../system/Wrapper'
import styled from 'styled-components'
import {ChevronLeft, Edit3, Share, Globe} from 'react-feather'
import {InlineButton, OutlineButton} from '../system/Button'
import Link from 'next/link'
import HeaderWrapper from './HeaderWrapper'
import Meta from './Meta'

type Props = {
  children: ReactNode
  title? : string
}
const Layout: React.FC<Props> = ( props ) => (
    <>
    <Meta title={props.title && props.title + " · Heirloom"}/>
    <HeaderWrapper>
        <div style={{height:"44p;x"}}>&nbsp;</div>
    </HeaderWrapper>
    <Wrapper>
    <div>{props.children}</div>
  </Wrapper>
  </>
)
export default Layout
