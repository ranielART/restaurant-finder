import express from "express";
import cors from "cors";
import restaurantRoutes from "./routes/restaurant.route";

const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/execute", restaurantRoutes);

//sample route
app.get("/", (req, res) => {
  res.send("Restaurant Finder API is running");
});

export default app;
