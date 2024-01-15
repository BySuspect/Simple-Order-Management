import dotenv from "dotenv";
dotenv.config();

import { dbConnect } from "./configs/database.config";
dbConnect();

import express from "express";
import cors from "cors";
import productRouter from "./router/product.router";
import userRouter from "./router/user.router";
const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

const port = 5050;

app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
