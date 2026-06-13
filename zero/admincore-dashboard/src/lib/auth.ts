import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export function onAuthChange(callback: (user: User | null) => void) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null)
  })
  return () => data?.subscription.unsubscribe()
}

export async function loginWithEmail(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}

export async function logout() {
  await supabase.auth.signOut()
}
