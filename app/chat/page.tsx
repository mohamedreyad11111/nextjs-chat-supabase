'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '../../lib/supabase'

interface Message {
  id: string
  text: string
  user_id: string
  user_name: string
  created_at: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, signOut } = useAuth()
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createSupabaseClient()

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    fetchMessages()
    
    // Subscribe to realtime changes
    const messagesSubscription = supabase
      .channel('messages')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMessages(prev => [...prev, payload.new as Message])
          }
        }
      )
      .subscribe()

    return () => {
      messagesSubscription.unsubscribe()
    }
  }, [user, router, supabase])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages')
      if (response.ok) {
        const result = await response.json()
        setMessages(result.data || [])
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !user || loading) return

    try {
      setLoading(true)
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newMessage.trim(),
        }),
      })

      if (response.ok) {
        setNewMessage('')
      } else {
        console.error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  if (!user) {
    return <div>جاري التحميل...</div>
  }

  const displayName = user.user_metadata?.display_name || user.email

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {displayName?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h1 className="text-white font-semibold">
                مرحباً {displayName}
              </h1>
              <p className="text-white/70 text-sm">متصل الآن</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 border border-white/30"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col p-4">
        <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 mb-4 overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-hide space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-white/70 mt-8">
                <p className="text-xl">لا توجد رسائل بعد</p>
                <p className="text-sm mt-2">ابدأ المحادثة بكتابة رسالة</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.user_id === user.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.user_id === user.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white ml-2'
                      : 'bg-white/20 text-white mr-2 border border-white/30'
                  }`}>
                    {message.user_id !== user.id && (
                      <p className="text-xs text-white/70 mb-1">{message.user_name}</p>
                    )}
                    <p className="break-words">{message.text}</p>
                    <p className="text-xs text-white/70 mt-1 text-left">
                      {new Date(message.created_at).toLocaleTimeString('ar-EG', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <form onSubmit={sendMessage} className="flex space-x-2">
          <button
            type="submit"
            disabled={loading || !newMessage.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? '...' : 'إرسال'}
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  )
}