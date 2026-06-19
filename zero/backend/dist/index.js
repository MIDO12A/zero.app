"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const levels_1 = __importDefault(require("./routes/levels"));
const vip_1 = __importDefault(require("./routes/vip"));
const recharge_1 = __importDefault(require("./routes/recharge"));
const agencies_1 = __importDefault(require("./routes/agencies"));
const rankings_1 = __importDefault(require("./routes/rankings"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/users', users_1.default);
app.use('/api/v1/levels', levels_1.default);
app.use('/api/v1/vip', vip_1.default);
app.use('/api/v1/recharge', recharge_1.default);
app.use('/api/v1/agencies', agencies_1.default);
app.use('/api/v1/rankings', rankings_1.default);
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
app.listen(config_1.config.port, () => {
    console.log(`🚀 Zero Backend API running on port ${config_1.config.port}`);
    console.log(`📦 Environment: ${config_1.config.nodeEnv}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map