import { getSession } from '../../lib/iron'
import { PrismaClient } from '@prisma/client'

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

// GET /api/settings
async function handleGET(req, res) {
  const session = await getSession(req)
  if (!session) throw new Error('Not Authenticated')

  const user = await prisma.user.findOne({
      where: {
          id: session.id
      },
      include: {
          ownKitchen: true
      }
  })
  const responseUser={
      id:user.id,
      name:user.name,
      email:user.email,
      kitchenId:user.ownKitchen.id,
      kitchenName:user.ownKitchen.name
  }
  res.json({user:responseUser})
}

// POST /api/settings
async function handlePOST(req, res) {
  const session = await getSession(req)
  if (!session) throw new Error('Not Authenticated')

  const data = JSON.parse(req.body)
  const user = await prisma.user.update({
    where: { id: session.id },
    data: {
      email:data.email,
      name: data.name,
      ownKitchen: {
        update :{ name: data.kitchenName}
      }
    }
  })
  res.json(user)
    
}
