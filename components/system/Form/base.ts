import {css} from 'styled-components'
import theme from '../theme'

const baseStyle = css`
    box-sizing: border-box;
    width:100%;
    display: inline-block;
    font-size: 1rem;
    border-radius:8px;
    border:0;
    padding:16px;
    color: ${theme.colors.wash};
    background: ${theme.colors.wash};
    margin: 0.5rem 0;
`

export default baseStyle