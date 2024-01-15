import { Router } from "express";
import { sample_product } from "../data";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../models/product.model";

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
    const product = await ProductModel.findById(req.params.id);
    res.send(product);
  })
);

export default router;
