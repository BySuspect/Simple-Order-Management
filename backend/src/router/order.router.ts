import { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_OK,
} from "../constants/http_status";
import { OrderStatus } from "../constants/order_status";
import { OrderModel } from "../models/order.model";
import auth from "../middlewares/auth.mid";
import mongoose from "mongoose";
import { ProductModel } from "../models/product.model";

const router = Router();
router.use(auth);

router.get(
  "/",
  asyncHandler(async (req: any, res) => {
    const order: any[] = await OrderModel.find({
      user: req.user.id,
    });
    if (order) res.status(HTTP_OK).send(order);
    else res.status(HTTP_BAD_REQUEST).send();
  }),
);

router.post(
  "/create",
  asyncHandler(async (req: any, res: any) => {
    const requestOrder = req.body;

    if (requestOrder.items.length <= 0) {
      res.status(HTTP_BAD_REQUEST).send("Cart Is Empty!");
      return;
    }

    const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
    await newOrder.save();
    res.status(HTTP_OK).send(newOrder);
  }),
);

router.post(
  "/cancel",
  asyncHandler(async (req: any, res: any) => {
    const requestOrder = req.body;

    if (requestOrder.items.length <= 0) {
      res.status(HTTP_BAD_REQUEST).send();
      return;
    }

    const order = await OrderModel.findOne({ _id: requestOrder.id });
    if (!order) {
      res.status(HTTP_BAD_REQUEST).send("Order Not Found!");
      return;
    }
    order.status = OrderStatus.CANCELED;
    await order.save();

    // updating product stock
    order.items.forEach(async (item) => {
      const product = await ProductModel.findOne({ _id: item.product.id });
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    });

    res.send(order);
  }),
);

router.get(
  "/newOrderForCurrentUser",
  asyncHandler(async (req: any, res) => {
    const order = await OrderModel.findOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });
    if (order) res.status(HTTP_OK).send(order);
    else res.status(HTTP_BAD_REQUEST).send();
  }),
);

router.post(
  "/pay",
  asyncHandler(async (req: any, res) => {
    const { paymentId } = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
      res.status(HTTP_BAD_REQUEST).send("Order Not Found!");
      return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.status(HTTP_OK).send(order._id);
  }),
);

async function getNewOrderForCurrentUser(req: any) {
  return await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });
}

router.get(
  "/track/:id",
  asyncHandler(async (req, res) => {
    const orderId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(HTTP_BAD_REQUEST).send("Invalid Order ID");
      return;
    }

    const order = await OrderModel.findById(orderId);
    if (order) res.status(HTTP_OK).send(order);
    else res.status(HTTP_NOT_FOUND);
  }),
);

export default router;
