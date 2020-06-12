import { useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import useSWR from 'swr'
import { RecipeIngredient } from '@prisma/client'
import { DropResult } from 'react-beautiful-dnd'

const fetcher = (url:string) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return data || null
    })

export function useFetcher(URL:string) {
  const router = useRouter()
  const dataFetcher = (url) =>
  fetch(url).then(async (res) => {
    const result = await res.json();

    if (res.status !== 200) {
      if(res.status ===302) {
        // redirect on api redirect response
        router.push(result.location)
      }
      return Promise.reject(result);
    } else {
      return result;
    }
  });
  return useSWR(URL, dataFetcher)
}

export function useUser({ redirectTo, redirectIfFound}:{redirectTo?:string,redirectIfFound?:boolean} = {}, initialData = undefined) {
  const { data, error }: {data?:{user?:any},error?:any} = useSWR('/api/user', fetcher, {initialData:initialData})
  const user = data?.user
  const finished = Boolean(data)
  const hasUser = Boolean(user)

  useEffect(() => {
    if (!redirectTo || !finished) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo)
    }
  }, [redirectTo, redirectIfFound, finished, hasUser])

  return error ? null : user
}

export const useRecipes = () => {
  const {data,error} = useSWR('/api/recipes', fetcher)
  const recipes = data
  return error ? null : recipes
}

export const useCreateRecipe = () => {
  const router = useRouter()
  const createRecipe = () =>{ 
    fetch('/api/recipes', {
      method: 'POST'
    })
    .then((r) => r.json())
    .then((data) => {
      router.push(`/recipes/edit/${data.id}`)
      return data || null
    })
  }
  return createRecipe
}

export const useMoveRecipeIngredient = (
  ingredients?: RecipeIngredient[] | null,
  updateIngredient? : (ingredient: Partial<RecipeIngredient>) => any
) => {

  const highestPriority = () => {
    if (ingredients && ingredients.length > 0) {
      return Math.max.apply(
        Math,
        ingredients.map((o: Partial<RecipeIngredient>) =>
          o.priority ? o.priority : 0
        )
      );
    }
    return 0; // if no todos
  };
  const lowestPriority = () => {
    if (ingredients && ingredients.length > 0) {
      return Math.min.apply(
        Math,
        ingredients.map((o: Partial<RecipeIngredient>) =>
          o.priority ? o.priority : 0
        )
      );
    }
    return 0; // if no todos
  };

  const moveIngredient = (result: DropResult) => {
    if (
      result.destination &&
      result.destination.index !== result.source.index &&
      ingredients
    ) {
      let targetPriority = 0;
      switch (result.destination.index) {
        case 0: {
          // top most position, conjure a new lowest pri
          targetPriority = lowestPriority() - 1;
          break;
        }
        case ingredients.length - 1: {
          // bottommost position, conjure a new highest pri
          targetPriority = highestPriority() + 1;
          break;
        }
        default: {
          // everywhere in between
          let toPriorityAbove =
            ingredients[result.destination.index + 1].priority || 0;
          let toPriorityBelow =
            ingredients[result.destination.index].priority || 0;
          if (result.source.index > result.destination.index) {
            toPriorityBelow =
              ingredients[result.destination.index - 1].priority || 0;
            toPriorityAbove =
              ingredients[result.destination.index].priority || 0;
          }
          targetPriority = (toPriorityBelow + toPriorityAbove) / 2;
        }
      }

      const ingredientToUpdate = ingredients[result.source.index];
      updateIngredient(
        {
          id: ingredientToUpdate.id,
          freeform: ingredientToUpdate.freeform,
          priority: targetPriority
        });
    }
  };
  return { moveIngredient, highestPriority };
};
