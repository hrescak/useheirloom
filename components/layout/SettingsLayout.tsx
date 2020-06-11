import React,{ ReactNode } from 'react'
import Wrapper from '../system/Wrapper'
import {ChevronLeft, CheckCircle, Trash2} from 'react-feather'
import {PrimaryButton, AccentButton} from '../system/Button'
import Link from 'next/link'
import HeaderWrapper from './HeaderWrapper'
import Meta from './Meta'

type Props = {
  children: ReactNode
  saveClicked: () => any
  title? : string
}
const Layout: React.FC<Props> = ( props ) => (
    <>
    <Meta title={props.title}/>
    <HeaderWrapper reverse>
        <Link href={`/`}>
            <PrimaryButton icon={<ChevronLeft/>}>Back</PrimaryButton>
        </Link>
        <div style={{flex:2}}/>
        <AccentButton icon={<CheckCircle/>} onClick = {props.saveClicked}>Save</AccentButton>
    </HeaderWrapper>
    <Wrapper>
        <div className="layout">{props.children}</div>
    </Wrapper>
  </>
)
export default Layout
