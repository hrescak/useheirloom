import { getSession } from "../../lib/iron"
import { PrismaClient } from "@prisma/client"
import crypto from "crypto"

const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === "GET") {
    handleGET(req, res)
  } else if (req.method === "POST") {
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
  if (!session) return res.json({ message: "Not Authenticated" })

  const user = await prisma.user.findUnique({
    where: {
      id: session.id,
    },
    include: {
      ownKitchen: true,
    },
  })
  if (!user) {
    return res.status(401).json({ message: "Not Found" })
  }
  const responseUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    kitchenId: user.ownKitchen.id,
    kitchenName: user.ownKitchen.name,
  }
  return res.json({ user: responseUser })
}

// POST /api/settings
async function handlePOST(req, res) {
  const session = await getSession(req)
  if (!session) return res.status(401).json({ message: "Not Authenticated" })
  // start an update object
  const data = JSON.parse(req.body)
  let dataToWrite = {
    email: data.email,
    name: data.name,
    ownKitchen: {
      update: { name: data.kitchenName },
    },
  }
  // if we're updating a password, let's make sure it's only included in
  // the write if the old one matches the one we have
  if (data.newPassword) {
    const confirmedUser = await prisma.user.findUnique({
      where: { id: session.id },
    })
    if (!confirmedUser) return res.status(401).json({ message: "Not Found" })
    const passwordsMatch =
      confirmedUser.hash ===
      crypto
        .pbkdf2Sync(data.oldPassword, confirmedUser.salt, 1000, 64, "sha512")
        .toString("hex")
    if (!passwordsMatch)
      return res.status(404).json({ message: "Old password doesn't match" })
    dataToWrite["hash"] = crypto
      .pbkdf2Sync(data.newPassword, confirmedUser.salt, 1000, 64, "sha512")
      .toString("hex")
  }

  const user = await prisma.user.update({
    where: { id: session.id },
    data: dataToWrite,
  })
  return res.json(user)
}
