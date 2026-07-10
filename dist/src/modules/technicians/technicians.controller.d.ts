import { NextFunction, Request, Response } from "express";
export declare const techniciansController: {
    getAlltechnicians: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTechnicianById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateAvailabilitySlots: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createAvailabilitySlots: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateTechnicianProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTechnicianOwnBookings: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateBookingStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=technicians.controller.d.ts.map