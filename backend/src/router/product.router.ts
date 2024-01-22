import { Router } from "express";
import { sample_product } from "../data";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../models/product.model";
import mongoose, { ObjectId } from "mongoose";
import {
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_OK,
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
    res.status(HTTP_OK).send("Seed is done!");
  }),
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.status(HTTP_OK).send(products);
  }),
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const produts = await ProductModel.find({ name: { $regex: searchRegex } });
    res.status(HTTP_OK).send(produts);
  }),
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
    res.status(HTTP_OK).send(product);
  }),
);

router.post(
  "/dropstock",
  asyncHandler(async (req: any, res) => {
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
  }),
);
router.post(
  "/update",
  asyncHandler(async (req: any, res) => {
    const newProduct = req.body;
    const product = await ProductModel.findOne({ _id: newProduct.id });
    if (!product) {
      res.status(HTTP_BAD_REQUEST).send("Product Not Found!");
      return;
    }

    product.name = newProduct.name;
    product.description = newProduct.description;
    product.price = newProduct.price;
    product.stock = newProduct.stock;
    product.image = newProduct.image;
    product.size = newProduct.size;
    product.color = newProduct.color;

    if (product) {
      await product.save();
      res.send(product._id);
    } else res.status(HTTP_INTERNAL_SERVER_ERROR).send("Product not updated");
  }),
);

export default router;
