import { Request, Response } from "express";
import { RestaurantJSONCommandInterface } from "../interfaces/restaurant.interface";
import fsqDevelopersPlaces from "@api/fsq-developers-places";

export const findRestaurants = async (
  restaurantCommand: RestaurantJSONCommandInterface
) => {
  const key = process.env.FOURSQUARE_API_KEY;
  if (!key) {
    throw new Error("FSQ Developers API key is missing");
  }
  
  fsqDevelopersPlaces.auth(key);
  
  try {
    const { parameters } = restaurantCommand;

    const { data } = await fsqDevelopersPlaces.placeSearch({
      ...parameters,
      "X-Places-Api-Version": "2025-06-17",
    });

    console.log("Foursquare response:", data);

    return data; 
  } catch (err) {
    console.error("Foursquare error:", err);
    throw err;
  }
};
