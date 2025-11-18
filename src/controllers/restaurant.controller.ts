import { Request, Response } from "express";
import { llmConversion } from "../services/llmConversion.service";
import { findRestaurants } from "../services/restaurant.service";
import { RestaurantJSONCommandInterface } from "../interfaces/restaurant.interface";
const getRestaurants = async (req: Request, res: Response) => {
  try {
    const { message } = req.query;

    if (!message || typeof message !== "string") {
      return res
        .status(400)
        .json({ error: "A restaurant search query is required." });
    }

    // const convertedMessage = await llmConversion(message);

    const resJson: RestaurantJSONCommandInterface = {
      action: "restaurant_search",
      parameters: {
        query: "sushi",
        near: "downtown Los Angeles",
        price: 1,
        open_now: true,
      },
    };

    const restaurants = await findRestaurants(resJson);

    return res.status(200).json({ restaurants });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error });
  }
};

const restaurantController = {
  getRestaurants,
};

export default restaurantController;
