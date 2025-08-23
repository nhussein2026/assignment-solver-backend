import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  referralCode?: string;
  referredBy?: string | mongoose.Types.ObjectId | null;
  subjects: mongoose.Types.ObjectId[];
  role: "student" | "admin";
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RegisterDTO {
  name: string;
  email: string;
  phone: string;
  password: string;
}