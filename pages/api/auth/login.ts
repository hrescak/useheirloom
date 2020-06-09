import passport from 'passport'
import nextConnect from 'next-connect'
import { localStrategy } from '../../../lib/password-local'
import { encryptSession } from '../../../lib/iron'
import { setTokenCookie } from '../../../lib/auth-cookies'
import { UserSession } from '../../../types'

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      console.log("authenticating")
      if (error) {
        console.log("authenticating error")
        reject(error)
      } else {
        console.log("authenticating yass " + token)
        resolve(token)
      }
    })(req, res)
  })

passport.use(localStrategy)

export default nextConnect()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      passport.use(localStrategy) 
      const user:any = await authenticate('local', req, res)
      if (!user) throw new Error('No user found')
      // session is the payload to save in the token, it may contain basic info about the user
      const session: UserSession = { id:user.id,name:user.name, kitchenId: user.ownKitchen.id }
      // The token is a string with the encrypted session
      const token = await encryptSession(session)

      setTokenCookie(res, token)
      res.status(200).send({ done: true })
    } catch (error) {
      console.error(error)
      res.status(401).send(error.message)
    }
  })