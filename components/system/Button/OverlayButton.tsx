import styled from "styled-components"
import Button from "./Button"
import theme from "../theme"

export const OverlayButton = styled(Button)`
  background: ${theme.colors.overlayWash};
  color: ${theme.colors.inverseText};
  &:hover {
    background: ${theme.colors.inverseBackground};
  }
`
