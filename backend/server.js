// IMPORTS
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDb from "./config/db.js";

// middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// route imports
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// SETUP & MIDDLEWARE
dotenv.config();

connectDb();

const app = express();

app.use(express.json());

// api test
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ROUTES
// product routes
app.use("/api/products", productRoutes);
//user routes
app.use("/api/users", userRoutes);
//order routes
app.use("/api/orders", orderRoutes);

// CUSTOM MIDDLEWARE
// error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
