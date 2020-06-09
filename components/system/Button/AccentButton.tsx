import styled from 'styled-components'
import baseStyle, {IconWrapper, ButtonProps} from './base'
import theme from '../theme'
import React from 'react'

export const StyleAccentButton = styled.a`
    ${baseStyle};
    background: ${theme.colors.accent};
`

export const AccentButton = React.forwardRef((props:ButtonProps, ref?: React.Ref<HTMLAnchorElement>) =>{
    return(
        <StyleAccentButton ref={ref} {...props}>
            {props.icon &&
                <IconWrapper>{props.icon}</IconWrapper>
            }
            {props.children}
        </StyleAccentButton>
    )
})