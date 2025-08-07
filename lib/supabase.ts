import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for client components
export const createSupabaseClient = () => createClientComponentClient()

// Client for server components
export const createSupabaseServerClient = () => createServerComponentClient({ cookies })

// Client for API routes with service role
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Regular client for client-side usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      messages: {
        Row: {
          id: string
          text: string
          user_id: string
          user_name: string
          created_at: string
        }
        Insert: {
          text: string
          user_id: string
          user_name: string
        }
        Update: {
          text?: string
          user_name?: string
        }
      }
      profiles: {
        Row: {
          id: string
          display_name: string
          email: string
          created_at: string
        }
        Insert: {
          id: string
          display_name: string
          email: string
        }
        Update: {
          display_name?: string
        }
      }
    }
  }
}