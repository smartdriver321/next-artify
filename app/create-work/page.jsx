'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'
import Navbar from '@components/Navbar'

const CreateWork = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [work, setWork] = useState({
    creator: '',
    category: '',
    title: '',
    description: '',
    price: '',
    photos: [],
  })

  if (session) {
    work.creator = session?.user?._id
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const newWorkForm = new FormData()

      for (var key in work) {
        newWorkForm.append(key, work[key])
      }

      work.photos.forEach((photo) => {
        newWorkForm.append('workPhotoPaths', photo)
      })

      const response = await fetch('/api/work/new', {
        method: 'POST',
        body: newWorkForm,
      })

      if (response.ok) {
        router.push(`/shop?id=${session?.user?._id}`)
      }
    } catch (err) {
      console.log('Publish Work failed', err.message)
    }
  }

  return (
    <div>
      <Navbar />
      <Form
        type='Create'
        work={work}
        setWork={setWork}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default CreateWork
