import { useRouter } from "next/router"
import useSWR from "swr"
import { RecipeProps } from "../types"

const useRecipe = () => {
  const router = useRouter()
  const { slug } = router.query
  const shouldFetch = slug !== undefined
  const apiURL = `/api/recipes/${slug}`

  const dataFetcher = (url) =>
    fetch(url).then(async (res) => {
      const result = await res.json()

      if (res.status !== 200) {
        if (res.status === 302) {
          // redirect on api redirect response
          router.push(result.location)
        } else {
          // redirect to home on any other
          router.push("/")
        }
        return Promise.reject(result)
      } else {
        return result
      }
    })

  const { data, error, mutate } = useSWR(
    () => (shouldFetch ? apiURL : null),
    dataFetcher
  )
  const recipe: RecipeProps = data

  const updateRecipe = async (payload: any, redirect?: boolean) => {
    // update recipe
    await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((p) => p.json())
      .then((data) => {
        if (redirect) router.push(`/r/${data.publicID}`)
      })

    //optimistically update local state
    mutate({ payload, ...recipe })
  }

  const deleteRecipe = () => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      fetch(apiURL, {
        method: "DELETE",
      }).then((p) => router.push(`/`))
    }
  }

  return { recipe, error, updateRecipe, deleteRecipe }
}

export default useRecipe
