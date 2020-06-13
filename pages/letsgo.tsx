import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import Form from '../components/Form'
import PublicLayout from '../components/layout/PublicLayout'
import { useForm } from 'react-hook-form'
import { H1 } from '../components/system/Typography'
import { Label, Input, FormError } from '../components/system/Form'
import { PrimaryButton } from '../components/system/Button'
import { LogIn } from 'react-feather'

const Signup:React.FC = () => {
  useUser({ redirectTo: '/', redirectIfFound: true })
  const {register, handleSubmit, errors, watch} = useForm()
  const pwd = watch("password")
  async function onSubmit(data) {

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.status === 200) {
        Router.push('/login')
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
            <H1>Sign up</H1>
            <Label>Email</Label>
            <Input placeholder="your@email.com" name="email" type="text" ref={register({
      required: 'Email is required' 
    })}/>
            <FormError title={errors?.email?.message}/>
            <Label>Name</Label>
            <Input placeholder="Your Name" name="name" type="text" ref={register({
      required: 'Name is required' 
    })}/>
            <FormError title={errors?.name?.message}/>
            <Label>Password</Label>
            <Input placeholder="Password" name="password" type="password" ref={register({
              required: 'Password is required'// <p>error message</p>
            })}/> 
            <FormError title={errors?.password?.message}/>
            <Label>Password</Label>
            <Input placeholder="Repeat password" name="rpassword" type="password" ref={register({
      required: 'Retype password from above',
      validate: value=>value === pwd || "The passwords don't match"  // <p>error message</p>
    })}/> 
            <FormError title={errors?.rpassword?.message}/>
            <PrimaryButton style={{marginTop:'1rem'}} icon={<LogIn/>} onClick={handleSubmit(onSubmit)}>Create an</PrimaryButton>
        </form>
    </PublicLayout>
  )
}

export default Signup