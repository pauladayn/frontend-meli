import express from "express";
import { searchItems, getItem, getItemDescription } from "../services/Item.js";
import { sanitizeItemDetails, sanitizeItemsList } from "../utils/items.js";
import { log } from "console";

export const searchItemsController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { q } = req.query;
        // if (!q) {
        //     const error = new Error('Query parameter "q" is required');
        //     error.statusCode = 400;
        //     throw error;
        // }
        log('q-----', q);
        const { results, filters } = await searchItems(q as string);
        const items = sanitizeItemsList(results, filters);
        console.log('items---------', items);

        res.json(items);
    } catch (error) {
        next(error);
    }
};

export const getItemController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const data = await getItem(id);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getItemDescriptionController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const data = await getItemDescription(id);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

