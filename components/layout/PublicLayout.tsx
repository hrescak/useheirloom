import React,{ ReactNode } from 'react'
import Meta from './Meta'
import styled from 'styled-components'
import Footer from './Footer'

type Props = {
  children: ReactNode
  title? : string
}

const PageWrap = styled.div`
  min-height:100%;
  display:flex;
  align-items:center;
  justify-content: center;
  box-sizing: border-box;
  padding-bottom: 128px;
  margin-bottom:-44px;
  &:after{
    content:"";
    display:block;
  }
`
const Wrapper = styled.div`
    width:400px;
    @media(max-width: ${p=>p.theme.breakpoints.small}) {
        width:100%;
        margin: 0;
        padding: 0 1rem;
    }
`

const PublicLayout: React.FC<Props> = ( props ) => {
  return(
  <>
  <Meta title={props.title}/>
  <PageWrap>
    <Wrapper>
    {props.children}
    </Wrapper>
  </PageWrap>
  <Footer isPublic/>
  </>
)}

export default PublicLayout
