import { supabase, getAdminSupabase } from './supabase'
import type {
  UserModel, RoomModel, GiftModel, SentGiftModel,
  StoreItemModel, UnionModel, BugReport, AppConfig,
  LevelConfig, VIPConfig, BadgeConfig, AgencyModel,
  CPModel, BDModel, GiftedItem, UserVIP, NecklaceConfig,
} from '../types'

// ---- Auth Admin ----

export async function updateUserPassword(uid: string, password: string) {
  try {
    const adminClient = getAdminSupabase()
    if (!adminClient) throw new Error('Admin client not available')
    const { error } = await adminClient.auth.admin.updateUserById(uid, { password })
    if (error) throw error
  } catch (e) {
    console.warn('updateUserPassword failed:', e)
    throw e
  }
}

export async function getAuthUsers() {
  try {
    const adminClient = getAdminSupabase()
    if (!adminClient) return []
    const { data, error } = await adminClient.auth.admin.listUsers()
    if (error) throw error
    return data.users
  } catch (e) {
    console.warn('getAuthUsers failed:', e)
    return []
  }
}

export async function getAuthUser(uid: string) {
  try {
    const adminClient = getAdminSupabase()
    if (!adminClient) return null
    const { data, error } = await adminClient.auth.admin.getUserById(uid)
    if (error) throw error
    return data.user
  } catch (e) {
    console.warn('getAuthUser failed:', e)
    return null
  }
}

// ---- Helpers ----

function toCamelCase(record: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(record)) {
    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
    result[camelKey] = value
  }
  return result
}

function toSnakeCase(record: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(record)) {
    const snakeKey = key.replace(/[A-Z]/g, c => `_${c.toLowerCase()}`)
    result[snakeKey] = value
  }
  return result
}

function mapList<T>(list: Record<string, unknown>[]): T[] {
  return list.map(item => toCamelCase(item) as unknown as T)
}

function mapSingle<T>(item: Record<string, unknown> | null): T | null {
  if (!item) return null
  return toCamelCase(item) as unknown as T
}

// ---- Users ----

export async function syncAllAuthUsersToDB() {
  const adminClient = getAdminSupabase()
  if (!adminClient) throw new Error('Admin client not available')

  try {
    // 1. Get all auth users
    const { data: authData, error: authError } = await adminClient.auth.admin.listUsers()
    if (authError) throw authError
    if (!authData?.users) return { total: 0, synced: 0 }

    // 2. Get existing users in DB
    const { data: existingUsers, error: fetchError } = await adminClient.from('users').select('uid')
    if (fetchError) throw fetchError
    const existingUids = new Set(existingUsers?.map(u => u.uid) || [])

    // 3. Create missing users
    let syncedCount = 0
    for (const au of authData.users) {
      if (!existingUids.has(au.id)) {
        const metadata = au.user_metadata || {}
        const name = metadata.name || metadata.full_name || metadata.display_name || au.email?.split('@')[0] || 'Unknown'
        const photoUrl = metadata.avatar_url || metadata.picture || metadata.photoUrl || metadata.image || ''
        const email = au.email || ''
        const phone = au.phone || metadata.phone || ''

        const newUser: Partial<UserModel> = {
          uid: au.id,
          customId: au.id.slice(0, 8),
          name,
          photoUrl,
          email,
          phone,
          coins: 0,
          diamonds: 0,
          level: 1,
          experience: 0,
          followers: 0,
          following: 0,
          charm: 0,
          totalGiftsReceived: 0,
          wealthLevel: 1,
          wealthExp: 0,
          rechargeLevel: 1,
          rechargeExp: 0,
          gemsLevel: 1,
          gemsExp: 0,
          gender: 'male',
          banned: false,
          activeFrame: null,
          activeBubble: null,
          activeEntrance: null,
          activeCar: null,
          activeCover: null,
          activeNecklace: null,
          ownedItems: [],
          ownedBadges: [],
          ownedNecklaces: [],
          ownedLevelFrames: [],
          ownedLevelBadges: [],
        }

        const { error: insertError } = await adminClient.from('users').insert(toSnakeCase(newUser as Record<string, unknown>))
        if (!insertError) {
          syncedCount++
        }
      }
    }
    return { total: authData.users.length, synced: syncedCount }
  } catch (e) {
    console.error('syncAllAuthUsersToDB failed:', e)
    throw e
  }
}

