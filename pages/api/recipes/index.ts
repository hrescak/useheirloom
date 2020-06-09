import { getSession } from '../../../lib/iron'
import { PrismaClient } from '@prisma/client'
import { UserSession } from '../../../types'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === 'GET') {
    handleGET(req, res)
  } else if (req.method === 'POST') {
    handlePOST(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/recipes
// Required fields in body: 
// Optional fields in body: 
async function handleGET(req, res) {
  const session = await getSession(req)
  if (session) {
    const result = await prisma.recipe.findMany({
        where: {
            kitchenId: session.kitchenId
        }
    })
    res.json(result)
  } else {
    res.status(401).send("Unauthorized")
  }
}

// POST /api/recipes
// Required fields in body: title, authorEmail
// Optional fields in body: content
async function handlePOST(req, res) {
  const session = await getSession(req) 
  const result = await prisma.recipe.create({
    data: {
      kitchen: { connect: { id: session.kitchenId }}
    },
  })
  res.json(result)
}

