import { NextFunction, Request, Response } from "express";
export declare const paymentsController: {
    createPayments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createCheckoutSeassion: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    handleWebhook: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllPaymentHistory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPaymentDetailsById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=payments.controller.d.ts.map