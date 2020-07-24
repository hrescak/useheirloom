import { getSession } from "../../../../../lib/iron"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === "GET") {
    handleGET(req, res)
  } else if (req.method === "POST") {
    handlePOST(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/recipes/[id]/ingredient-sections
// Required fields in body:
// Optional fields in body:
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

// POST /api/recipes/[id]/ingredient-sections
// Required fields in body: name, priority
// Optional fields in body:
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
