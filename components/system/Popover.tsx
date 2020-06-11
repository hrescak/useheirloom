import styled from 'styled-components'
import Tippy from '@tippyjs/react'
import theme from './theme'

const Popover = styled(Tippy)`
  background: ${theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,.15), 0 1px 3px rgba(0,0,0,.2);
  overflow: hidden;
  outline: none;
`;
export default Popover