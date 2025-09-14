import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongo.config.js";
import urlSchema from "./models/shortUrl.model.js"; 
import shortUrlRoutes from "./routes/shortUrl.route.js";
import { redirectFromShortUrl } from "./controllers/shortUrl.controller.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/create", shortUrlRoutes);
app.use("/:id", redirectFromShortUrl);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
