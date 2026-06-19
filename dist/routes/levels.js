"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const auth_1 = require("../middleware/auth");
const levelService_1 = require("../services/levelService");
const router = (0, express_1.Router)();
router.get('/config', (_req, res) => {
    res.json({ levels: (0, levelService_1.getLevelConfig)() });
});
router.get('/:uid', auth_1.authenticate, async (req, res) => {
    try {
        const { uid } = req.params;
        const { data: user, error } = await database_1.supabase
            .from('users')
            .select('uid, level, experience, wealth_level, wealth_exp, recharge_level, recharge_exp, gems_level, gems_exp, owned_level_frames, owned_level_badges')
            .eq('uid', uid)
            .single();
        if (error) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const mainLevel = (0, levelService_1.getLevelByXp)(user.experience);
        const wealthLevel = (0, levelService_1.getLevelByXp)(user.wealth_exp);
        const rechargeLevel = (0, levelService_1.getLevelByXp)(user.recharge_exp);
        const gemsLevel = (0, levelService_1.getLevelByXp)(user.gems_exp);
        res.json({
            main: { ...mainLevel, db_level: user.level },
            wealth: { ...wealthLevel, db_level: user.wealth_level },
            recharge: { ...rechargeLevel, db_level: user.recharge_level },
            gems: { ...gemsLevel, db_level: user.gems_level },
            owned_frames: user.owned_level_frames,
            owned_badges: user.owned_level_badges,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post('/add-xp', auth_1.authenticate, (0, auth_1.requireRole)('admin'), async (req, res) => {
    try {
        const { uid, amount, type } = req.body;
        if (!uid || !amount || !type) {
            res.status(400).json({ error: 'uid, amount, and type (experience|wealth_exp|recharge_exp|gems_exp) required' });
            return;
        }
        await (0, levelService_1.addXp)(uid, amount, type);
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
//# sourceMappingURL=levels.js.map