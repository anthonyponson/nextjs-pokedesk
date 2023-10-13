import { useParams } from 'next/'

function page({ params }) {
  return (
    <div>
      <h2>{params}</h2>
    </div>
  )
}

export default page
