import recipeScraper from "recipe-scraper"
import slugFromName from "../../../lib/slugHelper"
import { PrismaClient } from "@prisma/client"
import { getSession } from "../../../lib/iron"

const prisma = new PrismaClient()

export default async function handle(req, res) {
  const session = await getSession(req)
  if (!session) {
    return res
      .status(401)
      .json({ message: "Not Authenticated. Please log in to save recipes." })
  }
  const decodedURL = decodeURIComponent(req.query.url)
  try {
    const recipe = await recipeScraper(decodedURL)
    if (recipe) {
      const slug = await slugFromName(prisma, recipe.name)
      const URLtoExtract = new URL(decodedURL)
      const sourceName = URLtoExtract.hostname
      const data = {
        name: recipe.name,
        author: { connect: { id: session.id } },
        kitchen: { connect: { id: session.kitchenId } },
        publicID: slug,
        sourceName: sourceName,
        sourceURL: decodedURL,
        instructions: recipe.instructions.join("\n\n"),
        ingredients: {
          create: recipe.ingredients.map((ing, idx) => ({
            freeform: ing,
            priority: idx,
          })),
        },
      }
      if (recipe.image) {
        data["imageURL"] = recipe.image
      }
      console.log(data)
      const result = await prisma.recipe.create({
        data: data,
      })
      return res.status(200).json({ location: `/r/${slug}` })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error creating recipe" })
  }
  return res.status(500).json({ message: "Unexpected error occured" })
}
