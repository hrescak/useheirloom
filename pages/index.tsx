import React from 'react'
import Layout from '../components/layout/Layout'
import { getSession } from '../lib/iron'
import RecipeList from '../components/RecipeList'

type Props = {
  hasSession: boolean
}

const Index : React.FC<Props> = props => {
  if(!props.hasSession) {
    return <span>oops</span>
  }
  return (
    <Layout>
      <RecipeList />
    </Layout>
  )
}
// Making sure we don't have flash of logged in / out content on homepage
export async function getServerSideProps(context) {
  const session = await getSession(context.req)
  return {
    props: {hasSession:Boolean(session)},
  }
}
export default Index
