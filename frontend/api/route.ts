import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: NextRequest) {
  try {
    const { message, language } = await request.json()

    // Replace with your Flask backend URL
    const response = await axios.post('http://localhost:5000/chat', {
      message,
      language
    })

    return NextResponse.json({ reply: response.data.reply })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 })
  }
}
