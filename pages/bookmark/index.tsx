import { WithUser } from "../../components/hoc/withUser"
import Layout from "../../components/layout/Layout"
import { useRouter } from "next/router"
import useBookmark from "../../lib/useBookmark"

const Bookmark: React.FC = () => {
  const router = useRouter()
  const { redirecting, error } = useBookmark()

  return (
    <Layout
      leftControl={
        <img
          src="/images/heirloom.svg"
          height="36"
          alt="Heirloom in script typeface"
        />
      }
    >
      {error ? (
        <>ERROR: {error.message}</>
      ) : redirecting ? (
        <>Redirecting...</>
      ) : (
        <>
          Attempting to save new recipe from <strong>{router.query.url}</strong>
          ...
        </>
      )}
    </Layout>
  )
}

export default WithUser(Bookmark)
