import { Router } from "express";
import { sample_product } from "../data";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../models/product.model";
import mongoose, { ObjectId } from "mongoose";
import {
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_SUCCESS,
} from "../constants/http_status";

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
    res.status(HTTP_SUCCESS).send("Seed is done!");
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.status(HTTP_SUCCESS).send(products);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const produts = await ProductModel.find({ name: { $regex: searchRegex } });
    res.status(HTTP_SUCCESS).send(produts);
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
    res.status(HTTP_SUCCESS).send(product);
  })
);

router.post(
  "/dropstock",
  asyncHandler(async (req: any, res) => {
    console.log("Drop stock" + req.body);
    const { productId, quantity } = req.body;
    const product = await ProductModel.findOne({ _id: productId });
    if (!product) {
      res.status(HTTP_BAD_REQUEST).send("Product Not Found!");
      return;
    }

    if (product.stock > 0) product.stock -= quantity;
    else
      res.status(HTTP_INTERNAL_SERVER_ERROR).send("Product stock is already 0");
    await product.save();

    res.send(product._id);
  })
);

export default router;
