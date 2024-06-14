'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import '@styles/Shop.scss'
import Loader from '@components/Loader'
import Navbar from '@components/Navbar'
import WorkList from '@components/WorkList'

const Shop = () => {
  const { data: session } = useSession()
  const loggedInUserId = session?.user?._id

  const [loading, setLoading] = useState(true)
  const [workList, setWorkList] = useState([])
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const getWorkList = async () => {
      const response = await fetch(`api/user/${loggedInUserId}/shop`, {})
      const data = await response.json()
      setWorkList(data.workList)
      setProfile(data.user)
      setLoading(false)
    }

    if (loggedInUserId) {
      getWorkList()
    }
  }, [loggedInUserId])

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      {loggedInUserId && <h1 className='title-list'>Your Works</h1>}

      <WorkList data={workList} />
    </>
  )
}

export default Shop
