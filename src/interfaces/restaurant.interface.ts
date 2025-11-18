export interface RestaurantJSONCommandInterface {
  action: "restaurant_search";
  parameters: {
    query: string;
    near: string;
    price: number;
    open_now: boolean;
  };
}




export interface RestaurantDetailsInterface {
    name: string;
    address: string;
    cuisine: string;
    rating: number;
    price_level: string;
    operating_hours: string;
}


export interface RestaurantDetailsListInterface {
    restaurants: RestaurantDetailsInterface[];
}