import React,{ ReactNode } from 'react'
import {useUser, useCreateRecipe} from '../../lib/hooks'
import HeaderWrapper from './HeaderWrapper'
import Wrapper from '../system/Wrapper'
import Link from 'next/link'
import {LogIn, PlusCircle} from 'react-feather'
import { OutlineButton } from '../system/Button'
import Meta from './Meta'
import UserMenu from '../UserMenu'

type Props = {
  children: ReactNode
  title? : string
}

const Layout: React.FC<Props> = ( props ) => {
  const user = useUser()
  const createRecipe = useCreateRecipe();
  return(
  <>
    <Meta title={props.title}/>
    <HeaderWrapper>
      <img src="/images/logo.png" height="42" alt="Heirloom in script typeface"/>
      <div style={{flex:2}}/>
          { user ? (
            <>
            <OutlineButton onClick={()=> createRecipe()} icon={<PlusCircle/>} style={{marginRight:"8px"}}>New Recipe</OutlineButton>
            <UserMenu/>
            </>
          ) : (
            <Link href="/login">
              <OutlineButton icon={<LogIn/>}>Log In</OutlineButton>
            </Link>
          )
        }
    </HeaderWrapper>
    <Wrapper>
      <div>{props.children}</div>
    </Wrapper>
  </>
)}

export default Layout
