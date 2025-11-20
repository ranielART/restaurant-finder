import { Request, Response } from "express";
// import { llmConversion } from "../services/llmConversion.service.js";
import { llmConversion } from "../services/llmConversion.service.js";
import { findRestaurants } from "../services/restaurant.service.js";
// import { RestaurantJSONCommandInterface } from "../interfaces/restaurant.interface";
import {
  HTTPSuccessResponse,
  HTTPErrorResponse,
} from "../utils/responseHandler.js";
import { InternalServerError, ValidationError } from "../utils/customErrors.js";

const getRestaurants = async (req: Request, res: Response) => {
  try {
    const { message } = req.query;

    if (!message || typeof message !== "string") {
      throw new ValidationError(
        "A restaurant search query is required and must be a non-empty string."
      );
    }

    const convertedMessage = await llmConversion(message);

    const restaurants = await findRestaurants(convertedMessage);

    if (restaurants.length === 0) {
      return HTTPSuccessResponse(
        res,
        200,
        "No restaurants match your search. Try changing your criteria.",
      );
    }

    return HTTPSuccessResponse(res, 200, "Restaurants found successfully", {
      restaurants,
    });
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      return HTTPErrorResponse(res, 422, error.message);
    }
    if (error instanceof InternalServerError) {
      return HTTPErrorResponse(res, 500, error.message);
    }

    if (error instanceof Error) {
      return HTTPErrorResponse(res, 500, error.message);
    }

    return HTTPErrorResponse(res, 500, "Internal server error") as Response;
  }
};

const restaurantController = {
  getRestaurants,
};

export default restaurantController;
