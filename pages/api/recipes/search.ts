import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET /api/recipes/search?q=:searchString
export default async function handle(req, res) {
  const { searchString } = req.query
  const resultPosts = await prisma.recipe.findMany({
    where: {
      OR: [
        {
          name: { contains: searchString },
        },
        {
          instructions: { contains: searchString },
        },
      ],
    },
  })
  res.json(resultPosts)
}
