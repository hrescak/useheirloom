import { createGlobalStyle } from "styled-components"
import normalize from "styled-normalize"
import theme from "./theme"

export const BaseStyles = createGlobalStyle`
  ${normalize}
  html {
    font-size: 16px;
    font-feature-settings: "rlig", "dlig", "case", "cpsp", "ss01";
    line-height: 1.5;
    letter-spacing: -0.011em;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }
  html,
  body,
  #__next {
    height: 100%;
  }
  body{
    background-color: ${theme.colors.background};
  }
`
