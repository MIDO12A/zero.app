"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.optionalAuth = optionalAuth;
exports.requireRole = requireRole;
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const database_1 = require("../config/database");
async function verifySupabaseToken(token) {
    try {
        const { data, error } = await database_1.supabase.auth.getUser(token);
        if (error || !data.user)
            return null;
        return { uid: data.user.id, role: 'user' };
    }
    catch {
        return null;
    }
}
async function verifyCustomToken(token) {
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
        return payload;
    }
    catch {
        return null;
    }
}
async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized: No token provided' });
        return;
    }
    const token = authHeader.slice(7);
    let payload = await verifyCustomToken(token);
    if (!payload) {
        payload = await verifySupabaseToken(token);
    }
    if (!payload) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
        return;
    }
    req.user = payload;
    next();
}
async function optionalAuth(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.slice(7);
        let payload = await verifyCustomToken(token);
        if (!payload) {
            payload = await verifySupabaseToken(token);
        }
        if (payload) {
            req.user = payload;
        }
    }
    next();
}
function requireRole(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
            return;
        }
        next();
    };
}
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
}
//# sourceMappingURL=auth.js.map