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


export interface FoursquarePlaceSchemaInterface {
  fsq_place_id?: string;
  latitude?: number | { [x: string]: unknown };  
  longitude?: number | { [x: string]: unknown }; 
  categories?: Array<{
    fsq_category_id: string;
    name: string;
    short_name: string;
    plural_name: string;
    icon?: {
      prefix: string;
      suffix: string;
    };
  }>;
  chains?: Array<{
    fsq_chain_id: string;
  }>;
  date_created?: string;
  date_refreshed?: string;
  distance?: number;
  extended_location?: {
    dma?: string;
    census_block_id?: string;
  };
  link?: string;
  location?: {
    address?: string;
    locality?: string;
    region?: string;
    postcode?: string;
    country?: string;
    formatted_address?: string;
  };
  name?: string;
  placemaker_url?: string;
  related_places?: Record<string, unknown>;
  social_media?: {
    twitter?: string;
  };
  store_id?: string;
  tel?: string;
  website?: string;
}