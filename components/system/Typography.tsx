import styled, { css } from "styled-components"
import theme from "./theme"

const headingBase = css`
  line-height: 1.2;
  font-weight: 600;
`
export const H1 = styled.h1`
  ${headingBase}
  font-size: 2.25rem;
  margin: 1rem 0 0.5rem;
  @media (max-width: ${theme.breakpoints.medium}) {
    font-size: 2rem;
  }
`
export const H1Small = styled.h1`
  ${headingBase}
  font-size: 1.75rem;
  margin: 1rem 0 0.5rem;
  @media (max-width: ${theme.breakpoints.medium}) {
    font-size: 1.5rem;
  }
`
export const H2 = styled.h2`
  ${headingBase}
  font-size: 1.5rem;
  margin: 1rem 0 0.25rem;
  @media (max-width: ${theme.breakpoints.medium}) {
    font-size: 1.25rem;
  }
`
export const H3 = styled.h3`
  ${headingBase}
  font-size: 1.25rem;
  margin: 0.75rem 0 0.25rem;
  @media (max-width: ${theme.breakpoints.medium}) {
    font-size: 1.125rem;
  }
`

export const P = styled.p`
  line-height: 1.5;
  white-space: pre-wrap;
  margin: 0.75rem 0;
  @media (max-width: ${theme.breakpoints.medium}) {
    font-size: 1.125rem;
  }
`

export const UL = styled.ul`
  margin-top: 0.5rem;
  padding: 0;
  line-height: 1.25;
  @media (max-width: ${theme.breakpoints.medium}) {
    padding: 0 1.25rem 0;
    font-size: 1.125rem;
  }
`

export const OL = styled.ol`
  margin-top: 0.5rem;
  padding: 0;
  line-height: 1.25;
  @media (max-width: ${theme.breakpoints.medium}) {
    padding: 0 1.25rem 0;
    font-size: 1.125rem;
  }
`

export const List: React.FC<{ ordered?: boolean }> = (props) =>
  props.ordered ? <OL {...props} /> : <UL {...props} />

export const Heading: React.FC<{ level?: number }> = (props) => {
  switch (props.level) {
    case 1:
      return <H1Small {...props} />
    case 2:
      return <H2 {...props} />
    default:
      return <H3 {...props} />
  }
  return <H3 {...props} />
}
