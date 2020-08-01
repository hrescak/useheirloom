import { WithUser } from "../../components/hoc/withUser"
import Layout from "../../components/layout/Layout"
import { useRouter } from "next/router"
import useBookmark from "../../lib/useBookmark"
import ErrorBox from "../../components/system/ErrorBox"
import Link from "next/link"

const Bookmark: React.FC = () => {
  const router = useRouter()
  const { redirecting, error } = useBookmark()

  return (
    <Layout
      leftControl={
        <Link href="/">
          <a>
            <img
              src="/images/heirloom.svg"
              height="36"
              alt="Heirloom in script typeface"
            />
          </a>
        </Link>
      }
    >
      {error ? (
        <ErrorBox
          title="Recipe wasn't successfully added"
          message={error.message}
        />
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
