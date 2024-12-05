'use client'
import { useState } from 'react'
import ChatInterface from '@/src/app/ChatInterface'
import LanguageSelector from '@/src/app/LanguageSelector'

export default function Home() {
  const [language, setLanguage] = useState('ml') // Malayalam as default

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <LanguageSelector 
          currentLanguage={language} 
          onLanguageChange={setLanguage} 
        />
        <ChatInterface language={language} />
      </div>
    </main>
  )
}
