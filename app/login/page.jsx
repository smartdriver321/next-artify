'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

import '@styles/Login.scss'

const Login = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      })

      if (response.ok) {
        router.push('/')
      }

      if (response.error) {
        setError('Invalid email or password. Please try again!')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const loginWithGoogle = () => {
    signIn('google', { callbackUrl: '/' })
  }

  return (
    <div className='login'>
      <img src='/assets/login.jpg' alt='login' className='login_decor' />
      <div className='login_content'>
        <form className='login_content_form' onSubmit={handleSubmit}>
          <input
            placeholder='Email'
            name='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            placeholder='Password'
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className='error'>{error}</p>}

          <button type='submit'>Log In</button>
        </form>
        <button className='google' onClick={loginWithGoogle}>
          <p>Login with Google</p>
          <FcGoogle />
        </button>
        <a href='/register'>Dont have an account? Register Here</a>
      </div>
    </div>
  )
}

export default Login
