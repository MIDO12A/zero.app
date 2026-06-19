"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const index_1 = require("./index");
if (!index_1.config.supabase.url || !index_1.config.supabase.serviceKey) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY must be set');
}
exports.supabase = (0, supabase_js_1.createClient)(index_1.config.supabase.url, index_1.config.supabase.serviceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});
//# sourceMappingURL=database.js.map