import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  referralCode?: string;
  referredBy?: string | mongoose.Types.ObjectId | null;
  subjects?: mongoose.Types.ObjectId[];
  role: "admin" | "user" | "manager" | "tutor" | "programmer" | "Assistant";
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  profilePic?: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  username: string;
}

// Optional: Response type for login success
export interface LoginResponse {
  msg: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
    phone: string;
    role: "admin" | "user" | "manager" | "tutor" | "programmer" | "Assistant";
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
  };
}