export async function getUsers(): Promise<UserModel[]> {
  const adminClient = getAdminSupabase()
  const results: UserModel[] = []

  // 1. Fetch ONLY from public users table (this is our source of truth!)
  try {
    const client = adminClient || supabase
    const { data } = await client.from('users').select('*').order('uid')
    if (data) results.push(...mapList<UserModel>(data))
  } catch (e) {
    console.warn('getUsers: public table failed', e)
  }

  return results.sort((a, b) => (a.uid || '').localeCompare(b.uid || ''))
}

export function subscribeUsers(cb: (users: UserModel[]) => void) {
  const client = getAdminSupabase() || supabase
  const sub = client.channel('users-db').on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => {
    getUsers().then(cb)
  }).subscribe((status) => {
    if (status !== 'SUBSCRIBED') {
      console.warn('subscribeUsers: channel status', status)
    }
  })
  return () => { try { client.removeChannel(sub) } catch {} }
}

export async function getUser(uid: string): Promise<UserModel | null> {
  try {
    const client = getAdminSupabase() || supabase
    const { data } = await client.from('users').select('*').eq('uid', uid).maybeSingle()
    return mapSingle<UserModel>(data)
  } catch (e) {
    console.warn('getUser failed:', e)
    return null
  }
}

export async function updateUser(uid: string, data: Partial<UserModel>) {
  const client = getAdminSupabase() || supabase
  
  // First try to update
  try {
    const { data: existingUser, error: fetchError } = await client.from('users').select('uid').eq('uid', uid).maybeSingle()
    
    if (fetchError) {
      console.error('Error checking for existing user:', fetchError)
      throw fetchError
    }
    
    if (!existingUser) {
      // User doesn't exist - create new record
      const userData: Partial<UserModel> = {
        uid,
        coins: 0,
        diamonds: 0,
        level: 1,
        experience: 0,
        followers: 0,
        following: 0,
        charm: 0,
        totalGiftsReceived: 0,
        wealthLevel: 1,
        wealthExp: 0,
        rechargeLevel: 1,
        rechargeExp: 0,
        gemsLevel: 1,
        gemsExp: 0,
        gender: 'male',
        banned: false,
        activeFrame: null,
        activeBubble: null,
        activeEntrance: null,
        activeCar: null,
        activeCover: null,
        activeNecklace: null,
        ownedItems: [],
        ownedBadges: [],
        ownedNecklaces: [],
        ownedLevelFrames: [],
        ownedLevelBadges: [],
        ...data,
      }
      
      const snakeData = toSnakeCase(userData as Record<string, unknown>)
      console.log('Inserting new user with data:', snakeData)
      
      const { error: insertError } = await client.from('users').insert(snakeData)
      if (insertError) {
        console.error('Error inserting user:', insertError)
        throw insertError
      }
    } else {
      // User exists - update
      const snakeData = toSnakeCase(data as Record<string, unknown>)
      console.log('Updating user with data:', snakeData)
      
      const { error } = await client.from('users').update(snakeData).eq('uid', uid)
      if (error) {
        console.error('Error updating user:', error)
        throw error
      }
    }
  } catch (e) {
    console.error('updateUser failed:', e)
    throw e
  }
}

