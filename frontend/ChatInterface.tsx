'use client'
import { useState } from 'react'
import axios from 'axios'

interface ChatMessage {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export default function ChatInterface({ language }: { language: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    if (!input.trim()) return

    const newUserMessage: ChatMessage = {
      id: Date.now(),
      text: input,
      sender: 'user'
    }

    setMessages(prev => [...prev, newUserMessage])
    setInput('')

    try {
      const response = await axios.post('/api/chat', {
        message: input,
        language: language
      })

      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        text: response.data.reply,
        sender: 'bot'
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div className="w-full max-w-xl">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`mb-2 p-2 rounded ${
                message.sender === 'user' 
                  ? 'bg-blue-100 text-right' 
                  : 'bg-green-100 text-left'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex p-4">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 border rounded-l"
            placeholder="Ask about crops in Malayalam"
          />
          <button 
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

