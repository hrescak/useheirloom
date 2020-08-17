import { useRouter } from "next/router"
import { mutate } from "swr"
import _ from "lodash"
import { RecipeIngredientSection } from "@prisma/client"
import { DropResult } from "react-beautiful-dnd"

export const useRecipeSection = (sections?: RecipeIngredientSection[]) => {
  const router = useRouter()
  const { slug } = router.query
  const mutateURL = `/api/recipes/${slug}`
  const apiURL = `/api/recipes/${slug}/ingredient-sections`

  const renameSection = async (newName: string, id: number) => {
    await fetch(`${apiURL}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name: newName }),
    })
    //optimistically mutate local state
    mutate(mutateURL, (recipe) => {
      recipe.ingredientSections.map((section) => {
        if (section.id === id) {
          section.name = newName
        }
        return section
      })
      return recipe
    })
  }
  const createSection = async (newSection) => {
    const payload = {
      name: newSection["freeform"],
      priority: highestPriority() + 1,
    }
    await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(payload),
    })

    mutate(mutateURL, (recipe) => ({
      ...recipe,
      ingredientSections: _.concat(recipe.ingredientSections, {
        name: payload.name,
        priority: payload.priority,
        ingredients: [],
      }),
    }))
  }

  const removeSection = async (id: number) => {
    await fetch(`${apiURL}/${id}`, {
      method: "DELETE",
    })
    //optimistically mutate local state
    mutate(
      mutateURL,
      (recipe) => {
        recipe.ingredientSections = recipe.ingredientSections.filter(
          (s) => s.id !== id
        )

        console.log("new recipe")
        console.log(recipe)
        return recipe
      },
      false
    )
  }
  const moveSection = async (result: DropResult) => {
    const newPriority = targetPriority(result)
    console.log(newPriority)
    const sectionId = sections[result.source.index].id

    //optimistically mutate local state first
    mutate(
      mutateURL,
      (recipe) => ({
        ...recipe,
        ingredientSections: recipe.ingredientSections.map((section) =>
          section.id === sectionId
            ? { ...section, priority: newPriority }
            : section
        ),
      }),
      false
    )

    //send server update
    await fetch(`${apiURL}/${sectionId}`, {
      method: "PUT",
      body: JSON.stringify({ priority: newPriority }),
    })
  }

  // helper functions for figuring out the target
  // priorities when moving and creating new ingredients

  // highest priority in a given section
  const highestPriority = () => {
    if (sections && sections.length > 0) {
      return Math.max.apply(
        Math,
        sections.map((o) => (o.priority ? o.priority : 0))
      )
    }
    return 0 // if no todos
  }

  // lowest priority in a given section
  const lowestPriority = () => {
    if (sections && sections.length > 0) {
      return Math.min.apply(
        Math,
        sections.map((o) => (o.priority ? o.priority : 0))
      )
    }
    return 0 // if no todos
  }

  // target priority in the dropped destination section
  const targetPriority = (result: DropResult) => {
    let targetPriority = 0
    const isSamePosition = result.destination.index == result.source.index
    if (!isSamePosition && sections) {
      switch (result.destination.index) {
        case 0: {
          // top most position, conjure a new lowest pri
          targetPriority = lowestPriority() - 1
          break
        }
        case sections.length - 1: {
          // bottommost position, conjure a new highest pri
          targetPriority = highestPriority() + 1
          break
        }
        default: {
          let toPriorityAbove =
            sections[result.destination.index + 1].priority || 0
          let toPriorityBelow = sections[result.destination.index].priority || 0
          if (result.source.index > result.destination.index) {
            toPriorityBelow =
              sections[result.destination.index - 1].priority || 0
            toPriorityAbove = sections[result.destination.index].priority || 0
          }

          targetPriority = (toPriorityBelow + toPriorityAbove) / 2
        }
      }
    }
    return targetPriority
  }

  return { renameSection, createSection, removeSection, moveSection }
}
