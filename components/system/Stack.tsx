import styled from "styled-components"

const Stack = styled.div<{ row?: boolean }>`
  display: flex;
  flex-direction: ${(p) => (p.row ? "row" : "column")};
  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    flex-direction: column;
  }
`

export default Stack
