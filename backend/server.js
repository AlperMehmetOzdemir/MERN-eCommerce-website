import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDb from "./config/db.js";

// middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// routes
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDb();

const app = express();

// api test
app.get("/", (req, res) => {
  res.send("API is running...");
});

// product routes
app.use("/api/products", productRoutes);

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