export async function deleteUser(uid: string) {
  try {
    const adminClient = getAdminSupabase() || supabase
    if (!adminClient) throw new Error('Need admin connection to delete users')
    
    console.log('Starting complete user deletion for:', uid)
    
    // First, get the FOREIGN KEY IS FROM ERROR says `sent_gifts_sender_id_fkey` so column is sender_id, let's delete from sent_gifts FIRST
    try {
      console.log('Deleting sent gifts by this user...')
      // Try every possible column name for sent_gifts
      const possibleSentGiftColumns = ['sender_id', 'receiver_id', 'user_id', 'uid', 'sender_uid', 'receiver_uid']
      for (const col of possibleSentGiftColumns) {
        try {
          await adminClient.from('sent_gifts').delete().eq(col, uid)
          console.log(`Deleted from sent_gifts using column: ${col}`)
        } catch { /* ignore */ }
      }
    } catch (err) {
      console.log('sent_gifts cleanup done')
    }
    
    // Now delete everything else
    const safeDeletes = [
      { table: 'room_messages', columns: ['sender_uid', 'sender_id', 'user_id', 'uid'] },
      { table: 'user_vips', columns: ['uid', 'user_id'] },
      { table: 'gifted_items', columns: ['uid', 'user_id'] },
    ]
    
    for (const { table, columns } of safeDeletes) {
      for (const column of columns) {
        try {
          await adminClient.from(table).delete().eq(column, uid)
          console.log(`Deleted from ${table} (${column})`)
        } catch (err) {
          console.log(`Skipping ${table} ${column} (not found)`)
        }
      }
    }
    
    // Now delete THE USER LAST!
    // Use .like() to force text comparison (avoids "uuid = text" operator error)
    console.log('Deleting main user record...')
    const { error: userError } = await adminClient.from('users').delete().like('uid', uid)
    if (userError) {
      console.error('FAILED TO DELETE MAIN USER:', userError)
      throw new Error(`Cannot delete user: ${userError.message || userError.details}`)
    }
    
    // Delete from auth
    try {
      await adminClient.auth.admin.deleteUser(uid)
    } catch { /* okay if already gone */ }
    
    console.log('✅ USER DELETED COMPLETELY!')
  } catch (e) {
    console.error('DELETE FAILED:', e)
    throw e
  }
}

// ---- Gifts ----

export async function getGifts(): Promise<GiftModel[]> {
  try {
    const { data } = await supabase.from('gifts').select('*').order('sort_order')
    return mapList<GiftModel>(data ?? [])
  } catch {
    return []
  }
}

export function subscribeGifts(cb: (gifts: GiftModel[]) => void) {
  const sub = supabase.channel('gifts').on('postgres_changes', { event: '*', schema: 'public', table: 'gifts' }, () => {
    getGifts().then(cb)
  }).subscribe()
  return () => { try { supabase.removeChannel(sub) } catch {} }
}

export async function updateGift(id: string, data: Partial<GiftModel>) {
  try {
    await supabase.from('gifts').update(toSnakeCase(data as Record<string, unknown>)).eq('id', id)
  } catch (e) {
    console.warn('updateGift failed:', e)
  }
}

export async function addGift(id: string, data: GiftModel) {
  try {
    await supabase.from('gifts').upsert({ id, ...toSnakeCase(data as unknown as Record<string, unknown>) })
  } catch (e) {
    console.warn('addGift failed:', e)
  }
}

export async function deleteGift(id: string) {
  try {
    await supabase.from('gifts').delete().eq('id', id)
  } catch (e) {
    console.warn('deleteGift failed:', e)
  }
}

// ---- Store Items ----

export async function getStoreItems(): Promise<StoreItemModel[]> {
  try {
    const { data } = await supabase.from('store_items').select('*').order('item_id')
    return mapList<StoreItemModel>(data ?? [])
  } catch {
    return []
  }
}

export function subscribeStoreItems(cb: (items: StoreItemModel[]) => void) {
  const sub = supabase.channel('store_items').on('postgres_changes', { event: '*', schema: 'public', table: 'store_items' }, () => {
    getStoreItems().then(cb)
  }).subscribe()
  return () => { try { supabase.removeChannel(sub) } catch {} }
}

