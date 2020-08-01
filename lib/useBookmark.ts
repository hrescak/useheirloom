import { useRouter } from "next/router"
import { useState } from "react"

const useBookmark = () => {
  const [error, setError] = useState(null)
  const [redirecting, setRedirecting] = useState(false)
  const router = useRouter()
  const decodedURL = decodeURI(router.query.url as string) // it comes in URL encoded
  const apiURL = `/api/bookmark/${encodeURIComponent(decodedURL)}`

  if (router.query.url && !error && !redirecting) {
    fetch(apiURL).then(async (res) => {
      const result = await res.json()
      if (res.status == 200) {
        router.push(result.location)
        setRedirecting(true)
      } else {
        setError(result)
      }
    })
  }

  return { redirecting, error }
}

export default useBookmark
