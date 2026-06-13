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

    async _insertGift(uid, item, tierName) {
      const id = 'vip_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6) + '_' + item.category;
      return _supabase.from('gifted_items').insert({
        id,
        uid,
        item_id: 'vip_' + item.category + '_' + item.tier,
        item_category: item.category,
        item_name: item.name || (item.category + ' ' + tierName),
        item_icon: item.img || '',
        svga_asset: item.svga || null,
        sent_by: 'system',
        sent_by_name: 'VIP System',
        sent_at: new Date().toISOString(),
        expires_at: null,
      });
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
        const gifts = [];

        if (tierConfig.headwear_url || tierConfig.headwear_img_url) {
          gifts.push({ category: 'frame', tier, name: 'Frame', img: tierConfig.headwear_img_url || '', svga: tierConfig.headwear_url || '' });
        }
        if (tierConfig.entrance_url || tierConfig.entrance_img_url) {
          gifts.push({ category: 'entrance', tier, name: 'Entrance', img: tierConfig.entrance_img_url || '', svga: tierConfig.entrance_url || '' });
        }
        if (tierConfig.bubble_url || tierConfig.bubble_img_url) {
          gifts.push({ category: 'bubble', tier, name: 'Bubble', img: tierConfig.bubble_img_url || '', svga: tierConfig.bubble_url || '' });
        }
        if (tierConfig.medal_url || tierConfig.medal_img_url) {
          gifts.push({ category: 'medal', tier, name: tierConfig.name + ' Medal', img: tierConfig.medal_img_url || '', svga: tierConfig.medal_url || '' });
        }
        if (tierConfig.necklace_url || tierConfig.necklace_img_url) {
          gifts.push({ category: 'necklace', tier, name: 'Necklace', img: tierConfig.necklace_img_url || '', svga: tierConfig.necklace_url || '' });
        }
        if (tierConfig.additional_files && tierConfig.additional_files.length) {
          tierConfig.additional_files.forEach((f, i) => {
            gifts.push({ category: 'extra_' + i, tier, name: f.name || 'Extra ' + (i + 1), img: f.url || '', svga: f.url || '' });
          });
        }

        for (const g of gifts) {
          try { await this._insertGift(uid, g, tierConfig.name || ('VIP ' + tier)); } catch (e) { console.warn('[VIP Bridge] gift insert failed for', g.category, e); }
        }
      }

      return true;
    },
  };

  window.__VIP_BRIDGE.init();
})();
