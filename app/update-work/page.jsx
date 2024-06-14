'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'
import Loader from '@components/Loader'
import Navbar from '@components/Navbar'

const UpdateWork = () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const workId = searchParams.get('id')

  const [loading, setLoading] = useState(true)

  const [work, setWork] = useState({
    category: '',
    title: '',
    description: '',
    price: '',
    photos: [],
  })

  useEffect(() => {
    const getWorkDetails = async () => {
      const response = await fetch(`api/work/${workId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()

      setWork({
        category: data.category,
        title: data.title,
        description: data.description,
        price: data.price,
        photos: data.workPhotoPaths,
      })

      setLoading(false)
    }

    if (workId) {
      getWorkDetails()
    }
  }, [workId])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const updateFormWork = new FormData()

      for (var key in work) {
        updateFormWork.append(key, work[key])
      }

      work.photos.forEach((photo) => {
        updateFormWork.append('workPhotoPaths', photo)
      })

      const response = await fetch(`/api/work/${workId}`, {
        method: 'PATCH',
        body: updateFormWork,
      })

      if (response.ok) {
        router.push(`/shop`)
      }
    } catch (err) {
      console.log('Publish Work failed', err.message)
    }
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <Form
        type='Edit'
        work={work}
        setWork={setWork}
        handleSubmit={handleSubmit}
      />
    </>
  )
}

export default UpdateWork
