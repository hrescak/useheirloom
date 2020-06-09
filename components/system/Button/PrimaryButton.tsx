import styled from 'styled-components'
import baseStyle, {IconWrapper} from './base'
import theme from '../theme'
import React,{ ReactNode }  from 'react'

export const StylePrimaryButton = styled.a`
    ${baseStyle};
    background: ${theme.colors.control};
    color: ${theme.colors.controlText};
`
interface Props {
    children?: ReactNode
    icon?: ReactNode
}

export const PrimaryButton = React.forwardRef((props:Props, ref?: React.Ref<HTMLAnchorElement>) =>{
    return(
        <StylePrimaryButton ref={ref} {...props}>
            {props.icon &&
                <IconWrapper style={{marginRight:(props.children) ? '4px' : '0'}}>{props.icon}</IconWrapper>
            }
            {props.children}
        </StylePrimaryButton>
    )
})