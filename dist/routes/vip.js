"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const auth_1 = require("../middleware/auth");
const vipService_1 = require("../services/vipService");
const router = (0, express_1.Router)();
router.get('/tiers', (_req, res) => {
    res.json({ tiers: (0, vipService_1.getVipTiers)() });
});
router.get('/:uid', auth_1.authenticate, async (req, res) => {
    try {
        const { uid } = req.params;
        const { data: user, error } = await database_1.supabase
            .from('users')
            .select('uid, vip_tier, recharge_exp, diamonds')
            .eq('uid', uid)
            .single();
        if (error) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const tier = user.vip_tier || 0;
        const nextTier = (0, vipService_1.calculateVipLevel)((user.recharge_exp || 0) + 1);
        const tierInfo = (0, vipService_1.getVipTier)(tier);
        const nextTierInfo = tier < 15 ? (0, vipService_1.getVipTier)(tier + 1) : null;
        res.json({
            current_tier: tier,
            tier_info: tierInfo || null,
            next_tier: tier < 15 ? tier + 1 : null,
            next_tier_info: nextTierInfo || null,
            recharge_for_next: nextTierInfo ? nextTierInfo.monthly_price - (user.recharge_exp || 0) : 0,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.put('/set-tier', auth_1.authenticate, (0, auth_1.requireRole)('admin'), async (req, res) => {
    try {
        const { uid, tier } = req.body;
        if (tier < 0 || tier > 15) {
            res.status(400).json({ error: 'Tier must be 0-15' });
            return;
        }
        const { error } = await database_1.supabase
            .from('users')
            .update({ vip_tier: tier })
            .eq('uid', uid);
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
//# sourceMappingURL=vip.js.map