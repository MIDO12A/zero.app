"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
router.get('/wealth', async (_req, res) => {
    try {
        const { data, error } = await database_1.supabase
            .from('users')
            .select('uid, custom_id, name, photo_url, total_gifts_sent, level')
            .order('total_gifts_sent', { ascending: false })
            .limit(100);
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ rankings: data });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/charm', async (_req, res) => {
    try {
        const { data, error } = await database_1.supabase
            .from('users')
            .select('uid, custom_id, name, photo_url, total_gifts_received, level')
            .order('total_gifts_received', { ascending: false })
            .limit(100);
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ rankings: data });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/rooms', async (_req, res) => {
    try {
        const { data, error } = await database_1.supabase
            .from('rooms')
            .select('room_id, name, room_photo_url, host_name, total_gifts, hot_value')
            .order('total_gifts', { ascending: false })
            .limit(100);
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ rankings: data });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/recharge', async (_req, res) => {
    try {
        const { data, error } = await database_1.supabase
            .from('users')
            .select('uid, custom_id, name, photo_url, recharge_exp, vip_tier')
            .order('recharge_exp', { ascending: false })
            .limit(100);
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ rankings: data });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/level', async (_req, res) => {
    try {
        const { data, error } = await database_1.supabase
            .from('users')
            .select('uid, custom_id, name, photo_url, level, experience')
            .order('experience', { ascending: false })
            .limit(100);
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ rankings: data });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
//# sourceMappingURL=rankings.js.map