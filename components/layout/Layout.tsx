import React,{ ReactNode } from 'react'
import Wrapper from '../system/Wrapper'
import Meta from './Meta'
import styled from 'styled-components'
import Footer from './Footer'
import Head from 'next/head'

type Props = {
  children: ReactNode
  title? : string
  invertHeader? : boolean;
  leftControl?: ReactNode
  rightControl?: ReactNode
}

const PageWrap = styled.div`
  min-height:100%;
  box-sizing: border-box;
  padding-bottom: 128px;
  margin-bottom:-44px;
  &:after{
    content:"";
    display:block;
  }
`

const HeaderWrapper = styled.div<{reverse?:boolean}>`
    padding: 1rem 0;
    min-height: 44px;
    ${p=>p.reverse?'background:#000' : ''};
    margin-bottom: 2rem;
`
const InnerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Layout: React.FC<Props> = ( props ) => {
  return(
  <>
  <PageWrap>
    <Meta title={props.title}/>
    <Head>
      <meta name="apple-mobile-web-app-status-bar-style" content={props.invertHeader ? "black" :"default"} />
    </Head>
    <HeaderWrapper reverse={props.invertHeader}>
      <Wrapper>
        <InnerWrapper>
          {props.leftControl}
          <div style={{flex:2}}/>
          {props.rightControl}
       </InnerWrapper>
      </Wrapper>
    </HeaderWrapper>
    <Wrapper>
      <div>{props.children}</div>
    </Wrapper>
  </PageWrap>
  <Footer />
  </>
)}

export default Layout
