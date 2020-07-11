import useSWR from "swr"
import { useRouter } from "next/router"

const useRecipes = () => {
  const { data } = useSWR("/api/recipes", (url) =>
    fetch(url).then((r) => r.json())
  )
  const router = useRouter()
  const recipes = data

  const createRecipe = () => {
    fetch("/api/recipes", {
      method: "POST",
    })
      .then((r) => r.json())
      .then((data) => {
        router.push(`/r/${data.publicID}/edit`)
        return data || null
      })
  }

  return { recipes, createRecipe }
}

export default useRecipes
