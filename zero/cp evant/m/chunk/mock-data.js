// Mock Data for Offline Mode
window.__MOCK_DATA__ = {
    user: {
        userId: "123456",
        username: "Demo User",
        nickname: "Demo User",
        avatar: "",
        level: 25,
        exp: 15000,
        gold: 50000,
        diamonds: 2500,
        token: "mock_token_offline_mode",
        lang: "en_US"
    },
    cpData: {
        cpLevel: 10,
        cpExp: 8500,
        cpName: "Sweet Couple ❤️",
        cpStatus: 1,
        partner: {
            userId: "789012",
            username: "Partner User",
            nickname: "My Partner",
            avatar: "",
            level: 23
        },
        rewards: [
            { id: 1, name: "Exclusive Frame", icon: "", unlocked: true, level: 1 },
            { id: 2, name: "Special Badge", icon: "", unlocked: true, level: 3 },
            { id: 3, name: "Love Effect", icon: "", unlocked: true, level: 5 },
            { id: 4, name: "Couple Theme", icon: "", unlocked: false, level: 15 }
        ],
        ranking: {
            daily: 12,
            weekly: 8,
            monthly: 25,
            overall: 156
        },
        stats: {
            totalGifts: 1250,
            totalDiamonds: 125000,
            daysActive: 45
        }
    },
    rankings: {
        daily: [
            { rank: 1, userId: "111", username: "TopCouple1", avatar: "", score: 99999, level: 50, cpName: "Forever Love" },
            { rank: 2, userId: "222", username: "TopCouple2", avatar: "", score: 88888, level: 48, cpName: "True Love" },
            { rank: 3, userId: "333", username: "TopCouple3", avatar: "", score: 77777, level: 45, cpName: "Sweet Hearts" },
            { rank: 4, userId: "444", username: "TopCouple4", avatar: "", score: 66666, level: 42, cpName: "Soul Mates" },
            { rank: 5, userId: "555", username: "TopCouple5", avatar: "", score: 55555, level: 40, cpName: "Love Birds" },
            { rank: 6, userId: "666", username: "TopCouple6", avatar: "", score: 44444, level: 38, cpName: "Perfect Match" },
            { rank: 7, userId: "777", username: "TopCouple7", avatar: "", score: 33333, level: 35, cpName: "Dream Team" },
            { rank: 8, userId: "888", username: "TopCouple8", avatar: "", score: 22222, level: 32, cpName: "Love Story" },
            { rank: 9, userId: "999", username: "TopCouple9", avatar: "", score: 11111, level: 30, cpName: "Happy Together" },
            { rank: 10, userId: "1010", username: "TopCouple10", avatar: "", score: 10000, level: 28, cpName: "Endless Love" }
        ],
        weekly: [
            { rank: 1, userId: "111", username: "TopCouple1", avatar: "", score: 599999, level: 50, cpName: "Forever Love" },
            { rank: 2, userId: "222", username: "TopCouple2", avatar: "", score: 488888, level: 48, cpName: "True Love" },
            { rank: 3, userId: "333", username: "TopCouple3", avatar: "", score: 377777, level: 45, cpName: "Sweet Hearts" }
        ],
        myRank: {
            daily: 12,
            weekly: 8,
            monthly: 25
        }
    },
    gifts: [
        { id: 1, name: "Rose", icon: "", price: 10, type: "normal", count: 150 },
        { id: 2, name: "Chocolate", icon: "", price: 50, type: "normal", count: 80 },
        { id: 3, name: "Teddy Bear", icon: "", price: 100, type: "special", count: 45 },
        { id: 4, name: "Diamond Ring", icon: "", price: 999, type: "special", count: 12 },
        { id: 5, name: "Love Castle", icon: "", price: 5000, type: "luxury", count: 3 }
    ]
};

// Initialize localStorage with mock data
if (!localStorage.getItem('TOUTIAO_USER')) {
    localStorage.setItem('TOUTIAO_USER', JSON.stringify(window.__MOCK_DATA__.user));
}

console.log('✅ Mock Data Loaded - Offline Mode Active');
