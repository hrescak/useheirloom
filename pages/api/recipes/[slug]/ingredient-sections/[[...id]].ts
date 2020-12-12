import { getSession } from "../../../../../lib/iron"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === "GET") {
    if (req.query.id) {
      handleSingleGET(req, res)
    } else {
      handleGET(req, res)
    }
  } else if (req.method === "POST") {
    handlePOST(req, res)
  } else if (req.method === "PUT") {
    handlePUT(req, res)
  } else if (req.method === "DELETE") {
    handleDELETE(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/recipes/:slug/ingredient-sections
// list all ingredient sections per recipe
async function handleGET(req, res) {
  const session = await getSession(req)
  if (session) {
    const result = await prisma.recipeIngredientSection.findMany({
      where: {
        recipe: { publicID: req.query.slug },
      },
    })
    res.json(result)
  } else {
    res.status(401).send("Unauthorized")
  }
}

// POST /api/recipes/:slug/ingredient-sections
// Create a new ingredient section
async function handlePOST(req, res) {
  const session = await getSession(req)
  const { name, priority } = JSON.parse(req.body)
  if (session) {
    const result = await prisma.recipeIngredientSection.create({
      data: {
        name: name,
        priority: Number(priority),
        recipe: { connect: { publicID: req.query.slug } },
      },
    })
    res.json(result)
  } else {
    res.status(401).send("Unauthorized")
  }
}

// GET /api/recipes/:slug/ingredient-sections/:id
// Return single ingredient section
async function handleSingleGET(req, res) {
  const session = await getSession(req)
  if (session) {
    const recipeIngredientSection = await prisma.recipeIngredientSection.findUnique(
      {
        where: { id: Number(req.query.id) },
      }
    )
    return res.json(recipeIngredientSection)
  } else {
    throw new Error("Not Authenticated")
  }
}

// POST /api/recipes/:slug/ingredient-sections/:id
// Update a single ingredient section
async function handlePUT(req, res) {
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

// DELETE /api/recipes/:slug/ingredient-sections/:id
// Delete single ingredient section
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
