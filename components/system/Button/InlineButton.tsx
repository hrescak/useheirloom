import styled from 'styled-components'
import Button from './Button'

export const InlineButton = styled(Button)<{noMargin?:boolean}>`
    ${p=>p.noMargin ? 'padding:8px;margin-left:-12px;' : ''}
`