'use client'

import { FcGoogle } from 'react-icons/fc'
import '@styles/Register.scss'

const Register = () => {
  return (
    <div className='register'>
      <img src='/assets/register.jpg' alt='register' />
      <div className='register_content'>
        <form action='' className='register_content_form'>
          <input placeholder='Username' name='username' required />

          <input placeholder='Email' name='email' required />

          <input placeholder='Password' name='password' required />

          <input
            placeholder='Confirm Password'
            name='confirmPassword'
            required
          />

          <input
            id='image'
            type='file'
            name='profileImage'
            accept='image/*'
            style={{ display: 'none' }}
            required
          />

          <label htmlFor='image'>
            <img src='/assets/addImage.png' alt='Add profile' />
            <p>Upload profile Photo</p>
          </label>

          <button type='submit'>Register</button>
        </form>

        <button type='button' className='google' onClick={() => {}}>
          Login with Google
          <FcGoogle />
        </button>

        <a href='/login'>Already have an account? Login Here</a>
      </div>
    </div>
  )
}

export default Register
