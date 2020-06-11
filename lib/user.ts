import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createUser({ email,name, password }) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  //
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  const kitchenName = name + "'s Kitchen"
  const user = await prisma.user.create({
    data:{
      email,
      name,
      salt,
      hash, 
      ownKitchen: {
        create:{
          name:kitchenName
        }
      }
    }
  })
  return user
}
  
export async function findUser({ email, password }) {
  const user = await prisma.user.findOne({
      where: {
          email: email
      },
      include: {
        ownKitchen : {
          select: {
            id: true,
            name: true
          }
        }
      }
  })
  if (!user) return null
  const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex')
  if (user.hash === hash) return user; // passwords match
  return null
}