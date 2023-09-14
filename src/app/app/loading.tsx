import Image from 'next/image'
import loadingGif from '@/public/assets/giphy.gif'

export default function Loading() {
  return (
    <div className="h-screen flex bg-blackBG flex-col justify-center items-center text-white">
      <Image src={loadingGif} alt="loading gif" />
      <h1 className="text-4xl text-secondary">loading...</h1>
    </div>
  )
}
