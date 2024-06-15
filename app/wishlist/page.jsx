'use client'

import { useSession } from 'next-auth/react'

import '@styles/Wishlist.scss'
import Navbar from '@components/Navbar'
import Loader from '@components/Loader'
import WorkList from '@components/WorkList'

const Wishlist = () => {
  const { data: session } = useSession()
  const wishlist = session?.user?.wishlist

  console.log(wishlist)

  return !session ? (
    <Loader />
  ) : (
    <>
      <Navbar />

      <h1 className='title-list'>Your Wishlist</h1>

      <WorkList data={wishlist} />
    </>
  )
}

export default Wishlist
