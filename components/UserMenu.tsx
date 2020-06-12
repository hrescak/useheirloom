import React from 'react'
import Popover from './system/Popover'
import styled from 'styled-components'
import { InlineButton, OutlineButton } from './system/Button'
import { User, Settings, LogOut } from 'react-feather'
import Link from 'next/link'

const Row = styled.div`
    border-top: 1px solid ${p=>p.theme.colors.wash};
    padding:4px;
    & ${InlineButton} {
        width:100%;
        box-sizing:border-box;
    }
`

const UserMenu: React.FC = () =>{
    return (
        <Popover content={
            <>
            <Row style={{border:'none'}}>
                <Link href="/user/settings">
                    <InlineButton icon={<Settings/>}>Account Settings</InlineButton>
                </Link>
            </Row>
            <Row>
                <Link href="/api/auth/logout">
                    <InlineButton icon={<LogOut/>}>Log Out</InlineButton>
                </Link>
            </Row>
            </>
        } trigger="click" interactive={true}>
          <OutlineButton icon={<User/>}/>
        </Popover>
    )
}

export default UserMenu