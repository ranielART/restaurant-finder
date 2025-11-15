import express from 'express';
import restaurantController from '../controllers/restaurant.controller';
import { codeCheck } from '../middlewares/codecheck.middleware';

const router = express.Router();

router.get('/', codeCheck, restaurantController.getRestaurants);

export default router;