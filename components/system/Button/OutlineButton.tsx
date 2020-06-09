import styled from 'styled-components'
import baseStyle, {IconWrapper, ButtonProps} from './base'
import theme from '../theme'
import React,{ ReactNode }  from 'react'

export const StyledOutlineButton = styled.a`
    ${baseStyle};
    border: 2px solid ${theme.colors.text};
`
export const OutlineButton = React.forwardRef((props:ButtonProps, ref?: React.Ref<HTMLAnchorElement>) =>{
    return(
        <StyledOutlineButton ref={ref} {...props}>
            {props.icon &&
                <IconWrapper>{props.icon}</IconWrapper>
            }
            {props.children}
        </StyledOutlineButton>
    )
})