// IMPORTS
import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan"
import connectDb from "./config/db.js";

// middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// route imports
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// SETUP & MIDDLEWARE
dotenv.config();

connectDb();

const app = express();

// if(process.env.NODE_ENV === "development"){
//   app.use(morgan("dev"))
// }

app.use(express.json());

// api test
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ROUTES
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
// stripe
// app.get("/api/config/stripe", (req,res) => res.send(process.env.STRIPE_TEST_KEY))

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

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
