import styled from "styled-components"
import theme from "./theme"

const Wrapper = styled.div`
  margin: 0 auto;
  width: 46rem;
  box-sizing: border-box;
  @media (max-width: ${theme.breakpoints.medium}) {
    width: 100%;
    margin: 0;
    padding: 0 1rem;
  }
`

export default Wrapper
