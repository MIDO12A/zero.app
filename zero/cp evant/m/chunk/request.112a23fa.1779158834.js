import {a as h} from "./axios.6ebef0fc.js";
import {s as r, __tla as m} from "../assets/index.99b34229.1779158834.js";

// Offline Mock Response Handler
const mockResponse = (url, method, data) => {
    console.log(`🔄 Mock API Call: ${method} ${url}`, data);
    
    const mockData = window.__MOCK_DATA__ || {};
    
    // Return mock data based on URL
    if (url.includes('/cp') || url.includes('cp')) {
        return { code: 200, msg: "success", data: mockData.cpData || {} };
    }
    if (url.includes('/rank') || url.includes('ranking')) {
        return { code: 200, msg: "success", data: mockData.rankings || {} };
    }
    if (url.includes('/user')) {
        return { code: 200, msg: "success", data: mockData.user || {} };
    }
    if (url.includes('/gift')) {
        return { code: 200, msg: "success", data: { gifts: mockData.gifts || [] } };
    }
    
    // Default response
    return { code: 200, msg: "success", data: {} };
};

let s, p = Promise.all([( () => {
    try {
        return m
    } catch (t) {}
}
)()]).then(async () => {
    const {loadingData: t} = r();
    
    // Mock request function for offline mode
    s = (e, a, n, i, d) => {
        console.log(`📡 Offline Mode: ${e.toUpperCase()} ${a}`);
        t.showLoading && t.showLoading();
        
        return new Promise((resolve) => {
            setTimeout(() => {
                t.hideLoading && t.hideLoading();
                const mockData = mockResponse(a, e, n);
                resolve({ data: mockData, status: 200, statusText: 'OK' });
            }, 300); // Simulate network delay
        });
    };
    
    console.log('✅ Offline Mode Activated - All API calls will use mock data');
}
);
export {p as __tla, s as h};
