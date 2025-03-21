import express from 'express';

interface CustomError extends Error {
    statusCode?: number;
    message: string;
    stack?: string;
}
const errorHandler = (error: CustomError, _: express.Request, res: express.Response) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && error.stack ? { stack: error.stack } : {}),
    });
};

export default errorHandler;