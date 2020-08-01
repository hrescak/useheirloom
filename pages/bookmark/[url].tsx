import { WithUser } from "../../components/hoc/withUser"
import Layout from "../../components/layout/Layout"

const Bookmark: React.FC = () => {
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
      Attempting to save new recipe...
    </Layout>
  )
}

export default WithUser(Bookmark)
