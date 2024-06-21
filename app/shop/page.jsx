'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

import '@styles/Shop.scss'
import Loader from '@components/Loader'
import Navbar from '@components/Navbar'
import WorkList from '@components/WorkList'

const Shop = () => {
  const { data: session } = useSession()
  const loggedInUserId = session?.user?._id

  const searchParams = useSearchParams()
  const profileId = searchParams.get('id')

  const [loading, setLoading] = useState(true)
  const [workList, setWorkList] = useState([])
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const getWorkList = async () => {
      const response = await fetch(`api/user/${profileId}/shop`, {})
      const data = await response.json()
      setWorkList(data.workList)
      setProfile(data.user)
      setLoading(false)
    }

    if (profileId) {
      getWorkList()
    }
  }, [profileId])

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      {loggedInUserId === profileId && (
        <h1 className='title-list'>Your Works</h1>
      )}

      {loggedInUserId !== profileId && (
        <h1 className='title-list'>{profile.username}s Works</h1>
      )}

      <WorkList data={workList} />
    </>
  )
}

export default Shop
