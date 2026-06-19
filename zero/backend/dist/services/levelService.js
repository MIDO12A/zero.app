"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLevelConfig = getLevelConfig;
exports.getLevelByXp = getLevelByXp;
exports.addXp = addXp;
const database_1 = require("../config/database");
const LEVEL_CONFIGS = [];
for (let i = 1; i <= 100; i++) {
    LEVEL_CONFIGS.push({
        level: i,
        xp_required: Math.floor(100 * Math.pow(1.15, i - 1)),
        title: i <= 10 ? 'مبتدئ' : i <= 30 ? 'متقدم' : i <= 60 ? 'خبير' : i <= 80 ? 'أسطورة' : 'خرافي',
        rewards: i % 10 === 0 ? [{ type: 'coins', value: i * 500 }] : [],
    });
}
function getLevelConfig() {
    return LEVEL_CONFIGS;
}
function getLevelByXp(xp) {
    let level = 1;
    let remaining = xp;
    for (const cfg of LEVEL_CONFIGS) {
        if (remaining >= cfg.xp_required) {
            remaining -= cfg.xp_required;
            level = cfg.level + 1;
        }
        else {
            break;
        }
    }
    level = Math.min(level, 100);
    const currentLevelXp = LEVEL_CONFIGS[Math.min(level - 1, LEVEL_CONFIGS.length - 1)].xp_required;
    const nextLevelXp = level < 100 ? LEVEL_CONFIGS[level].xp_required : currentLevelXp;
    return {
        level,
        xp: remaining,
        nextLevelXp,
        progress: currentLevelXp > 0 ? remaining / currentLevelXp : 0,
    };
}
async function addXp(uid, amount, field) {
    const { data: user, error } = await database_1.supabase
        .from('users')
        .select(`${field}, level, coins`)
        .eq('uid', uid)
        .single();
    if (error || !user)
        throw new Error('User not found');
    const newXp = (user[field] || 0) + amount;
    const updates = { [field]: newXp };
    if (field === 'experience') {
        const { level: newLevel } = getLevelByXp(newXp);
        if (newLevel > user.level) {
            updates.level = newLevel;
            const reward = LEVEL_CONFIGS.find(l => l.level === newLevel)?.rewards?.[0];
            if (reward?.type === 'coins') {
                const { data: currentUser } = await database_1.supabase
                    .from('users')
                    .select('coins')
                    .eq('uid', uid)
                    .single();
                if (currentUser) {
                    updates.coins = (currentUser.coins || 0) + reward.value;
                }
            }
        }
    }
    const { error: updateError } = await database_1.supabase
        .from('users')
        .update(updates)
        .eq('uid', uid);
    if (updateError)
        throw updateError;
}
//# sourceMappingURL=levelService.js.map