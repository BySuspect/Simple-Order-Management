import { Schema, model } from "mongoose";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
  size: string;
  stock: number;
  favorite: boolean;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    stock: { type: Number, required: true },
    favorite: { type: Boolean, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  },
);

export const ProductModel = model<Product>("product", ProductSchema);
