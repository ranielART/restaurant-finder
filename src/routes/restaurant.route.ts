import express from 'express';
import restaurantController from '../controllers/restaurant.controller.js';
import { codeCheck } from '../middlewares/codeCheck.middleware.js';

const router = express.Router();

router.get('/', codeCheck, restaurantController.getRestaurants);

export default router;