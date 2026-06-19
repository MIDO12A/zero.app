"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const auth_1 = require("../middleware/auth");
const rechargeService_1 = require("../services/rechargeService");
const router = (0, express_1.Router)();
router.get('/plans', (_req, res) => {
    res.json({ plans: (0, rechargeService_1.getRechargePlans)() });
});
router.post('/create-order', auth_1.authenticate, async (req, res) => {
    try {
        const { planId } = req.body;
        const uid = req.user.uid;
        const result = await (0, rechargeService_1.createOrder)(uid, planId);
        if ('error' in result) {
            res.status(400).json({ error: result.error });
            return;
        }
        res.status(201).json({ order: result.order, plan: result.plan });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post('/complete-order', auth_1.authenticate, (0, auth_1.requireRole)('admin'), async (req, res) => {
    try {
        const { orderId } = req.body;
        const adminUid = req.user.uid;
        const result = await (0, rechargeService_1.completeOrder)(orderId, adminUid);
        if (!result.success) {
            res.status(400).json({ error: result.error });
            return;
        }
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/orders', auth_1.authenticate, async (req, res) => {
    try {
        const uid = req.user.uid;
        const orders = await (0, rechargeService_1.getUserOrders)(uid);
        res.json({ orders });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/orders/all', auth_1.authenticate, (0, auth_1.requireRole)('admin'), async (_req, res) => {
    try {
        const { data, error } = await database_1.supabase
            .from('recharge_orders')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100);
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ orders: data });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
//# sourceMappingURL=recharge.js.map