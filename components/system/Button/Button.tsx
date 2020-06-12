import styled from 'styled-components'
import { AnchorHTMLAttributes, ReactNode } from 'react'
import React from 'react'
import theme from '../theme'

const Base = styled.a`
    font-size:1rem;
    font-weight: 500;
    padding:8px 12px;
    display: inline-block;
    border-radius: 8px;
    line-height:1.5rem;
    cursor:pointer;
    color:${theme.colors.text};
    background:${theme.colors.background};
    transition: ${theme.transition};
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    &:hover{
        background:${theme.colors.wash};
    }
    &:active{
        transform: scale(0.95)
        
    }
`
export interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement>{
    children?: ReactNode
    icon?: ReactNode
}

export const IconWrapper = styled.span`
    display: inline-block;
    margin-top:-3px;
    vertical-align:middle;
    height:24px;
    margin-right:4px;
`
const Button = React.forwardRef((props:ButtonProps, ref?: React.Ref<HTMLAnchorElement>) =>{
    return(
        <Base ref={ref} {...props}>
            {props.icon &&
                <IconWrapper style={{marginRight:(props.children) ? '4px' : '0'}}>{props.icon}</IconWrapper>
            }
            {props.children}
        </Base>
    )
})

export default Button;