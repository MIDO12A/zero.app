import { Request, Response, NextFunction } from 'express';
import { AuthPayload } from '../types';
declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}
export declare function authenticate(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function optionalAuth(req: Request, _res: Response, next: NextFunction): Promise<void>;
export declare function requireRole(...roles: string[]): (req: Request, res: Response, next: NextFunction) => void;
export declare function generateToken(payload: AuthPayload): string;
//# sourceMappingURL=auth.d.ts.map