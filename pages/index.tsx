import React from 'react'
import Layout from '../components/layout/Layout'
import { getSession } from '../lib/iron'
import RecipeList from '../components/RecipeList'
import { UserSession } from '../types'
import { useCreateRecipe } from '../lib/hooks'
import { OutlineButton } from '../components/system/Button'
import { PlusCircle, LogIn } from 'react-feather'
import UserMenu from '../components/UserMenu'
import Link from 'next/link'

type Props = {
  session: UserSession
}

const Index : React.FC<Props> = props => {
  const createRecipe = useCreateRecipe()
  if(!Boolean(props.session)) {
    return <span>oops</span>
  }
  return (
    <Layout leftControl={
      <img src="/images/logo.png" height="42" alt="Heirloom in script typeface"/>
    } rightControl={
      props.session ? (
        <>
        <OutlineButton onClick={()=> createRecipe()} icon={<PlusCircle/>} style={{marginRight:"8px"}}>New Recipe</OutlineButton>
        <UserMenu/>
        </>
      ) : (
        <Link href="/login">
          <OutlineButton icon={<LogIn/>}>Log In</OutlineButton>
        </Link>
      )
    }>
      <RecipeList />
    </Layout>
  )
}
// Making sure we don't have flash of logged in / out content on homepage
export async function getServerSideProps(context) {
  const session = await getSession(context.req)
  return {
    props: {session:session || null},
  }
}
export default Index