export async function updateStoreItem(id: string, data: Partial<StoreItemModel>) {
  try {
    await supabase.from('store_items').update(toSnakeCase(data as Record<string, unknown>)).eq('item_id', id)
  } catch (e) {
    console.warn('updateStoreItem failed:', e)
  }
}

export async function addStoreItem(id: string, data: StoreItemModel) {
  try {
    await supabase.from('store_items').upsert({ item_id: id, ...toSnakeCase(data as unknown as Record<string, unknown>) })
  } catch (e) {
    console.warn('addStoreItem failed:', e)
  }
}

export async function deleteStoreItem(id: string) {
  try {
    await supabase.from('store_items').delete().eq('item_id', id)
  } catch (e) {
    console.warn('deleteStoreItem failed:', e)
  }
}

// ---- Rooms ----

export async function getRooms(): Promise<RoomModel[]> {
  try {
    const { data } = await supabase.from('rooms').select('*').order('created_at', { ascending: false })
    return mapList<RoomModel>(data ?? [])
  } catch {
    return []
  }
}

export function subscribeRooms(cb: (rooms: RoomModel[]) => void) {
  const sub = supabase.channel('rooms').on('postgres_changes', { event: '*', schema: 'public', table: 'rooms' }, () => {
    getRooms().then(cb)
  }).subscribe()
  return () => { try { supabase.removeChannel(sub) } catch {} }
}

export async function updateRoom(id: string, data: Partial<RoomModel>) {
  try {
    await supabase.from('rooms').update(toSnakeCase(data as Record<string, unknown>)).eq('room_id', id)
  } catch (e) {
    console.warn('updateRoom failed:', e)
  }
}

export async function deleteRoom(id: string) {
  try {
    await supabase.from('rooms').delete().eq('room_id', id)
  } catch (e) {
    console.warn('deleteRoom failed:', e)
  }
}

// ---- Unions ----

export async function getUnions(): Promise<UnionModel[]> {
  try {
    const { data } = await supabase.from('unions').select('*').order('created_at', { ascending: false })
    return mapList<UnionModel>(data ?? [])
  } catch {
    return []
  }
}

export function subscribeUnions(cb: (unions: UnionModel[]) => void) {
  const sub = supabase.channel('unions').on('postgres_changes', { event: '*', schema: 'public', table: 'unions' }, () => {
    getUnions().then(cb)
  }).subscribe()
  return () => { try { supabase.removeChannel(sub) } catch {} }
}

// ---- Sent Gifts ----

export async function getSentGifts(): Promise<SentGiftModel[]> {
  try {
    const { data } = await supabase.from('sent_gifts').select('*').order('created_at', { ascending: false })
    return mapList<SentGiftModel>(data ?? [])
  } catch {
    return []
  }
}

// ---- Bug Reports ----

export async function getBugReports(): Promise<BugReport[]> {
  try {
    const { data } = await supabase.from('bug_reports').select('*').order('created_at', { ascending: false })
    return mapList<BugReport>(data ?? [])
  } catch {
    return []
  }
}

export function subscribeBugReports(cb: (reports: BugReport[]) => void) {
  const sub = supabase.channel('bug_reports').on('postgres_changes', { event: '*', schema: 'public', table: 'bug_reports' }, () => {
    getBugReports().then(cb)
  }).subscribe()
  return () => { try { supabase.removeChannel(sub) } catch {} }
}

// ---- App Config (key-value store, merged into single object) ----

export async function getAppConfig(): Promise<AppConfig | null> {
  try {
    const { data } = await supabase.from('app_config').select('*')
    if (!data || data.length === 0) return null
    const merged: Record<string, unknown> = {}
    for (const row of data) {
      const raw = row.value
      if (typeof raw === 'string') {
        try { merged[row.key as string] = JSON.parse(raw) } catch { merged[row.key as string] = raw }
      } else {
        merged[row.key as string] = raw
      }
    }
    return merged as unknown as AppConfig
  } catch {
    return null
  }
}

