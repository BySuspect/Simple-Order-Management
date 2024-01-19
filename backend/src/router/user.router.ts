import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User, UserModel } from "../models/user.mode";
import { HTTP_BAD_REQUEST, HTTP_SUCCESS } from "../constants/http_status";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await UserModel.create(sample_users);
    res.status(HTTP_SUCCESS).send("Seed is done!");
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        res.status(HTTP_SUCCESS).send(generateTokenReponse(user));
      } else {
        res.status(HTTP_BAD_REQUEST).send("Email or password is invalid!");
      }
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password, address } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(HTTP_BAD_REQUEST).send("User is already exist, please login!");
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: "",
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: false,
    };

    const dbUser = await UserModel.create(newUser);
    res.status(HTTP_SUCCESS).send(generateTokenReponse(dbUser));
  })
);

const generateTokenReponse = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token,
  };
};

export default router;
