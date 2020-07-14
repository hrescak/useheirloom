import useSWR, { mutate } from "swr"
import { useRouter } from "next/router"
import { RecipeIngredient } from "@prisma/client"
import _ from "lodash"
import { DropResult } from "react-beautiful-dnd"
import { useMoveRecipeIngredient } from "./hooks"

const useRecipeIngredients = (initialData?: RecipeIngredient[]) => {
  const router = useRouter()
  const { slug } = router.query
  //only fetch after slug is loaded and when we're not prevented
  const shouldFetch = slug !== undefined
  const apiURL = `/api/recipes/${slug}/recipe-ingredients`
  const { data } = useSWR(
    () => (shouldFetch ? apiURL : null),
    (url) => fetch(url).then((r) => r.json()),
    { initialData: initialData }
  )
  let ingredients: RecipeIngredient[] = data ? data : initialData
  ingredients = _.sortBy(ingredients, (i) => i.priority)

  // helper functions for priority dragging targets
  const { targetPriority, highestPriority } = useMoveRecipeIngredient(
    _.sortBy(ingredients, (i) => i.priority)
  )

  const createIngredient = async (newIngredient) => {
    // save the new ingredient
    newIngredient["priority"] = highestPriority() + 1
    await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(newIngredient),
    })
    // if there's ingredients, add them to the list and mutate optimistically
    const mutateData = ingredients
      ? [...ingredients, newIngredient]
      : [newIngredient]
    mutate(apiURL, mutateData)
  }

  // Rename Ingredient
  const renameIngredient = async (id, newName) => {
    await fetch(`${apiURL}/${id}`, {
      method: "POST",
      body: JSON.stringify({ freeform: newName }),
    })
    //optimistically mutate local state
    const mutateData = ingredients.map((ing) =>
      ing.id == id ? { freeform: newName, ...ing } : ing
    )
    mutate(apiURL, mutateData)
  }

  // Drag ingredient to new spot
  const moveIngredient = async (result: DropResult) => {
    console.log(result.source)
    console.log(ingredients)
    const id = ingredients[result.source.index].id
    console.log(ingredients[result.source.index])
    const newPriority = targetPriority(result)
    console.log(newPriority)
    await fetch(`${apiURL}/${id}`, {
      method: "POST",
      body: JSON.stringify({ priority: newPriority }),
    })
    //optimistically mutate local state
    const mutateData = ingredients.map((ing) =>
      ing.id == id ? { priority: newPriority, ...ing } : ing
    )
    mutate(
      apiURL,
      _.sortBy(mutateData, (i) => i.priority)
    )
  }

  // Delete ingredient
  async function deleteIngredient(id) {
    await fetch(`${apiURL}/${id}`, {
      method: "DELETE",
    })
    //optimistically mutate local state
    const mutateData = _.remove(ingredients, (ing) => ing.id != id)
    mutate(apiURL, mutateData)
  }

  return {
    ingredients,
    createIngredient,
    renameIngredient,
    moveIngredient,
    deleteIngredient,
  }
}

export default useRecipeIngredients
