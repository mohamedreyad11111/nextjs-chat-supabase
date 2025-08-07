import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client for client-side usage
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