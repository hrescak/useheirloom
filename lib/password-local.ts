import Local from 'passport-local'
import { findUser } from './user'

export const localStrategy = new Local.Strategy(function (
  email,
  password,
  done
) {
  findUser({ email, password })
    .then((user) => {
        if(user && user.email){
      done(null, user)}
      else {
          done(null, null)
      }
    })
    .catch((error) => {
      done(error)
    })
})