'use client'

import { useEffect, useState } from 'react'

import '@styles/Categories.scss'
import { categories } from '@data'
import Loader from './Loader'
import WorkList from './WorkList'

const Feed = () => {
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [workList, setWorkList] = useState([])

  const getWorkList = async () => {
    const response = await fetch(`/api/work/list/${selectedCategory}`)
    const data = await response.json()
    setWorkList(data)
    setLoading(false)
  }

  useEffect(() => {
    getWorkList()
  }, [selectedCategory])

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className='categories'>
        {categories?.map((item, index) => (
          <p
            onClick={() => setSelectedCategory(item)}
            className={`${item === selectedCategory ? 'selected' : ''}`}
            key={index}
          >
            {item}
          </p>
        ))}
      </div>

      <WorkList data={workList} />
    </>
  )
}

export default Feed
