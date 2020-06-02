import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import { useUser } from '../lib/hooks'
import fetch from 'isomorphic-unfetch'
import Post, { PostProps } from '../components/Post'

type Props = {
  feed: PostProps[]
}

const Blog : React.FC<Props> = () => {
  const user = useUser();
  return (
    <Layout>
      <div className="page">
        <h1>My Blog</h1>
        <main>
        {user && <p>Currently logged in as: {JSON.stringify(user)}</p>}
          
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}


export default Blog
