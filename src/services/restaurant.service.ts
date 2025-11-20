import {
  RestaurantJSONCommandInterface,
  RestaurantDetailsInterface,
  FoursquarePlaceSchemaInterface,
} from "../interfaces/restaurant.interface.js";
// import fsqDevelopersPlaces from "@api/fsq-developers-places";
import {
  // filterByPrice,
  // filterByRating,
  mapPlaceToRestaurant,
} from "../utils/filterRestaurant.js";
import { ValidationError } from "../utils/customErrors.js";
import axios from "axios";

interface FoursquareError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const findRestaurants = async (
  restaurantCommand: RestaurantJSONCommandInterface
): Promise<RestaurantDetailsInterface[]> => {
  if (restaurantCommand.status === "fail") {
    throw new ValidationError(
      "Invalid or unrelated request. Please provide a valid restaurant search."
    );
  }

  const key = process.env.FOURSQUARE_API_KEY;
  if (!key) {
    console.error(
      "[ERROR] FOURSQUARE_API_KEY is not set in environment variables."
    );
    throw new Error("FSQ Developers API key is missing");
  }

  // fsqDevelopersPlaces.auth(key);

  const { parameters } = restaurantCommand;

  console.log("Search Parameters: ", parameters);
  

  if (!parameters) {
    throw new ValidationError("Invalid restaurant search parameters");
  }

  console.log(
    "Restaurant Search parameters:",
    JSON.stringify(parameters, null, 2)
  );

  let data;
  try {
    const response = await axios.get(
      "https://places-api.foursquare.com/places/search",
      {
        params: parameters,
        headers: {
          Authorization: "Bearer " + key,
          Accept: "application/json",
          "X-Places-Api-Version": "2025-06-17"
        },
      }
    );
    data = response.data;
  } catch (err) {
    const errMessage = (err as FoursquareError).response?.data?.message;
    console.error("[ERROR] Error fetching place search:", errMessage);
    throw new Error(
      "Failed to fetch places from Foursquare. Please try again later."
    );
  }

  console.log("Foursquare response:", JSON.stringify(data, null, 2));

  if (!data) {
    console.error("[ERROR] Empty response data from Foursquare API");
    throw new Error("Invalid response from Foursquare API");
  }

  const filteredRestaurants: RestaurantDetailsInterface[] =
    (data.results as FoursquarePlaceSchemaInterface[])?.map(
      mapPlaceToRestaurant
    ) ?? [];

  /** COMMENTING THESE BECAUSE PRICE, RATING DATA NOT AVAILABLE WITHOUT PREMIUM SUBSCRIPTION
   * if (parameters.price) {
    const comparison = parameters.price.price_comparison || "equal";
    filteredRestaurants = filterByPrice(
      filteredRestaurants,
      parameters.price.price_value,
      comparison
    );
  }

  if (parameters.rating) {
    const comparison = parameters.rating.rating_comparison || "above";
    filteredRestaurants = filterByRating(
      filteredRestaurants,
      Number(parameters.rating.rating_value),
      comparison
    );
  }
   */

  return filteredRestaurants;
};
