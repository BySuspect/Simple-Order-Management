import express from "express";
import cors from "cors";
import { sample_product } from "./data";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/products", (req, res) => {
  res.send(sample_product);
});

app.get("/api/products/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;

  const foods = sample_product.filter((food) =>
    food.name
      .toLowerCase()

      .includes(searchTerm.toLowerCase())
  );

  res.send(foods);
});

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;

  const product = sample_product.find((product) => product.id == productId);

  res.send(product);
});

const port = 5050;

app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
