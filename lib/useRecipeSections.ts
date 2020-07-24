import { useRouter } from "next/router"
import { mutate } from "swr"
import _ from "lodash"

export const useRecipeSection = () => {
  const router = useRouter()
  const { slug } = router.query
  const mutateURL = `/api/recipes/${slug}`
  const apiURL = `/api/recipes/${slug}/ingredient-sections`

  const renameSection = async (newName: string, id: number) => {
    await fetch(`${apiURL}/${id}`, {
      method: "POST",
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
  const addSection = (newName: string) => {}

  const removeSection = async (id: number) => {
    await fetch(`${apiURL}/${id}`, {
      method: "DELETE",
    })
    //optimistically mutate local state
    mutate(mutateURL, (recipe) => {
      recipe.ingredientSections = _.filter(
        recipe.ingredientSections,
        (s) => s.id != id
      )
      console.log(recipe)
      return recipe
    })
  }
  const moveSection = (oldIndex: number, newIndex: number) => {}

  return { renameSection, addSection, removeSection, moveSection }
}
