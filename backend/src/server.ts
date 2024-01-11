import express from "express";
import cors from "cors";
import { sample_product, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

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

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;
  const user = sample_users.find(
    (user) => user.email == email && user.password == password
  );

  if (user) {
    res.send(generateTokenReponse(user));
  } else {
    const BAD_REQUEST = 400;
    res.status(BAD_REQUEST).send("Username or password is invalid!");
  }
});

const generateTokenReponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "shirokosalty",
    {
      expiresIn: "30d",
    }
  );

  user.token = token;
  return user;
};
const port = 5050;

app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
