import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Delete,
  FavoriteBorder,
} from '@mui/icons-material'

import '@styles/WorkCard.scss'

const WorkCard = ({ work }) => {
  const router = useRouter()

  const { data: session, update } = useSession()
  const userId = session?.user?._id

  const [currentIndex, setCurrentIndex] = useState(0)

  /* Slider for photos */
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % work.workPhotoPaths.length)
  }

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + work.workPhotoPaths.length) %
        work.workPhotoPaths.length
    )
  }

  /* DEelete work */
  const handleDelete = async () => {
    const hasConfirmed = confirm('Are you sure you want to delete this work?')

    if (hasConfirmed) {
      try {
        await fetch(`api/work/${work._id}`, {
          method: 'DELETE',
        })
        window.location.reload()
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div
      className='work-card'
      onClick={() => {
        router.push(`/work-details?id=${work._id}`)
      }}
    >
      <div className='slider-container'>
        <div
          className='slider'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {work.workPhotoPaths?.map((photo, index) => (
            <div className='slide' key={index}>
              <img src={photo} alt='work' />

              <div
                className='prev-button'
                onClick={(e) => {
                  goToPrevSlide(e)
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: '15px' }} />
              </div>

              <div
                className='next-button'
                onClick={(e) => {
                  goToNextSlide(e)
                }}
              >
                <ArrowForwardIos sx={{ fontSize: '15px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='info'>
        <div>
          <h3>{work.title}</h3>
          <div className='creator'>
            <img src={work.creator.profileImagePath} alt='creator' />
            <span>{work.creator.username}</span> in <span>{work.category}</span>
          </div>
        </div>
        <div className='price'>${work.price}</div>
      </div>

      {userId === work?.creator._id ? (
        <div
          className='icon'
          onClick={(e) => {
            e.stopPropagation()
            handleDelete()
          }}
        >
          <Delete
            sx={{
              borderRadius: '50%',
              backgroundColor: 'white',
              padding: '5px',
              fontSize: '30px',
            }}
          />
        </div>
      ) : (
        <div className='icon'>
          <FavoriteBorder
            sx={{
              borderRadius: '50%',
              backgroundColor: 'white',
              padding: '5px',
              fontSize: '30px',
            }}
          />
        </div>
      )}
    </div>
  )
}

export default WorkCard
