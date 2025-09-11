import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "./../types/User.types";

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^(\+974\s?)?[3-7]\d{3}\s?\d{4}$/, "Invalid Qatari phone number"],

    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    referralCode: {
      type: String,
      unique: true,
      sparse: true, // allows multiple null values
    },
    referredBy: {
      type: Schema.Types.Mixed,
      default: null,
      
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    role: {
      type: String,
      enum: ["student", "admin", "user"],
      default: "student",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
