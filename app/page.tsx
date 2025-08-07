'use client'

import { useAuth } from './contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/chat')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center">
        <div className="text-white text-xl">جاري التحميل...</div>
      </div>
    )
  }

  if (user) {
    return <div>جاري التحويل إلى المحادثة...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">مرحباً بك</h1>
          <p className="text-white/80 text-lg">تطبيق المحادثة مع Supabase</p>
        </div>
        
        <div className="space-y-4">
          <Link href="/login">
            <button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-white/30 hover:border-white/50">
              تسجيل الدخول
            </button>
          </Link>
          
          <Link href="/register">
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
              إنشاء حساب جديد
            </button>
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/20">
          <p className="text-white/60 text-sm">
            ابدأ المحادثة مع الأصدقاء والعائلة
          </p>
        </div>
      </div>
    </div>
  )
}