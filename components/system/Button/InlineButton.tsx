import styled from 'styled-components'
import baseStyle, {IconWrapper, ButtonProps} from './base'
import React, { ReactNode } from 'react'

interface Props extends ButtonProps {
    noMargin?: boolean
}

const StyledInlineButton = styled.a<{noMargin?:boolean}>`
    ${baseStyle}
    ${p=>p.noMargin ? 'padding:4px 0;margin-left:-4px;' : ''}
`
export const InlineButton = React.forwardRef((props:Props, ref?: React.Ref<HTMLAnchorElement>) =>{
    return(
        <StyledInlineButton ref={ref} {...props}>
            {props.icon &&
                <IconWrapper style={{marginRight:(props.children) ? '4px' : '0'}}>{props.icon}</IconWrapper>
            }
            {props.children}
        </StyledInlineButton>
    )
})