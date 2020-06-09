import styled from 'styled-components'
import baseStyle, {IconWrapper} from './base'
import theme from '../theme'
import React,{ ReactNode }  from 'react'

export const StyledOutlineButton = styled.a`
    ${baseStyle};
    border: 2px solid ${theme.colors.text};
`
interface Props {
    children?: ReactNode
    icon?: ReactNode
}

export const OutlineButton = React.forwardRef((props:Props, ref?: React.Ref<HTMLAnchorElement>) =>{
    return(
        <StyledOutlineButton ref={ref} {...props}>
            {props.icon &&
                <IconWrapper>{props.icon}</IconWrapper>
            }
            {props.children}
        </StyledOutlineButton>
    )
})