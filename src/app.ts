import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

//sample route
app.get("/", (req, res) => {
  res.send("Restaurant Finder API is running");
});

export default app;
