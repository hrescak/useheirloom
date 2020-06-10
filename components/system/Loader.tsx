
import styled from 'styled-components'
import {BarLoader} from 'react-spinners'
import theme from './theme'

const LoaderWrapper = styled.div`
    width:100%;
    padding: 8rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
`

const Loader: React.FC = () =>(
    <LoaderWrapper>
        <BarLoader color={theme.colors.textSecondary}/>
    </LoaderWrapper>
)

export default Loader