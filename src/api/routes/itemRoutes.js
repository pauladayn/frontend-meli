import express from "express";

import { searchItemsController, getItemController, getItemDescriptionController, getCategoryController } from "../controllers/itemControllers.js";

const router = express.Router();

router.get("/items", searchItemsController);
router.get("/items/:id", getItemController);
router.get("/items/:id/description", getItemDescriptionController);
router.get("/categories/:id", getCategoryController);

export default router;