import styled from 'styled-components'
import { AlertTriangle } from 'react-feather'

const Err = styled.div`
  position:absolute;
  right:1rem;
  bottom:-0.5rem;
  background: ${p=>p.theme.colors.errorWash};
  border-radius:4px;
  padding: 4px 8px;
  font-size:0.875rem;
  color:${p=>p.theme.colors.error} ;
`
const ErrWrapper = styled.div`
    position:relative;
    height:0px;
`

export const FormError: React.FC<{title:string}> = ({title}) => (
    title && 
        <ErrWrapper>
            <Err><AlertTriangle size={16} style={{verticalAlign:'middle',margin:'-3px 5px 0 0'}}/>{title}</Err>
        </ErrWrapper>
) || null