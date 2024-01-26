import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User, UserModel } from "../models/user.mode";
import { HTTP_BAD_REQUEST, HTTP_OK } from "../constants/http_status";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const allUsers = await UserModel.find();
    let users: {}[] = [];

    allUsers.forEach((user) => {
      users.push({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phone: user.phone,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLogin: user.lastLogin,
        token: null,
      });
    });

    res.send(users);
  }),
);

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await UserModel.create(sample_users);
    res.status(HTTP_OK).send("Seed is done!");
  }),
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      if (user.isActive) {
        if (await bcrypt.compare(password, user.password)) {
          user.lastLogin = new Date();
          await user.save();
          res.status(HTTP_OK).send(generateTokenReponse(user));
        } else {
          res.status(HTTP_BAD_REQUEST).send("Email or password is invalid!");
        }
      } else
        res
          .status(HTTP_BAD_REQUEST)
          .send(
            "This account is deactivated!\nPlease contact support for help.",
          );
    }
  }),
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, phone, address } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(HTTP_BAD_REQUEST).send("User is already exist, please login!");
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: "",
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      phone,
      isAdmin: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: new Date(),
    };

    const dbUser = await UserModel.create(newUser);
    res.status(HTTP_OK).send(generateTokenReponse(dbUser));
  }),
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
    },
  );

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    phone: user.phone,
    isAdmin: user.isAdmin,
    isActive: user.isActive,
    token: token,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastLogin: user.lastLogin,
  };
};

export default router;
