import styled from "styled-components"
import Button from "./Button"
import theme from "../theme"

export const OutlineButton = styled(Button)`
  border: 2px solid ${theme.colors.text};
  color: ${theme.colors.text};
`
