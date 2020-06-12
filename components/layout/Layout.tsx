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

const HeaderWrapper = styled.div<{reverse?:boolean}>`
    padding: 1rem 0;
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
  </>
)}

export default Layout
