import express from 'express';
interface CustomError extends Error {
    statusCode?: number;
    message: string;
    stack?: string;
}
declare const errorHandler: (error: CustomError, _: express.Request, res: express.Response) => void;
export default errorHandler;
