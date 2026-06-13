import { createClient } from '@supabase/supabase-js'

const defaultSupabaseUrl = 'https://mbdrysnfohknquevulif.supabase.co'
const defaultAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iZHJ5c25mb2hrbnF1ZXZ1bGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NTI1NTQsImV4cCI6MjA5NjUyODU1NH0.uzMm_h6O_ye0NW9fnQE3PF7wjhjEZ1cb9JK6hBVv6tI'

const loadConfig = () => {
  const stored = localStorage.getItem('supabase_admin_config')
  if (stored) {
    try { return JSON.parse(stored) } catch { /* ignore */ }
  }
  return { supabaseUrl: defaultSupabaseUrl, serviceRoleKey: '' }
}

// Anon client for public operations (RLS applied)
export const supabase = createClient(
  defaultSupabaseUrl,
  defaultAnonKey,
  { auth: { autoRefreshToken: true, persistSession: true } }
)

// Cache admin client to avoid recreating it every time
let cachedAdminClient: ReturnType<typeof createClient> | null = null
let lastConfigHash = ''

const getConfigHash = () => {
  const config = loadConfig()
  return `${config.supabaseUrl || ''}|${config.serviceRoleKey || ''}`
}

export const getAdminSupabase = () => {
  const currentHash = getConfigHash()
  if (currentHash === lastConfigHash && cachedAdminClient) {
    return cachedAdminClient
  }

  const config = loadConfig()
  if (config.serviceRoleKey) {
    // Disable auth persistence for admin client to prevent multiple GoTrueClient conflicts
    cachedAdminClient = createClient(config.supabaseUrl || defaultSupabaseUrl, config.serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false }
    })
    lastConfigHash = currentHash
    return cachedAdminClient
  }

  cachedAdminClient = null
  lastConfigHash = ''
  return null
}

export const isAdminConnected = () => !!getAdminSupabase()
