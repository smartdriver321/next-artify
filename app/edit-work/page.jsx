import Form from '@components/Form'
import Navbar from '@components/Navbar'

const EditWork = () => {
  return (
    <div>
      <Navbar />
      <Form type='Edit' work={work} setWork={setWork} />
    </div>
  )
}

export default EditWork
