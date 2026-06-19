export interface VipTier {
    tier: number;
    name: string;
    name_ar: string;
    monthly_price: number;
    benefits: string[];
    badge_asset: string;
    card_asset: string;
}
export declare function getVipTiers(): VipTier[];
export declare function getVipTier(tier: number): VipTier | undefined;
export declare function calculateVipLevel(totalRecharge: number): number;
//# sourceMappingURL=vipService.d.ts.map