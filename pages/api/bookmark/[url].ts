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
      console.log("We got a recipe")
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
      // attempt to save data to DB, and override terrible
      // error message with simple ones.
      try {
        console.log("We about to save")
        const result = await prisma.recipe.create({
          data: data,
        })
        if (result) {
          console.log("we have result - " + result.publicID)
          return res.status(200).json({ location: `/r/${result.publicID}` })
        }
      } catch (e) {
        throw new Error("Error creating recipe")
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error.message })
  }
  return res.status(404).json({ message: "Unexpected error occured" })
}
