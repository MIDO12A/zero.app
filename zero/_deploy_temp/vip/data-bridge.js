(function() {
  const SUPABASE_URL = 'https://mbdrysnfohknquevulif.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable__e-6T7nmOoPk0rsm0mk9qg__0S9OHPf';

  let _uid = null;
  let _supabase = null;

  function getUidFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('uid') || null;
  }

  window.__VIP_BRIDGE = {
    get uid() { return _uid; },
    get supabase() { return _supabase; },

    async init() {
      _uid = getUidFromUrl();
      _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('[VIP Bridge] initialized, uid:', _uid);
      return _uid;
    },

    async getVIPConfig() {
      if (!_supabase) return [];
      const { data } = await _supabase.from('vip_config').select('*').order('tier');
      return data || [];
    },

    async getUserVIPs(uid) {
      if (!_supabase || !uid) return [];
      const { data } = await _supabase.from('user_vips').select('*').eq('uid', uid);
      return data || [];
    },

    async getUser(uid) {
      if (!_supabase || !uid) return null;
      const { data } = await _supabase.from('users').select('*').eq('uid', uid).maybeSingle();
      return data || null;
    },

    async purchaseVIP(uid, tier) {
      if (!_supabase || !uid) throw new Error('Not authenticated');
      const { error: upsertError } = await _supabase.from('user_vips').upsert({
        uid,
        tier,
        purchased_at: new Date().toISOString(),
        expires_at: null,
        gifted_by: null,
      });
      if (upsertError) throw upsertError;

      const vipConfig = await this.getVIPConfig();
      const tierConfig = vipConfig.find(c => c.tier === tier);
      if (tierConfig) {
        await _supabase.from('gifted_items').insert({
          id: 'vip_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
          uid,
          item_id: 'vip_tier_' + tier,
          item_category: 'vip',
          item_name: tierConfig.name || 'VIP ' + tier,
          item_icon: tierConfig.image_url || '',
          svga_asset: null,
          sent_by: 'system',
          sent_by_name: 'VIP System',
          sent_at: new Date().toISOString(),
          expires_at: null,
        });
      }

      return true;
    },
  };

  window.__VIP_BRIDGE.init();
})();
