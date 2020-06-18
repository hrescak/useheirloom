import { createUser } from "../../../lib/user"

export default async function signup(req, res) {
  try {
    const user = await createUser(req.body)
    if (user) {
      res.status(200).send({ done: true })
    } else {
      throw new Error(`Couldn't create user`)
    }
  } catch (error) {
    console.error(error)
    res.status(500).end(error.message)
  }
}
