import { useRouter } from "next/router"
import { mutate } from "swr"

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
      console.log(recipe)
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
  const removeSection = (index: number) => {}
  const moveSection = (oldIndex: number, newIndex: number) => {}

  return { renameSection, addSection, removeSection, moveSection }
}