export async function updateAppConfig(updates: Partial<AppConfig>) {
  try {
    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined || value === null) continue
      const stored = typeof value === 'object' ? JSON.stringify(value) : value
      await supabase.from('app_config').upsert({ key, value: stored })
    }
  } catch (e) {
    console.warn('updateAppConfig failed:', e)
  }
}

export function subscribeAppConfig(cb: (config: AppConfig | null) => void) {
  const handler = () => getAppConfig().then(cb)
  const sub = supabase.channel('app_config').on('postgres_changes',
    { event: '*', schema: 'public', table: 'app_config' }, handler
  ).subscribe()
  handler()
  return () => { try { supabase.removeChannel(sub) } catch {} }
}

// ---- Level Config ----

export async function getLevels(type?: string): Promise<LevelConfig[]> {
  try {
    let query = supabase.from('level_config').select('*')
    if (type) query = query.eq('type', type)
    const { data } = await query.order('level')
    return mapList<LevelConfig>(data ?? [])
  } catch {
    return []
  }
}

export function subscribeLevels(cb: (levels: LevelConfig[]) => void) {
  const sub = supabase.channel('level_config').on('postgres_changes', { event: '*', schema: 'public', table: 'level_config' }, () => {
    getLevels().then(cb)
  }).subscribe()
  return () => { try { supabase.removeChannel(sub) } catch {} }
}

export async function updateLevel(type: string, level: number, data: Partial<LevelConfig>) {
  try {
    const payload = toSnakeCase(data as Record<string, unknown>)
    const { data: list } = await supabase.from('level_config').select('level').eq('type', type).eq('level', level)
    const existing = list && list.length > 0 ? list[0] : null
    if (existing) {
      await supabase.from('level_config').update(payload).eq('type', type).eq('level', level)
    } else {
      await supabase.from('level_config').insert(payload)
    }
  } catch (e) {
    console.warn('updateLevel failed:', e)
  }
}

// ---- VIP Config ----

export async function getVIPConfig(): Promise<VIPConfig[]> {
  try {
    const { data } = await supabase.from('vip_config').select('*').order('tier')
    return mapList<VIPConfig>(data ?? [])
  } catch {
    return []
  }
}

export function subscribeVIPConfig(cb: (configs: VIPConfig[]) => void) {
  const sub = supabase.channel('vip_config').on('postgres_changes', { event: '*', schema: 'public', table: 'vip_config' }, () => {
    getVIPConfig().then(cb)
  }).subscribe()
  return () => { try { supabase.removeChannel(sub) } catch {} }
}

export async function updateVIPConfig(tier: number, data: Partial<VIPConfig>) {
  try {
    await supabase.from('vip_config').upsert({ tier, ...toSnakeCase(data as Record<string, unknown>) })
  } catch (e) {
    console.warn('updateVIPConfig failed:', e)
  }
}

// ---- Badges ----

export async function getBadges(): Promise<BadgeConfig[]> {
  try {
    const client = getAdminSupabase() || supabase
    const { data } = await client.from('badges').select('*').order('id')
    // Map safely with fallbacks for missing fields
    return (data ?? []).map((item: any): BadgeConfig => ({
      id: item.id,
      name: item.name || '',
      iconAsset: item.icon_asset || item.iconAsset || '',
      description: item.description || '',
      unlockCondition: item.unlock_condition || item.unlockCondition || '',
      svgaUrl: item.svga_url || item.svgaUrl || undefined,
      imageUrl: item.image_url || item.imageUrl || undefined,
      sortOrder: item.sort_order || item.sortOrder || 0,
      type: item.type || 'admin',
      levelType: item.level_type || item.levelType || 'wealth',
      levelNumber: item.level_number || item.levelNumber || undefined,
    }))
  } catch (e) {
    console.warn('getBadges failed:', e)
    return []
  }
}

export function subscribeBadges(cb: (badges: BadgeConfig[]) => void) {
  const sub = supabase.channel('badges').on('postgres_changes', { event: '*', schema: 'public', table: 'badges' }, () => {
    getBadges().then(cb)
  }).subscribe()
  return () => { try { supabase.removeChannel(sub) } catch {} }
}

