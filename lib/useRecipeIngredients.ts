import useSWR, { mutate } from "swr"
import { useRouter } from "next/router"
import { RecipeIngredient } from "@prisma/client"
import _ from "lodash"
import { DropResult } from "react-beautiful-dnd"

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
  const { targetPriority, highestPriority } = movePriorities(
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
    const id = ingredients[result.source.index].id
    const newPriority = targetPriority(result)
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

// helper functions for figuring out the target
// priorities when moving and creating new ingredients
const movePriorities = (ingredients?: RecipeIngredient[] | null) => {
  const highestPriority = () => {
    if (ingredients && ingredients.length > 0) {
      return Math.max.apply(
        Math,
        ingredients.map((o: Partial<RecipeIngredient>) =>
          o.priority ? o.priority : 0
        )
      )
    }
    return 0 // if no todos
  }
  const lowestPriority = () => {
    if (ingredients && ingredients.length > 0) {
      return Math.min.apply(
        Math,
        ingredients.map((o: Partial<RecipeIngredient>) =>
          o.priority ? o.priority : 0
        )
      )
    }
    return 0 // if no todos
  }

  const targetPriority = (result: DropResult) => {
    if (
      result.destination &&
      result.destination.index !== result.source.index &&
      ingredients
    ) {
      let targetPriority = 0
      switch (result.destination.index) {
        case 0: {
          // top most position, conjure a new lowest pri
          targetPriority = lowestPriority() - 1
          break
        }
        case ingredients.length - 1: {
          // bottommost position, conjure a new highest pri
          targetPriority = highestPriority() + 1
          break
        }
        default: {
          // everywhere in between
          let toPriorityAbove =
            ingredients[result.destination.index + 1].priority || 0
          let toPriorityBelow =
            ingredients[result.destination.index].priority || 0
          if (result.source.index > result.destination.index) {
            toPriorityBelow =
              ingredients[result.destination.index - 1].priority || 0
            toPriorityAbove =
              ingredients[result.destination.index].priority || 0
          }
          targetPriority = (toPriorityBelow + toPriorityAbove) / 2
        }
      }

      return targetPriority
    }
  }

  return { targetPriority, highestPriority }
}
