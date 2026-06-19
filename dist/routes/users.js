"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/search', auth_1.authenticate, async (req, res) => {
    try {
        const { q, custom_id } = req.query;
        let query = database_1.supabase.from('users').select('uid, custom_id, name, photo_url, level, vip_tier');
        if (custom_id) {
            query = query.eq('custom_id', custom_id);
        }
        else if (q) {
            query = query.or(`name.ilike.%${q}%,custom_id.ilike.%${q}%`);
        }
        else {
            res.status(400).json({ error: 'Provide q or custom_id' });
            return;
        }
        const { data, error } = await query.limit(20);
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ users: data });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/:uid/profile', auth_1.authenticate, async (req, res) => {
    try {
        const { uid } = req.params;
        const { data: user, error } = await database_1.supabase
            .from('users')
            .select('uid, custom_id, name, photo_url, gender, level, experience, vip_tier, coins, diamonds, total_gifts_sent, total_gifts_received, followers, following, visitors, charm, active_frame, active_headwear, active_bubble, active_entrance, active_car, active_cover, owned_badges, owned_level_frames, owned_level_badges, owned_necklaces')
            .eq('uid', uid)
            .single();
        if (error) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ user });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.put('/profile', auth_1.authenticate, async (req, res) => {
    try {
        const uid = req.user.uid;
        const allowedFields = ['name', 'photo_url', 'gender'];
        const updates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }
        if (Object.keys(updates).length === 0) {
            res.status(400).json({ error: 'No valid fields to update' });
            return;
        }
        const { error } = await database_1.supabase.from('users').update(updates).eq('uid', uid);
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
router.get('/by-custom/:customId', auth_1.authenticate, async (req, res) => {
    try {
        const { customId } = req.params;
        const { data: user, error } = await database_1.supabase
            .from('users')
            .select('uid, custom_id, name, photo_url, level')
            .eq('custom_id', customId)
            .single();
        if (error) {
            res.status(404).json({ error: 'User not found with this ID' });
            return;
        }
        res.json({ user });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.put('/:uid/ban', auth_1.authenticate, (0, auth_1.requireRole)('admin'), async (req, res) => {
    try {
        const { uid } = req.params;
        const { reason } = req.body;
        const { error } = await database_1.supabase
            .from('users')
            .update({ banned: true, ban_reason: reason || 'No reason' })
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
router.put('/:uid/unban', auth_1.authenticate, (0, auth_1.requireRole)('admin'), async (req, res) => {
    try {
        const { uid } = req.params;
        const { error } = await database_1.supabase
            .from('users')
            .update({ banned: false, ban_reason: '' })
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
router.put('/make-admin', auth_1.authenticate, (0, auth_1.requireRole)('admin'), async (req, res) => {
    try {
        const { uid } = req.body;
        const { error } = await database_1.supabase
            .from('users')
            .update({ role: 'admin' })
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
//# sourceMappingURL=users.js.map