import express from "express";
import getCategory from "../services/Category.js";

export const getCategoryController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const data = await getCategory(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
