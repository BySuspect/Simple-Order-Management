import { Schema, model } from "mongoose";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  isAdmin: boolean;
}

export const UserSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

export const UserModel = model<User>("user", UserSchema);
