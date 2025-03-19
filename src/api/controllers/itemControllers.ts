import express from "express";
import { searchItems, getItem, getItemDescription } from "../services/Item";
import { sanitizeItemDetails, sanitizeItemsList } from "../utils/items";
import { log } from "console";

export const searchItemsController = async (searchQuery: string, next: express.NextFunction) => {
    try {
     
        log('llega a ser items controller', searchQuery)
        const { results, filters } = await searchItems(searchQuery);
        const items = sanitizeItemsList(results, filters);
        return items
    } catch (error) {
        next(error);
    }
};

export const getItemController = async (searchQuery:string, next: express.NextFunction) => {
    try {
        //const { id } = req.params;
        const data = await getItem(searchQuery);
        const itemDescription = await getItemDescription(searchQuery)
        const itemDetails = sanitizeItemDetails(data, itemDescription)
       return itemDetails;
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

