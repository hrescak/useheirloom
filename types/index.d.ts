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
  authorId: number
  // categories   Category[]
  // starredBy          User[]
}
export type RecipeIngredientProps = {
  initialData?: RecipeIngredient[]
  sections?: string[]
  recipePublicId: string
  editable: boolean
}

export type IngredientListProps = {
  recipePublicId: string
  sectionName?: string
  sectionId?: number
  editable: boolean
  ingredients?: RecipeIngredient[]
  onSectionUpdate?: () => any
}

export type IngredientItemProps = {
  recipePublicId: string
  idx: number
  editable: boolean
  ingredient: Partial<RecipeIngredient>
  onEdit?: (id: number, newName: string) => any
  onDelete?: (id: number) => any
}
