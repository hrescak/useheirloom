import { WithUser } from "../../components/hoc/withUser"
import { useRouter } from "next/router"
import useBookmark from "../../lib/useBookmark"
import ErrorBox from "../../components/system/ErrorBox"
import LoggedInLayout from "../../components/layout/LoggedInLayout"

const Bookmark: React.FC = () => {
  const router = useRouter()
  const { error } = useBookmark()
  return (
    <LoggedInLayout>
      {error ? (
        <ErrorBox
          title="Recipe wasn't successfully added"
          message={error.message}
        />
      ) : (
        <>
          Saving recipe from <strong>{router.query.url}</strong>
          ...
        </>
      )}
    </LoggedInLayout>
  )
}

export default WithUser(Bookmark)
