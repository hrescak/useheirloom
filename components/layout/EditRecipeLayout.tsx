import React,{ ReactNode } from 'react'
import Wrapper from '../system/Wrapper'
import {ChevronLeft, CheckCircle} from 'react-feather'
import {PrimaryButton, AccentButton} from '../system/Button'
import Link from 'next/link'
import HeaderWrapper from './HeaderWrapper'

type Props = {
  children: ReactNode
  recipeId: number
  saveClicked: () => any
}
const Layout: React.FC<Props> = ( props ) => (
    <div>
    <HeaderWrapper reverse>
        <Link href={`/recipes/${props.recipeId}`}>
            <PrimaryButton icon={<ChevronLeft/>}>Back</PrimaryButton>
        </Link>
        <div style={{flex:2}}/>
        <AccentButton icon={<CheckCircle/>} onClick = {props.saveClicked}>Save Changes</AccentButton>

    </HeaderWrapper>
    <Wrapper>
        <div className="layout">{props.children}</div>
    </Wrapper>
  </div>
)
export default Layout
