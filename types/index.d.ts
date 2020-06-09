import { RecipeIngredient } from "@prisma/client"

export type UserSession = {
    id: number
    name: string
    kitchenId: number
}

export type RecipeProps = {
    id: number
    name? : string
    summary? : string
    publicID? : string
    sourceName?: string
    sourceURL?: string
    servings?: number
    prepDuration? : number
    cookDuration? : number
    totalDuration? : number
    // kitchen:             Kitchen
    kitchenId: number
    imageURL?: string
    //ingredients  RecipeIngredient[]
    ingredientSections: string[]
    instructions? : string
    isDeleted: boolean
    // categories   Category[] 
    // starredBy          User[]
}

export type IngredientListProps = {
    recipeId: number,
    editable: boolean
}

export type IngredientItemProps = {
    recipeId: number,
    idx: number,
    editable: boolean, 
    ingredient: Partial<RecipeIngredient>
    revalidate: () => any
}