import dotenv from "dotenv";
dotenv.config();

import { dbConnect } from "./configs/database.config";
dbConnect();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import productRouter from "./router/product.router";
import userRouter from "./router/user.router";
import orderRouter from "./router/order.router";
const app = express();

app.use(express.json());

app.use(
  cors(
    {
      credentials: true,
      origin: ["http://localhost:4200"],
    } /**/,
  ),
);

// Enable request logging in the development environment
app.use(morgan("dev"));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const port = 5050;

app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
