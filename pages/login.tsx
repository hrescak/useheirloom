import Router from 'next/router'
import { useUser } from '../lib/hooks'
import PublicLayout from '../components/layout/PublicLayout'
import { useForm } from 'react-hook-form'
import { Label, Input } from '../components/system/Form'
import { PrimaryButton } from '../components/system/Button'
import { H1 } from '../components/system/Typography'
import {FormError} from '../components/system/Form'
import { LogIn } from 'react-feather'


const Login = () => {
  useUser({ redirectTo: '/', redirectIfFound: true })
  const {register, handleSubmit, errors} = useForm()

  async function onSubmit(data) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.status === 200) {
        Router.push('/')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
    }
  }
 
  return (
    <PublicLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
            <H1>Log in</H1>
            <Label>Email</Label>
            <Input placeholder="your@email.com" name="email" type="text" ref={register({
      required: 'Email is required' 
    })}/>
            <FormError title={errors?.email?.message}/>
            <Label>Password</Label>
            <Input placeholder="password" name="password" type="password" ref={register({
      required: 'Password is required' // <p>error message</p>
    })}/> 
            <FormError title={errors?.password?.message}/>
            <PrimaryButton style={{marginTop:'1rem'}} icon={<LogIn/>} onClick={handleSubmit(onSubmit)}>Log in</PrimaryButton>
        </form>
    </PublicLayout>
  )
}

export default Login