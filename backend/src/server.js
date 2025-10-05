import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongo.config.js";
import authRoutes from "./routes/auth.route.js";
import shortUrlRoutes from "./routes/shortUrl.route.js";
import userRoutes from "./routes/user.routes.js"
import { redirectFromShortUrl } from "./controllers/shortUrl.controller.js";
import cookieParser from "cookie-parser";
import { attachUser } from "./utils/attachUser.js";
import { errorHandler } from "./utils/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'], // Vite dev server URLs and backend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);

app.use("/api/auth", authRoutes);
app.use("/api/create", shortUrlRoutes);
app.use("/api/user", userRoutes)
app.use("/:id", redirectFromShortUrl);

// Error handler
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
