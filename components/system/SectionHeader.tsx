import styled from 'styled-components'
import theme from './theme'

const SectionHeader = styled.h2`
    text-transform: uppercase;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${theme.colors.textSecondary};
    letter-spacing:2px;
    margin-top:2rem;
    margin-bottom:0;
`

export default SectionHeader