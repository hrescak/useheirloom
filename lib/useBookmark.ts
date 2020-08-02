import { useRouter } from "next/router"
import { useState, useEffect } from "react"

const useBookmark = () => {
  const [error, setError] = useState(null)
  const router = useRouter()
  const decodedURL = decodeURI(router.query.url as string) // it comes in URL encoded
  const apiURL = `/api/bookmark/${encodeURIComponent(decodedURL)}`

  useEffect(() => {
    if (router.query.url && !error) {
      fetch(apiURL).then(async (res) => {
        console.log("fetch me baby")
        const result = await res.json()
        if (res.status == 200) {
          router.push(result.location)
        } else {
          setError(result)
        }
      })
    }
  }, [router.query.url])

  return { error }
}

export default useBookmark
