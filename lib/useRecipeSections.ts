export const useRecipeSection = (
  sections: string[],
  recipeId: number,
  mutate: any
) => {
  const renameSection = (newName: string, index: number) => {}
  const addSection = (newName: string) => {}
  const removeSection = (index: number) => {}
  const moveSection = (oldIndex: number, newIndex: number) => {}
  const saveRecipe = () => {
    fetch(`/api/recipes/${recipeId}`, {
      method: "POST",
    }).then((r) => r.json())
  }

  return { renameSection, addSection, removeSection, moveSection }
}
