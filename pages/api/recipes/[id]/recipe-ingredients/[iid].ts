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

// GET /api/recipes/:id/recipe-ingredients/:iid
async function handleGET(req, res) {
  const session = await getSession(req)
  if (session) {
    const recipeIngredient = await prisma.recipeIngredient.findOne({
      where: { id: Number(req.query.iid) },
    })
    res.json(recipeIngredient)
  } else {
    throw new Error("Not Authenticated")
  }
}

// POST /api/recipes/:id/recipe-ingredients/:iid
async function handlePOST(req, res) {
  const session = await getSession(req)
  if (session) {
    const data = JSON.parse(req.body)
    const recipeIngredient = await prisma.recipeIngredient.update({
      where: { id: Number(req.query.iid) },
      data: data,
    })
    res.json(recipeIngredient)
  } else {
    throw new Error("Not Authenticated")
  }
}

// DELETE /api/recipes/:id/recipe-ingredients/:iid
async function handleDELETE(req, res) {
  const session = await getSession(req)
  if (session) {
    const recipeIngredient = await prisma.recipeIngredient.delete({
      where: { id: Number(req.query.iid) },
    })
    res.json(recipeIngredient)
  } else {
    throw new Error("Not Authenticated")
  }
}
