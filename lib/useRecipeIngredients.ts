import useSWR, { mutate } from "swr"
import { useRouter } from "next/router"
import { RecipeIngredient } from "@prisma/client"
import _ from "lodash"
import { DropResult } from "react-beautiful-dnd"

const useRecipeIngredients = (
  initialData?: RecipeIngredient[],
  preventFetch?: boolean
) => {
  const router = useRouter()
  const { slug } = router.query
  //only fetch after slug is loaded and when we're not prevented
  const shouldFetch = slug !== undefined && !preventFetch
  const apiURL = `/api/recipes/${slug}/recipe-ingredients`
  const { data } = useSWR(
    () => (shouldFetch ? apiURL : null),
    (url) => fetch(url).then((r) => r.json()),
    { initialData: initialData }
  )
  // make sure we remember list of all ingredients because that's the
  // one we're mutating
  const allIngredients = data

  const ingredientsInSection = (id: number) => {
    return _.chain(allIngredients)
      .filter((i) => i.sectionId == id)
      .sortBy("priority")
      .value()
  }

  const createIngredient = async (newIngredient) => {
    // save the new ingredient
    newIngredient["priority"] = highestPriority(newIngredient.sectionId) + 1
    await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(newIngredient),
    })

    mutate(apiURL, (data) => [...data, newIngredient])
  }

  // Rename Ingredient
  const renameIngredient = async (id, newName) => {
    await fetch(`${apiURL}/${id}`, {
      method: "POST",
      body: JSON.stringify({ freeform: newName }),
    })
    //optimistically mutate local state
    const mutateData = allIngredients.map((ing) => {
      if (ing.id == id) {
        ing.freeform = newName
      }
      return ing
    })
    mutate(apiURL, mutateData)
  }

  // Drag ingredient to new spot
  const moveIngredient = async (result: DropResult) => {
    const { resultIngredientId, destinationSectionId } = dropResultInfo(result)
    const newPriority = targetPriority(result)
    const mutateData = allIngredients.map((ing) => {
      if (ing.id == resultIngredientId) {
        ing.priority = newPriority
        ing.sectionId = destinationSectionId
      }
      return ing
    })
    mutate(
      apiURL,
      _.sortBy(mutateData, (i) => i.priority),
      false
    )

    // update the moved ingredient in the backend
    await fetch(`${apiURL}/${resultIngredientId}`, {
      method: "POST",
      body: JSON.stringify({
        priority: newPriority,
        sectionId: destinationSectionId,
      }),
    })
  }

  // Delete ingredient
  async function deleteIngredient(id) {
    await fetch(`${apiURL}/${id}`, {
      method: "DELETE",
    })
    //optimistically mutate local state
    const mutateData = _.remove(
      allIngredients,
      (ing: RecipeIngredient) => ing.id != id
    )
    mutate(apiURL, mutateData)
  }

  // helper function for getting ingredient from drag and drop result
  const dropResultInfo = (result: DropResult) => {
    let sourceSectionId = Number(
      _.trimStart(result.source.droppableId, "droppable-")
    )
    let destinationSectionId = Number(
      _.trimStart(result.destination.droppableId, "droppable-")
    )
    if (isNaN(sourceSectionId)) {
      sourceSectionId = null
    }
    if (isNaN(destinationSectionId)) {
      destinationSectionId = null
    }
    const resultIngredientId = ingredientsInSection(sourceSectionId)[
      result.source.index
    ].id
    return { resultIngredientId, sourceSectionId, destinationSectionId }
  }

  // helper functions for figuring out the target
  // priorities when moving and creating new ingredients

  // highest priority in a given section
  const highestPriority = (sectionId?: number) => {
    const ingredients = ingredientsInSection(sectionId)
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

  // lowest priority in a given section
  const lowestPriority = (sectionId?: number) => {
    const ingredients = ingredientsInSection(sectionId)
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

  // target priority in the dropped destination section
  const targetPriority = (result: DropResult) => {
    const { destinationSectionId } = dropResultInfo(result)
    const ingredients = ingredientsInSection(destinationSectionId)
    let targetPriority = 0
    const isSamePosition =
      result.destination.droppableId == result.source.droppableId &&
      result.destination.index == result.source.index
    if (!isSamePosition && ingredients) {
      switch (result.destination.index) {
        case 0: {
          // top most position, conjure a new lowest pri
          targetPriority = lowestPriority(destinationSectionId) - 1
          break
        }
        case ingredients.length: {
          // bottommost NEW position, moving from another section
          targetPriority = highestPriority(destinationSectionId) + 1
          break
        }
        case ingredients.length - 1: {
          // bottommost position, conjure a new highest pri,
          // but only if destination and source list are the same,
          // when dropping from outside, this is not the bottommost position
          if (result.destination.droppableId == result.source.droppableId) {
            targetPriority = highestPriority(destinationSectionId) + 1
            break
          }
        }
        default: {
          // everywhere in between when moving within the same list
          let toPriorityAbove = 0
          let toPriorityBelow = 0

          // if it's the same list we're dropping to
          if (result.destination.droppableId == result.source.droppableId) {
            toPriorityAbove =
              ingredients[result.destination.index + 1].priority || 0
            toPriorityBelow =
              ingredients[result.destination.index].priority || 0
            if (result.source.index > result.destination.index) {
              toPriorityBelow =
                ingredients[result.destination.index - 1].priority || 0
              toPriorityAbove =
                ingredients[result.destination.index].priority || 0
            }
            // if we're dropping from another list
          } else {
            toPriorityAbove = ingredients[result.destination.index].priority
            toPriorityBelow = ingredients[result.destination.index - 1].priority
          }
          targetPriority = (toPriorityBelow + toPriorityAbove) / 2
        }
      }
    }
    return targetPriority
  }

  return {
    ingredientsInSection,
    createIngredient,
    renameIngredient,
    moveIngredient,
    deleteIngredient,
  }
}

export default useRecipeIngredients
