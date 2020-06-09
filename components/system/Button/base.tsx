import styled, {css} from 'styled-components'
import { AnchorHTMLAttributes, ReactNode } from 'react'

const baseStyle = css`
    font-size:1rem;
    font-weight: 500;
    padding:8px 12px;
    display: inline-block;
    border-radius: 8px;
    line-height:1.5rem;
    cursor:pointer;
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

export default baseStyle