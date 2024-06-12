'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { IconButton } from '@mui/material'
import { Menu, Person, Search, ShoppingCart } from '@mui/icons-material'

import '@styles/Navbar.scss'

const Navbar = () => {
  const { data: session } = useSession()
  const user = session?.user

  const [dropdownMenu, setDropdownMenu] = useState(false)

  const handleLogout = async () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <div className='navbar'>
      <a href='/'>
        <img src='/assets/logo.png' alt='logo' />
      </a>

      <div className='navbar_search'>
        <input type='text' placeholder='Search...' />
        <IconButton>
          <Search sx={{ color: 'red' }} />
        </IconButton>
      </div>

      <div className='navbar_right'>
        {user && (
          <a href='/cart' className='cart'>
            <ShoppingCart sx={{ color: 'gray' }} />
            Cart <span>(2)</span>
          </a>
        )}

        <button
          className='navbar_right_account'
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: 'gray' }} />

          {!user ? (
            <Person sx={{ color: 'gray' }} />
          ) : (
            <img
              src={user.profileImagePath}
              alt='profile'
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
          )}

          {dropdownMenu && !user && (
            <div className='navbar_right_accountmenu'>
              <Link href='/login'>Log In</Link>
              <Link href='/register'>Sign Up</Link>
            </div>
          )}

          {dropdownMenu && user && (
            <div className='navbar_right_accountmenu'>
              <Link href='/wishlist'>Wishlist</Link>
              <Link href='/cart'>Cart</Link>
              <Link href='/order'>Orders</Link>
              <Link href={`/shop?id=${user._id}`}>Your Shop</Link>
              <Link href='/create-work'>Sell Your Work</Link>
              <a onClick={handleLogout}>Log Out</a>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}

export default Navbar
