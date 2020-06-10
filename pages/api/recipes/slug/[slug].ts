import { getSession } from '../../../../lib/iron'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/recipes/slug/:slug
export default async function handle(req, res) {
    const recipe = await prisma.recipe.findOne({
        where: { publicID: req.query.slug},
        include: { ingredients: true },
    })
    if (!recipe){
        res.status(404).json({message:"Recipe not found"})
        res.end()
    }

    // If the user (any user) is logged in, redirect them to the /id page
    const session = await getSession(req)
    if(session){
        res.status(302).json({  location: `/recipes/${recipe.id}` })
        res.end()
    }

    // Making sure the recipe is public before returning it
    if(recipe.isPublic){
        res.json(recipe)
    } else {
        res.status(404).json({message:"Recipe not found"})
        res.end()
    }
  }