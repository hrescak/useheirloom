import styled from "styled-components"
import { ReactNode, ButtonHTMLAttributes } from "react"
import React from "react"
import theme from "../theme"

const Base = styled.button`
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 12px;
  display: inline-block;
  border: none;
  text-align: left;
  border-radius: 8px;
  line-height: 1.5rem;
  cursor: pointer;
  color: ${theme.colors.text};
  background: ${theme.colors.background};
  transition: ${theme.transition};
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &:hover {
    background: ${theme.colors.wash};
  }
  &:active {
    transform: scale(0.95);
  }
`
const VisuallyHidden = styled.span`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  icon?: ReactNode
  hiddenLabel?: boolean
}

export const IconWrapper = styled.span`
  display: inline-block;
  margin-top: -3px;
  vertical-align: middle;
  height: 24px;
  margin-right: 4px;
`
const Button = React.forwardRef(
  (props: ButtonProps, ref?: React.Ref<HTMLButtonElement>) => {
    return (
      <Base ref={ref} {...props}>
        {props.icon && (
          <IconWrapper style={{ marginRight: props.children ? "4px" : "0" }}>
            {props.icon}
          </IconWrapper>
        )}
        {props.hiddenLabel ? (
          <VisuallyHidden>{props.children}</VisuallyHidden>
        ) : (
          props.children
        )}
      </Base>
    )
  }
)

export default Button
