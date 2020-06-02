  import crypto from 'crypto'
  import { PrismaClient } from '@prisma/client'

  const prisma = new PrismaClient()
/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

export async function createUser({ email,name, password }) {
    // Here you should create the user and save the salt and hashed password (some dbs may have
    // authentication methods that will do it for you so you don't have to worry about it):
    //
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    const kitchenName = name + "'s Kitchen"
    const user = await prisma.user.create({data:{email,name,salt,hash, ownKitchen: {create:{name:kitchenName}}}})

    return { email, createdAt: Date.now() }
  }
  
  export async function findUser({ email, password }) {
    // Here you should lookup for the user in your DB and compare the password:
    //
    const user = await prisma.user.findOne({
        where: {
            email: email
        }
    })
    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex')
    const passwordsMatch = user.hash === hash
    if (passwordsMatch) return user;
    return undefined
  }