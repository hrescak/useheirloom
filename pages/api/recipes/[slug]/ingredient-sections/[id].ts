import { getSession } from "../../../../../lib/iron"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === "GET") {
    handleGET(req, res)
  } else if (req.method === "POST") {
    handlePOST(req, res)
  } else if (req.method === "DELETE") {
    handleDELETE(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/recipes/:slug/ingredient-sections/:id
async function handleGET(req, res) {
  const session = await getSession(req)
  if (session) {
    const recipeIngredientSection = await prisma.recipeIngredientSection.findOne(
      {
        where: { id: Number(req.query.id) },
      }
    )
    return res.json(recipeIngredientSection)
  } else {
    throw new Error("Not Authenticated")
  }
}

// POST /api/recipes/:id/ingredient-sections/:id
async function handlePOST(req, res) {
  const session = await getSession(req)
  if (session) {
    const data = JSON.parse(req.body)
    const recipeIngredientSection = await prisma.recipeIngredientSection.update(
      {
        where: { id: Number(req.query.id) },
        data: data,
      }
    )
    res.json(recipeIngredientSection)
  } else {
    throw new Error("Not Authenticated")
  }
}

// DELETE /api/recipes/:id/ingredient-sections/:id
async function handleDELETE(req, res) {
  const session = await getSession(req)
  if (session) {
    const recipeIngredientSection = await prisma.recipeIngredientSection.delete(
      {
        where: { id: Number(req.query.id) },
      }
    )
    res.json(recipeIngredientSection)
  } else {
    throw new Error("Not Authenticated")
  }
}
