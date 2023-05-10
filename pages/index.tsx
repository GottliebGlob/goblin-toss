import Head from 'next/head'
import Image from 'next/image'
import { useRef, useState } from 'react'
import dynamic from "next/dynamic"
import { ConnectButton } from '@rainbow-me/rainbowkit'

const BettingSection = dynamic(
  () => import("@/common/copmonents/BetSection/BetSection"),
  {
    ssr: false,
  },
)


export default function Home() {
  const [choice, setChoice] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  const onCoinClick = () => {
    setChoice(!choice)
    videoRef.current?.play()
  }

  return (
    <>
      <Head>
        <title>Goblin Toss</title>
        <meta name="description" content="Goblin gambling game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen min-h-screen bg-back-200 flex items-center flex-col">

<div className="absolute top-4 right-4">

</div>
     

        <section className="w-[70vw] min-w-[360px] h-full min-h-screen flex flex-col">
          <div className="w-full flex flex-col items-center justify-center h-[70vh] min-h-[550px] bg-main rounded-2xl mt-[5%] transition ease-in-out delay-150 drop-shadow-gold hover:drop-shadow-goldStrong amination-fade">
          <p className="text-white font-bold font-sans text-[72px]">1.94x</p>

<video
  src="/coin.webm"
  width="140"
  height="140"
  muted
  ref={videoRef}
  onClick={onCoinClick}
  className="cursor-pointer brightness-80 contrast-75 hover:brightness-100 hover:contrast-100"
/>

    <BettingSection choice={choice} />
          </div>

        </section>
        
      </main>
    </>
  )
}
