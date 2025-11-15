export interface RestaurantJSONCommandInterface {
  action: "restaurant_search";
  parameters: {
    query: string;
    near: string;
    price: string;
    open_now: boolean;
  };
}
