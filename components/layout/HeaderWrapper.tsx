import React from 'react'
import styled from 'styled-components'
import Wrapper from '../system/Wrapper'

interface Props {
  children?: React.ReactNode
  reverse? : boolean
}

const StyledHeaderWrapper = styled.div<{reverse?:boolean}>`
    padding: 1rem 0;
    ${p=>p.reverse?'background:#000' : ''};
    margin-bottom: 2rem;
`
const InnerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const HeaderWrapper : React.FC<Props> = (props) => {

  return (
    <StyledHeaderWrapper reverse={props.reverse}>
      <Wrapper>
        <InnerWrapper>
          {props.children}
        </InnerWrapper>
      </Wrapper>
    </StyledHeaderWrapper>
  )
} 

export default HeaderWrapper