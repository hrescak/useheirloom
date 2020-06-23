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
export type RecipeIngredientProps = {
  initialData?: RecipeIngredient[]
  sections?: string[]
  recipeId: number
  editable: boolean
}

export type IngredientListProps = {
  recipeId: number
  sectionName?: string
  sectionId?: string
  editable: boolean
  ingredients?: RecipeIngredient[]
}

export type IngredientItemProps = {
  recipeId: number
  idx: number
  editable: boolean
  ingredient: Partial<RecipeIngredient>
  revalidate: () => any
}
