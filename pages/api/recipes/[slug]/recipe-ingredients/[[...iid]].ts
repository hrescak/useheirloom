import { getSession } from "../../../../../lib/iron"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === "GET") {
    if (req.query.iid) {
      handleSingleGET(res, req)
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

// GET /api/recipes/:id/recipe-ingredients
// Get a list of ingredients
async function handleGET(req, res) {
  const session = await getSession(req)
  if (session) {
    const result = await prisma.recipeIngredient.findMany({
      where: {
        recipe: { publicID: req.query.slug },
      },
    })
    res.json(result)
  } else {
    res.status(401).send("Unauthorized")
  }
}

// GET /api/recipes/:id/recipe-ingredients/:iid
// Get a single ingredient
async function handleSingleGET(req, res) {
  const session = await getSession(req)
  if (session) {
    const recipeIngredient = await prisma.recipeIngredient.findUnique({
      where: { id: Number(req.query.iid) },
    })
    res.json(recipeIngredient)
  } else {
    throw new Error("Not Authenticated")
  }
}

// POST /api/recipes/:id/recipe-ingredients
// Create a single ingredient
async function handlePOST(req, res) {
  const session = await getSession(req)
  const { freeform, priority, sectionId } = JSON.parse(req.body)
  if (session) {
    const result = await prisma.recipeIngredient.create({
      data: {
        freeform: freeform,
        priority: Number(priority),
        section: sectionId ? { connect: { id: Number(sectionId) } } : undefined,
        recipe: { connect: { publicID: req.query.slug } },
      },
    })
    res.json(result)
  } else {
    res.status(401).send("Unauthorized")
  }
}

// PUT /api/recipes/:id/recipe-ingredients/:iid
// Update a single ingredient
async function handlePUT(req, res) {
  const session = await getSession(req)
  if (session) {
    const { sectionId, ...data } = JSON.parse(req.body)
    // include sectionId ONLY when it's not ommited in the request
    // null is a valid value for sectionId
    if (sectionId !== undefined) {
      data.section =
        sectionId != null
          ? { connect: { id: Number(sectionId) } }
          : { disconnect: true }
    }
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
// Delete a single ingredient
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
