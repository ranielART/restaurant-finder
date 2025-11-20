export interface RestaurantJSONCommandInterface {
  action: "restaurant_search";
  parameters: {
    query?: string;
    near: string;
    // price?: {
    //   price_value: number;
    //   price_comparison?: "equal" | "above" | "below";
    // };
    min_price?: number;
    max_price?: number;
    open_now?: boolean;
    rating?: {
      rating_value: string;
      rating_comparison?: "equal" | "above" | "below";
    };
  };
  status?: "success" | "fail";
}

export interface RestaurantDetailsInterface {
    name: string;
    address: string;
    cuisine: string[];
    rating: string;
    price_level: string;
    operating_hours: string;
}

// export interface FoursquarePlaceSchemaInterface {
//   fsq_place_id?: string;
//   categories?: Array<{
//     fsq_category_id: string;
//     name: string;
//     short_name: string;
//     plural_name: string;
//     icon?: {
//       prefix: string;
//       suffix: string;
//     };
//   }>;
  
//   location?: {
//     address?: string;
//     locality?: string;
//     region?: string;
//     postcode?: string;
//     country?: string;
//     formatted_address?: string;
//   };
//   name?: string;
  
// }

export interface FoursquarePlaceSchemaInterface {
  name?: string;
  location?: {
    formatted_address?: string;
  };
  categories?: Array<{
    short_name: string;
  }>;
}