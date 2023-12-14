
import { Inter } from 'next/font/google'
import Freel from './Freel'
import Chat from './Chat'
import WordToPdf from './WordToPdf'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex items-center justify-between p-24 ${inter.className}`}
    >
    <Freel />
     {/* <Chat /> */}

     <WordToPdf />
    </main>
  )
}
