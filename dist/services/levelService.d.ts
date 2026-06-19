interface LevelConfig {
    level: number;
    xp_required: number;
    title: string;
    rewards: {
        type: string;
        value: number;
    }[];
}
export declare function getLevelConfig(): LevelConfig[];
export declare function getLevelByXp(xp: number): {
    level: number;
    xp: number;
    nextLevelXp: number;
    progress: number;
};
export declare function addXp(uid: string, amount: number, field: 'experience' | 'wealth_exp' | 'recharge_exp' | 'gems_exp'): Promise<void>;
export {};
//# sourceMappingURL=levelService.d.ts.map