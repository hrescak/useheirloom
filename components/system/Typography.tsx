import styled from 'styled-components'
import theme from './theme'

export const H1 = styled.h1`
    font-size:2.25rem;
    line-height:1.2;
    margin: 1rem 0 0.5rem;
    @media(max-width: ${theme.breakpoints.medium}) {
        font-size:2rem;
    }
`

export const H2= styled.h2`
    font-size:1.5rem;
    line-height:1.2;
    margin: 1rem 0 0.25rem;
    @media(max-width: ${theme.breakpoints.medium}) {
        font-size:1.25rem;
    }
`

export const P = styled.p`
    line-height: 1.5;
    white-space: pre-wrap;
    margin:0.75rem 0;
    @media(max-width: ${theme.breakpoints.medium}) {
        font-size:1.125rem;
    }
`

export const UL = styled.ul`
    padding: 0;
    line-height: 1.25;
    @media(max-width: ${theme.breakpoints.medium}) {
        padding: 0 1.25rem 0;
        font-size:1.125rem;
    }
`