import express from "express";

import {
    searchItemsController,
    getItemController,
    getItemDescriptionController,
} from "../controllers/itemControllers";
import { getCategoryController } from "../controllers/categoryControllers";

const router: express.Router = express.Router();

router.get(`/items`, searchItemsController);
router.get(`/items/:id`, getItemController);
router.get(`/items/:id/description`, getItemDescriptionController);
router.get(`/categories/:id`, getCategoryController);



export default router;
