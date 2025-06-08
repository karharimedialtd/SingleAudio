// lib/supabase.ts

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Supabase URL or Anon Key is missing. Check your .env config.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
