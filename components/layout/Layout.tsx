import React,{ ReactNode } from 'react'
import Wrapper from '../system/Wrapper'
import Meta from './Meta'
import styled from 'styled-components'

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
const Footer = styled.div`
  height:44px;
  /* text-align: center; */
  font-size: 0.875rem;
  color:${p=>p.theme.colors.textSecondary};
  & a{
    color:${p=>p.theme.colors.textSecondary};
  }
  @media(max-width: ${p=>p.theme.breakpoints.medium}) {
        font-size:0.75rem;
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
  <Footer>
    <Wrapper>

      Heirloom · Made by <a href="http://hrescak.com" target="_blank" rel="noreferrer">Matej</a> · <a href="/"> Send Feedback</a>
    </Wrapper>
  </Footer>
  </>
)}

export default Layout
