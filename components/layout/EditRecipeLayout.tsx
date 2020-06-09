import React,{ ReactNode } from 'react'
import Wrapper from '../system/Wrapper'
import {ChevronLeft, CheckCircle, Trash2} from 'react-feather'
import {PrimaryButton, AccentButton} from '../system/Button'
import Link from 'next/link'
import HeaderWrapper from './HeaderWrapper'

type Props = {
  children: ReactNode
  recipeId: number
  saveClicked: () => any
  deleteClicked: () => any
}
const Layout: React.FC<Props> = ( props ) => (
    <div>
    <HeaderWrapper reverse>
        <Link href={`/recipes/[id]`} as={`/recipes/${props.recipeId}`}>
            <PrimaryButton icon={<ChevronLeft/>}>Back</PrimaryButton>
        </Link>
        <div style={{flex:2}}/>
        <PrimaryButton icon={<Trash2/>} style={{marginRight:'0.5rem'}} onClick = {props.deleteClicked}>Delete</PrimaryButton>
        <AccentButton icon={<CheckCircle/>} onClick = {props.saveClicked}>Save</AccentButton>

    </HeaderWrapper>
    <Wrapper>
        <div className="layout">{props.children}</div>
    </Wrapper>
  </div>
)
export default Layout
