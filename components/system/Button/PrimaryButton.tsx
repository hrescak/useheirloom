import styled from 'styled-components'
import Button from './Button'
import theme from '../theme'

export const PrimaryButton = styled(Button)`
    background: ${theme.colors.control};
    color: ${theme.colors.controlText};
    &:hover{
        background:${theme.colors.controlActive}
    }
`
