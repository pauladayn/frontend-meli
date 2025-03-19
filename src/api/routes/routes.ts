import express from "express";

import {
    searchItemsController,
    getItemController,
    getItemDescriptionController,
} from "../controllers/itemControllers";
import { getCategoryController } from "../controllers/categoryControllers";
import ssrMiddleware from "../middleware/ssrMiddleware";

const router: express.Router = express.Router();
const BASE_API_PATH = '/api';

router.get(`${BASE_API_PATH}/items`, searchItemsController);
router.get(`${BASE_API_PATH}/items/:id`, getItemController);
router.get(`${BASE_API_PATH}/items/:id/description`, getItemDescriptionController);
router.get(`${BASE_API_PATH}/categories/:id`, getCategoryController);

router.use(ssrMiddleware)

export default router;