export async function updateBadge(id: string, data: Partial<BadgeConfig>) {
  try {
    const client = getAdminSupabase() || supabase
    await client.from('badges').update(toSnakeCase(data as Record<string, unknown>)).eq('id', id)
  } catch (e) {
    console.warn('updateBadge failed:', e)
    throw e
  }
}

export async function addBadge(id: string, data: BadgeConfig) {
  try {
    const client = getAdminSupabase() || supabase
    const { error } = await client.from('badges').insert({ id, ...toSnakeCase(data as unknown as Record<string, unknown>) })
    if (error) throw error
  } catch (e) {
    console.warn('addBadge failed:', e)
    throw e
  }
}

export async function deleteBadge(id: string) {
  try {
    const client = getAdminSupabase() || supabase
    await client.from('badges').delete().eq('id', id)
  } catch (e) {
    console.warn('deleteBadge failed:', e)
    throw e
  }
}

// ---- Agencies ----

export async function getAgencies(): Promise<AgencyModel[]> {
  try {
    const { data } = await supabase.from('agencies').select('*').order('id')
    return mapList<AgencyModel>(data ?? [])
  } catch {
    return []
  }
}

export function subscribeAgencies(cb: (agencies: AgencyModel[]) => void) {
  const sub = supabase.channel('agencies').on('postgres_changes', { event: '*', schema: 'public', table: 'agencies' }, () => {
    getAgencies().then(cb)
  }).subscribe()
  return () => { try { supabase.removeChannel(sub) } catch {} }
}

// ---- CPs ----

export async function getCPs(): Promise<CPModel[]> {
  try {
    const { data } = await supabase.from('cps').select('*').order('id')
    return mapList<CPModel>(data ?? [])
  } catch {
    return []
  }
}

export function subscribeCPs(cb: (cps: CPModel[]) => void) {
  const sub = supabase.channel('cps').on('postgres_changes', { event: '*', schema: 'public', table: 'cps' }, () => {
    getCPs().then(cb)
  }).subscribe()
  return () => { try { supabase.removeChannel(sub) } catch {} }
}

// ---- BDs ----

export async function getBDs(): Promise<BDModel[]> {
  try {
    const { data } = await supabase.from('bds').select('*').order('id')
    return mapList<BDModel>(data ?? [])
  } catch {
    return []
  }
}

export function subscribeBDs(cb: (bds: BDModel[]) => void) {
  const sub = supabase.channel('bds').on('postgres_changes', { event: '*', schema: 'public', table: 'bds' }, () => {
    getBDs().then(cb)
  }).subscribe()
  return () => { try { supabase.removeChannel(sub) } catch {} }
}

// ---- Gifted Items ----

export async function getGiftedItems(): Promise<GiftedItem[]> {
  try {
    const { data } = await supabase.from('gifted_items').select('*').order('sent_at', { ascending: false })
    return mapList<GiftedItem>(data ?? [])
  } catch {
    return []
  }
}

export function subscribeGiftedItems(cb: (items: GiftedItem[]) => void) {
  const sub = supabase.channel('gifted_items').on('postgres_changes', { event: '*', schema: 'public', table: 'gifted_items' }, () => {
    getGiftedItems().then(cb)
  }).subscribe()
  return () => { try { supabase.removeChannel(sub) } catch {} }
}

