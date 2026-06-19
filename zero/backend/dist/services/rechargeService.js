"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRechargePlans = getRechargePlans;
exports.createOrder = createOrder;
exports.completeOrder = completeOrder;
exports.getUserOrders = getUserOrders;
const uuid_1 = require("uuid");
const database_1 = require("../config/database");
const vipService_1 = require("./vipService");
const levelService_1 = require("./levelService");
const RECHARGE_PLANS = [
    { id: 1, name: '50 Diamonds', price: 1, diamonds: 50, bonus_diamonds: 0, popular: false },
    { id: 2, name: '200 Diamonds', price: 2, diamonds: 200, bonus_diamonds: 10, popular: false },
    { id: 3, name: '500 Diamonds', price: 5, diamonds: 500, bonus_diamonds: 25, popular: false },
    { id: 4, name: '1,200 Diamonds', price: 10, diamonds: 1200, bonus_diamonds: 50, popular: true },
    { id: 5, name: '2,500 Diamonds', price: 20, diamonds: 2500, bonus_diamonds: 150, popular: false },
    { id: 6, name: '6,000 Diamonds', price: 50, diamonds: 6000, bonus_diamonds: 400, popular: false },
    { id: 7, name: '15,000 Diamonds', price: 100, diamonds: 15000, bonus_diamonds: 1500, popular: true },
    { id: 8, name: '40,000 Diamonds', price: 250, diamonds: 40000, bonus_diamonds: 5000, popular: false },
    { id: 9, name: '100,000 Diamonds', price: 500, diamonds: 100000, bonus_diamonds: 20000, popular: false },
    { id: 10, name: '250,000 Diamonds', price: 1000, diamonds: 250000, bonus_diamonds: 75000, popular: true },
];
function getRechargePlans() {
    return RECHARGE_PLANS;
}
async function createOrder(userId, planId) {
    const plan = RECHARGE_PLANS.find(p => p.id === planId);
    if (!plan)
        return { error: 'Invalid plan' };
    const order = {
        id: (0, uuid_1.v4)(),
        user_id: userId,
        plan_id: planId,
        amount: plan.price,
        diamonds: plan.diamonds + plan.bonus_diamonds,
        status: 'pending',
        payment_method: 'manual',
        created_at: new Date().toISOString(),
        completed_at: null,
    };
    const { error } = await database_1.supabase.from('recharge_orders').insert(order);
    if (error)
        return { error: error.message };
    return { order, plan };
}
async function completeOrder(orderId, adminUid) {
    const { data: order, error: fetchError } = await database_1.supabase
        .from('recharge_orders')
        .select('*')
        .eq('id', orderId)
        .single();
    if (fetchError || !order)
        return { success: false, error: 'Order not found' };
    if (order.status !== 'pending')
        return { success: false, error: 'Order already processed' };
    const userUid = order.user_id;
    const { data: user } = await database_1.supabase
        .from('users')
        .select('diamonds, recharge_level, recharge_exp')
        .eq('uid', userUid)
        .single();
    if (!user)
        return { success: false, error: 'User not found' };
    const totalDiamonds = (user.diamonds || 0) + order.diamonds;
    const rechargeXp = (user.recharge_exp || 0) + order.amount;
    await database_1.supabase
        .from('recharge_orders')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', orderId);
    await database_1.supabase
        .from('users')
        .update({
        diamonds: totalDiamonds,
        recharge_exp: rechargeXp,
        vip_tier: (0, vipService_1.calculateVipLevel)(rechargeXp),
    })
        .eq('uid', userUid);
    try {
        await (0, levelService_1.addXp)(userUid, order.amount * 10, 'recharge_exp');
    }
    catch { }
    return { success: true };
}
async function getUserOrders(userId) {
    const { data } = await database_1.supabase
        .from('recharge_orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);
    return data || [];
}
//# sourceMappingURL=rechargeService.js.map