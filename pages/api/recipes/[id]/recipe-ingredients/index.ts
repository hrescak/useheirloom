import { getSession } from "../../../../../lib/iron"
import { PrismaClient } from "@prisma/client"
import { UserSession } from "../../../../../types"

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

// GET /api/recipes/[id]/recipe-ingredients
// Required fields in body:
// Optional fields in body:
async function handleGET(req, res) {
  const session = await getSession(req)
  if (session) {
    const result = await prisma.recipeIngredient.findMany({
      where: {
        recipeId: Number(req.query.id),
      },
    })
    res.json(result)
  } else {
    res.status(401).send("Unauthorized")
  }
}

// POST /api/recipes/[id]/recipe-ingredients
// Required fields in body: freeform,priority
// Optional fields in body:
async function handlePOST(req, res) {
  const session = await getSession(req)
  const { freeform, priority } = JSON.parse(req.body)
  if (session) {
    const result = await prisma.recipeIngredient.create({
      data: {
        freeform: freeform,
        priority: Number(priority),
        recipe: { connect: { id: Number(req.query.id) } },
      },
    })
    res.json(result)
  } else {
    res.status(401).send("Unauthorized")
  }
}
