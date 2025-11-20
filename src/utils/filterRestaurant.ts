import {
  RestaurantDetailsInterface,
  FoursquarePlaceSchemaInterface,
} from "../interfaces/restaurant.interface.js";

type ComparisonType = "equal" | "above" | "below";

// export const filterByPrice = (
//   restaurants: RestaurantDetailsInterface[],
//   price: number,
//   comparison: ComparisonType = "equal"
// ): RestaurantDetailsInterface[] => {
//   return restaurants.filter((restaurant) => {
//     const priceLevel = restaurant.price_level.length;

//     switch (comparison) {
//       case "equal":
//         return priceLevel === price;
//       case "above":
//         return priceLevel > price;
//       case "below":
//         return priceLevel < price;
//     }
//   });
// };

export const filterByRating = (
  restaurants: RestaurantDetailsInterface[],
  rating: number,
  comparison: ComparisonType = "equal"
): RestaurantDetailsInterface[] => {
  return restaurants.filter((restaurant) => {
    switch (comparison) {
      case "equal":
        return Number(restaurant.rating) === rating;
      case "above":
        return Number(restaurant.rating) > rating;
      case "below":
        return Number(restaurant.rating) < rating;
    }
  });
};

export const mapPlaceToRestaurant = (
  place: FoursquarePlaceSchemaInterface
): RestaurantDetailsInterface => ({
  name: place.name || "N/A",
  address: place.location?.formatted_address || "N/A",
  cuisine: place.categories?.map(cat => cat.short_name) || [],
  rating: "N/A",
  price_level: "N/A",
  operating_hours: "N/A",
});