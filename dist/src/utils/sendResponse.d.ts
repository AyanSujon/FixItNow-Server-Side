import { Response } from "express";
type Tmeta = {
    page: number;
    limit: number;
    total: number;
};
type TResponseData<T> = {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    meta?: Tmeta;
};
export declare const sendResponse: <T>(res: Response, data: TResponseData<T>) => void;
export {};
//# sourceMappingURL=sendResponse.d.ts.map