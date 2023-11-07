import loader from '@/public/loader.png'
import Image from 'next/image'

export default function Loader() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-4'>
        <img src={loader} height={100} width={100} alt='img' />
      </div>
      <p className='mt-2 text-gray-600 text-lg'>Loading...</p>
    </div>
  )
}
