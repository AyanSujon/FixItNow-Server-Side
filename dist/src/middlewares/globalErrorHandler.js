import HttpStatus from "http-status";
import { Prisma } from "../../generated/prisma/client";
export const globalErrorHandler = (err, req, res, next) => {
    console.log("Error : ", err);
    let statusCode;
    let errorMessage = err.message || "Internal Server Error.";
    let errorName = err.name || "Internal Server Error.";
    let errorDetalis = err.stack;
    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = HttpStatus.BAD_REQUEST;
        errorMessage = "You have provided incorrect field type of missing fields.";
    }
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            statusCode = HttpStatus.BAD_REQUEST,
                errorMessage = "Buplicate Key Error";
        }
        else if (err.code === "P2003") {
            statusCode = HttpStatus.BAD_REQUEST,
                errorMessage = "Foreign key constraint failed.";
        }
        else if (err.code === "P2025") {
            statusCode = HttpStatus.BAD_REQUEST,
                errorMessage = "An operation failed because it depends on one or more records that were required but not found.";
        }
    }
    else if (err instanceof Prisma.PrismaClientInitializationError) {
        if (err.errorCode === "P1000") {
            statusCode = HttpStatus.UNAUTHORIZED,
                errorMessage = "Authentication faild against database server. Please Check Your Credentials.";
        }
        else if (err.errorCode === "P1001") {
            statusCode = HttpStatus.BAD_REQUEST,
                errorMessage = "Can't reach database server";
        }
        // statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
        // errorMessage = "Authentication  Failed."
    }
    else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
            errorMessage = "Error Occured during query execution.";
    }
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        name: errorName,
        message: errorMessage,
        error: errorDetalis,
    });
};
//# sourceMappingURL=globalErrorHandler.js.map