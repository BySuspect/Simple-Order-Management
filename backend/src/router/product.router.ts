import { Router } from "express";
import { sample_product } from "../data";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../models/product.model";
import mongoose from "mongoose";
import { HTTP_BAD_REQUEST } from "../constants/http_status";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const productCount = await ProductModel.countDocuments();
    if (productCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await ProductModel.create(sample_product);
    res.send("Seed is done!");
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.send(products);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const produts = await ProductModel.find({ name: { $regex: searchRegex } });
    res.send(produts);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(HTTP_BAD_REQUEST).send("Invalid Product ID");
      return;
    }

    const product = await ProductModel.findById(req.params.id);
    res.send(product);
  })
);

export default router;