export async function sendGiftedItem(uid: string, item: StoreItemModel, sentBy: string, sentByName: string, expiryDays: number): Promise<string> {
  try {
    const id = `gi_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
    const now = Date.now()
    await supabase.from('gifted_items').insert({
      id,
      uid,
      item_id: item.itemId,
      item_category: item.category,
      item_name: item.name,
      item_icon: item.iconAsset,
      svga_asset: item.svgaAsset,
      sent_by: sentBy,
      sent_by_name: sentByName,
      sent_at: now,
      expires_at: now + expiryDays * 86400000,
    })
    return id
  } catch (e) {
    console.warn('sendGiftedItem failed:', e)
    throw e
  }
}

export async function revokeGiftedItem(id: string) {
  try {
    await supabase.from('gifted_items').delete().eq('id', id)
  } catch (e) {
    console.warn('revokeGiftedItem failed:', e)
  }
}

// ---- Necklaces ----

export async function getNecklaces(): Promise<NecklaceConfig[]> {
  try {
    const client = getAdminSupabase() || supabase
    const { data } = await client.from('necklaces').select('*').order('sort_order')
    // Map safely with fallbacks for missing fields
    return (data ?? []).map((item: any): NecklaceConfig => ({
      id: item.id,
      name: item.name || '',
      svgaUrl: item.svga_url || item.svgaUrl || undefined,
      imageUrl: item.image_url || item.imageUrl || undefined,
      price: item.price || 0,
      sortOrder: item.sort_order || item.sortOrder || 0,
      type: item.type || 'admin',
      requiredRechargeLevel: item.required_recharge_level || item.requiredRechargeLevel || 0,
    }))
  } catch (e) {
    console.warn('getNecklaces failed:', e)
    return []
  }
}

export async function updateNecklace(id: string, data: Partial<NecklaceConfig>) {
  try {
    const client = getAdminSupabase() || supabase
    const payload = toSnakeCase(data as Record<string, unknown>)
    const { data: existing } = await client.from('necklaces').select('id').eq('id', id).maybeSingle()
    if (existing) {
      await client.from('necklaces').update(payload).eq('id', id)
    } else {
      await client.from('necklaces').upsert({ id, ...payload })
    }
  } catch (e) {
    console.warn('Necklace table not found or error:', e)
    throw e
  }
}

export async function deleteNecklace(id: string) {
  try {
    const client = getAdminSupabase() || supabase
    await client.from('necklaces').delete().eq('id', id)
  } catch (e) {
    console.warn('deleteNecklace failed:', e)
    throw e
  }
}

// ---- User VIPs ----

export async function getUserVIPs(): Promise<UserVIP[]> {
  try {
    const client = getAdminSupabase() || supabase
    const { data } = await client.from('user_vips').select('*, user:users(*)').order('purchased_at', { ascending: false })
    return mapList<UserVIP>(data ?? [])
  } catch {
    return []
  }
}

export async function giftVIP(uid: string, tier: number, giftedBy: string, expiryDays?: number): Promise<void> {
  try {
    const expiresAt = expiryDays ? new Date(Date.now() + expiryDays * 86400000).toISOString() : null
    await supabase.from('user_vips').upsert({
      uid,
      tier,
      purchased_at: new Date().toISOString(),
      expires_at: expiresAt,
      gifted_by: giftedBy,
    })
  } catch (e) {
    console.warn('giftVIP failed:', e)
  }
}

export async function revokeUserVIP(uid: string, tier: number) {
  try {
    await supabase.from('user_vips').delete().eq('uid', uid).eq('tier', tier)
  } catch (e) {
    console.warn('revokeUserVIP failed:', e)
  }
}

// ---- Stats ----

export async function getStats(): Promise<{
  totalUsers: number;
  totalRooms: number;
  totalGifts: number;
  totalRevenue: number;
}> {
  try {
    const { count: totalUsers } = await supabase.from('users').select('*', { count: 'exact', head: true })
    const { count: totalRooms } = await supabase.from('rooms').select('*', { count: 'exact', head: true })
    const { data: gifts } = await supabase.from('gifts').select('value')

    let totalRevenue = 0
    if (gifts) {
      gifts.forEach(g => { totalRevenue += (g.value as number) || 0 })
    }
    return {
      totalUsers: totalUsers ?? 0,
      totalRooms: totalRooms ?? 0,
      totalGifts: gifts?.length ?? 0,
      totalRevenue,
    }
  } catch {
    return {
      totalUsers: 0,
      totalRooms: 0,
      totalGifts: 0,
      totalRevenue: 0,
    }
  }
}
