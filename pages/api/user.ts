import { getSession } from '../../lib/iron'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// Required fields in body: name, email
export default async function handle(req, res) {
  const session = await getSession(req) 
  if (session) {
  }
  // After getting the session you may want to fetch for the user instead
  // of sending the session's payload directly, this example doesn't have a DB
  // so it won't matter in this case
  res.status(200).json({ user: session || null })
}
