import { searchItems, getItem, getItemDescription } from "../services/Item.js";
import getCategory from "../services/Category.js";


export const searchItemsController = async (req, res, next) => {
    try {
        const { q } = req.query;
        // if (!q) {
        //     const error = new Error('Query parameter "q" is required');
        //     error.statusCode = 400;
        //     throw error;
        // }
        const data = await searchItems(q);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getItemController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await getItem(id);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getItemDescriptionController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await getItemDescription(id);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getCategoryController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await getCategory(id);
        res.json(data);
    } catch (error) {
        next(error);
    }
};
