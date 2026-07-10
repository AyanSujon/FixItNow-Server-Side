import { NextFunction, Request, Response } from "express";
export declare const adminController: {
    getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    UpdateUserStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createServiceCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllCategories: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllBookings: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=admin.controller.d.ts.map