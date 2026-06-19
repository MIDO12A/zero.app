"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const auth_1 = require("../middleware/auth");
const auth_2 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            res.status(400).json({ error: 'Email, password, and name are required' });
            return;
        }
        const { data: existingAuth, error: authError } = await database_1.supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
        });
        if (authError) {
            res.status(400).json({ error: authError.message });
            return;
        }
        const uid = existingAuth.user.id;
        const customId = String(1000000 + Math.floor(Math.random() * 9000000));
        const { error: dbError } = await database_1.supabase.from('users').insert({
            uid,
            custom_id: customId,
            name,
            email,
            gender: 'male',
            coins: 10000,
            diamonds: 0,
        });
        if (dbError) {
            await database_1.supabase.auth.admin.deleteUser(uid);
            res.status(400).json({ error: dbError.message });
            return;
        }
        const token = (0, auth_1.generateToken)({ uid, role: 'user' });
        res.status(201).json({
            token,
            user: { uid, custom_id: customId, name, email, coins: 10000, diamonds: 0 },
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        const { data, error } = await database_1.supabase.auth.signInWithPassword({ email, password });
        if (error) {
            res.status(401).json({ error: error.message });
            return;
        }
        const { data: profile } = await database_1.supabase
            .from('users')
            .select('*')
            .eq('uid', data.user.id)
            .single();
        if (profile?.banned) {
            res.status(403).json({ error: `Account banned: ${profile.ban_reason || 'No reason'}` });
            return;
        }
        const token = (0, auth_1.generateToken)({ uid: data.user.id, role: profile?.role || 'user' });
        res.json({
            token,
            user: { uid: data.user.id, ...profile },
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/me', auth_2.authenticate, async (req, res) => {
    try {
        const { data: user, error } = await database_1.supabase
            .from('users')
            .select('*')
            .eq('uid', req.user.uid)
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
router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await database_1.supabase.auth.signInWithPassword({ email, password });
        if (error) {
            res.status(401).json({ error: error.message });
            return;
        }
        const { data: profile } = await database_1.supabase
            .from('users')
            .select('role')
            .eq('uid', data.user.id)
            .single();
        if (profile?.role !== 'admin') {
            res.status(403).json({ error: 'Not an admin account' });
            return;
        }
        const token = (0, auth_1.generateToken)({ uid: data.user.id, role: 'admin' });
        res.json({ token, uid: data.user.id });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map