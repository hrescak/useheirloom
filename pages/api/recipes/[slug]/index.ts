import { getSession } from "../../../../lib/iron"
import { PrismaClient } from "@prisma/client"
import slugify from "slugify"

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
  const recipe = await prisma.recipe.findOne({
    where: { publicID: req.query.slug },
    include: { ingredients: true, kitchen: true },
  })
  if (recipe.isPublic || (session && recipe.authorId === session.id)) {
    return res.status(200).json(recipe)
  }
  return res.status(401).send("Unauthorized")
}

// POST /api/recipes/:id
async function handlePOST(req, res) {
  const session = await getSession(req)
  if (session) {
    const data = JSON.parse(req.body)

    // if we're changing a name, we gon gotta change the slug too
    if (data.name && data.name != "") {
      let slugToSave = slugify(data.name).toLowerCase().substr(0, 60)
      const slugCount = await prisma.recipe.count({
        where: { publicID: slugToSave },
      })

      // if it already exists, we'll append the ID to it
      slugToSave = slugCount > 0 ? slugToSave + "-" + data.id : slugToSave
      data.publicID = slugToSave
    }
    const recipe = await prisma.recipe.update({
      where: { publicID: req.query.slug },
      data: data,
    })
    return res.json(recipe)
  }
  return res.status(401).send("Unauthorized")
}

// DELETE /api/recipes/:id
async function handleDELETE(req, res) {
  const session = await getSession(req)
  if (session) {
    const post = await prisma.recipe.update({
      where: { publicID: req.query.slug },
      data: { isDeleted: true },
    })
    res.json(post)
  } else {
    throw new Error("Not Authenticated")
  }
}
