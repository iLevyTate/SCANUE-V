import Link from 'next/link'
import { Bot, ArrowRight } from 'lucide-react'
import { GradientButton } from '@/components/ui/gradient-button'
import { WavyBackground } from "@/components/ui/wavy-background"

export default function Home() {
  return (
    <WavyBackground
      className="relative"
      colors={['#38bdf8', '#818cf8', '#c084fc']}
      waveOpacity={0.3}
      blur={10}
    >
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl p-8 space-y-8 text-center bg-white/80 shadow-xl backdrop-blur-sm rounded-3xl sm:p-12">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              <Bot className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-transparent sm:text-5xl bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text">
            Welcome to SCANUEV
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Experience the power of AI with SCANUEV, our advanced chat interface. Choose between different agent types and get the assistance you need.
          </p>
          <div className="flex justify-center w-full">
            <Link href="/chat" passHref>
              <GradientButton className="flex items-center justify-center">
                Start Chatting
                <ArrowRight className="ml-2" />
              </GradientButton>
            </Link>
          </div>
        </div>
      </main>
    </WavyBackground>
  )
}
