import { getSession } from "../../../../lib/iron"
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

// GET /api/recipes/:id
async function handleGET(req, res) {
  const session = await getSession(req)
  if (session) {
    const recipe = await prisma.recipe.findOne({
      where: { id: Number(req.query.id) },
      include: { ingredients: true },
    })
    res.json(recipe)
  } else {
    throw new Error("Not Authenticated")
  }
}

// POST /api/recipes/:id
async function handlePOST(req, res) {
  const session = await getSession(req)
  if (session) {
    const data = JSON.parse(req.body)
    const recipe = await prisma.recipe.update({
      where: { id: Number(req.query.id) },
      data: data,
    })
    res.json(recipe)
  } else {
    throw new Error("Not Authenticated")
  }
}

// DELETE /api/recipes/:id
async function handleDELETE(req, res) {
  const session = await getSession(req)
  if (session) {
    const post = await prisma.recipe.update({
      where: { id: Number(req.query.id) },
      data: { isDeleted: true },
    })
    res.json(post)
  } else {
    throw new Error("Not Authenticated")
  }
}
