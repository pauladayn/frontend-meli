import express from "express";
export declare const findRouteHandler: (path: string) => ((req: express.Request) => Promise<{
    data: any;
    meta: {
        title: string;
        description: string;
    };
}>) | undefined;
