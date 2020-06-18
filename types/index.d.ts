import { RecipeIngredient, Recipe } from "@prisma/client"

export type UserSession = {
  id: number
  name: string
  email: string
  kitchenId: number
  kitchenName: string
}

export type RecipeProps = {
  id: number
  name?: string
  summary?: string
  isPublic: boolean
  publicID?: string
  sourceName?: string
  sourceURL?: string
  servings?: number
  prepDuration?: number
  cookDuration?: number
  totalDuration?: number
  kitchen: Kitchen
  kitchenId: number
  imageURL?: string
  ingredients: RecipeIngredient[]
  ingredientSections: string[]
  instructions?: string
  isDeleted: boolean
  // categories   Category[]
  // starredBy          User[]
}

export type IngredientListProps = {
  recipeId: number
  editable: boolean
  initialData?: RecipeIngredient[]
}

export type IngredientItemProps = {
  recipeId: number
  idx: number
  editable: boolean
  ingredient: Partial<RecipeIngredient>
  revalidate: () => any
}
