import { Request, Response, NextFunction } from "express";
import { getItemDescription } from "../services/Item";
import { itemDetailResponseHandler, searchResponseHandler } from "../handlers/responseHandlers";

export const searchItemsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchQuery = req.query.q;
        if (!searchQuery) {
           res.status(400).json({ error: 'Query parameter "search" is required' });
        }

        const items = await searchResponseHandler(searchQuery as string)
        res.json(items)
    } catch (error) {
        next(error);
    }
};

export const getItemController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const data = await itemDetailResponseHandler(id)
        res.json(data)
    } catch (error) {
        next(error);
    }
};

export const getItemDescriptionController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const data = await getItemDescription(id);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

