import { getSession } from "../../../../lib/iron"
import { PrismaClient } from "@prisma/client"
import slugFromName from "../../../../lib/slugHelper"

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

// GET /api/recipes/:slug
async function handleGET(req, res) {
  const session = await getSession(req)
  const recipe = await prisma.recipe.findUnique({
    where: { publicID: req.query.slug },
    include: {
      ingredients: { where: { sectionId: null } },
      kitchen: true,
      ingredientSections: {
        include: {
          ingredients: true,
        },
      },
    },
  })
  if (
    recipe &&
    (recipe.isPublic || (session && recipe.authorId === session.id))
  ) {
    return res.status(200).json(recipe)
  }
  return res
    .status(401)
    .json({ message: "Error: You don't have permission to view this recipe" })
}

// POST /api/recipes/:slug
async function handlePOST(req, res) {
  const session = await getSession(req)
  if (session) {
    const data = JSON.parse(req.body)

    // if we're changing a name, we gon gotta change the slug too
    if (data.name && data.name != "") {
      data.publicID = await slugFromName(prisma, data.name, data.id)
      console.log(data.publicID)
    }
    const recipe = await prisma.recipe.update({
      where: { publicID: req.query.slug },
      data: data,
      include: { ingredients: true, kitchen: true },
    })
    return res.json(recipe)
  }
  return res.status(401).send("Unauthorized")
}

// DELETE /api/recipes/:slug
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
