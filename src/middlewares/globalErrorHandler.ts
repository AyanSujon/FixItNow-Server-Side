import { NextFunction, Request, Response } from "express"
import  HttpStatus from "http-status"

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
        error: err.stack,
    })
}