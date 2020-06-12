import styled from 'styled-components'
import Button from './Button'

export const InlineButton = styled(Button)<{noMargin?:boolean}>`
    ${p=>p.noMargin ? 'padding:4px 0;margin-left:-4px;' : ''}
`