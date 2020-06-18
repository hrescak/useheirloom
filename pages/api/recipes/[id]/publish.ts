import { getSession } from "../../../../lib/iron"
import { PrismaClient } from "@prisma/client"
import slugify from "slugify"
import { nanoid } from "nanoid"

const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === "PUT") {
    handlePUT(req, res)
  } else if (req.method === "DELETE") {
    handleDELETE(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// PUT /api/recipes/:id/publish
async function handlePUT(req, res) {
  const session = await getSession(req)
  if (session) {
    const data = JSON.parse(req.body)

    // by default, slug is just a random string
    let slugToSave = nanoid(8)

    // if this recipe already has a slug and we're re-publishing it,
    // just pick the one we already have
    if (data.publicID) {
      slugToSave = data.publicID
    } else {
      // if the recipe is named, we'll look at whether the slug from
      // the name already exists
      if (data.name && data.name != "") {
        slugToSave = slugify(data.name).toLowerCase().substr(0, 60)
        const slugCount = await prisma.recipe.count({
          where: { publicID: slugToSave },
        })

        // if it already exists, we'll append the ID to it
        slugToSave = slugCount > 0 ? slugToSave + "-" + data.id : slugToSave
      }
    }
    // save the slug
    const recipe = await prisma.recipe.update({
      where: { id: Number(req.query.id) },
      data: {
        isPublic: true,
        publicID: slugToSave,
      },
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
    const recipe = await prisma.recipe.update({
      where: { id: Number(req.query.id) },
      data: { isPublic: false },
    })
    res.json(recipe)
  } else {
    throw new Error("Not Authenticated")
  }
}
