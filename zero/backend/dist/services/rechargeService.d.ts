export interface RechargePlan {
    id: number;
    name: string;
    price: number;
    diamonds: number;
    bonus_diamonds: number;
    popular: boolean;
}
export declare function getRechargePlans(): RechargePlan[];
export declare function createOrder(userId: string, planId: number): Promise<{
    order: any;
    plan: RechargePlan;
} | {
    error: string;
}>;
export declare function completeOrder(orderId: string, adminUid: string): Promise<{
    success: boolean;
    error?: string;
}>;
export declare function getUserOrders(userId: string): Promise<any[]>;
//# sourceMappingURL=rechargeService.d.ts.map