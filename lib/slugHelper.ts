import { PrismaClient } from "@prisma/client"
import slugify from "slugify"
import { nanoid } from "nanoid"

const slugFromName = async (
  prisma: PrismaClient,
  name: string,
  id?: string
) => {
  let slugToSave = slugify(name).toLowerCase().substr(0, 60)
  const slugCount = await prisma.recipe.count({
    where: { publicID: slugToSave },
  })
  const backupId = id ? id : nanoid(8)

  // if it already exists, we'll append the ID to it
  slugToSave = slugCount > 0 ? slugToSave + "-" + backupId : slugToSave
  return slugToSave
}

export default slugFromName
