import { Request, Response } from "express";
import mongoose from 'mongoose';
import User from "../models/User";
import { RegisterDTO, LoginDTO, JWTPayload, IUser  } from "../types/User.types";
import { comparePassword, hashPassword } from "../utils/password";
import jwt from 'jsonwebtoken';
import crypto from "crypto"; 

// simple slugify for username
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .replace(/(^\d+)|(^\s+)|(\s+$)/g, "")
    .slice(0, 20);

// ensure username is unique; derive from name or email local-part
const generateUniqueUsername = async (name: string, email: string): Promise<string> => {
  const base = slugify(name) || slugify(email.split("@")[0]) || "Qatar";
  let candidate = base.length >= 3 ? base : `${base}user`;
  let suffix = 0;

  // loop until a free username is found
  // try base, then base123, base456, etc.
  while (await User.exists({ username: candidate })) {
    suffix = suffix ? suffix + Math.floor(Math.random() * 9 + 1) : Math.floor(Math.random() * 900 + 100);
    candidate = `${base}${suffix}`;
    if (candidate.length < 3) candidate = `${candidate}user`;
    candidate = candidate.slice(0, 24);
  }
  return candidate;
};

export const register = async (req: Request, res: Response): Promise<void> => {
  console.log("Register endpoint hit")
  console.log("Request body:", req.body)
  try {
    const { name, email, phone, password } = req.body as RegisterDTO;

    // basic presence checks (quick feedback before hitting Mongoose)
    if (!name || !email || !phone || !password) {
      res.status(400).json({ msg: "name, email, phone, and password are required" });
      return;
    }
      // quick server-side validation (same rule as your schema)
    const qatRegex = /^(\+974\s?)?[3-7]\d{3}\s?\d{4}$/;
    if (!qatRegex.test(phone)) {
      res.status(400).json({ msg: "Invalid phone format. Expected Qatari number like +974 6000 1234 or 6000 1234" });
      return;
    }

    // enforce uniqueness on email; optional: also check phone
    const existingByEmail = await User.findOne({ email });
    if (existingByEmail) {
      res.status(409).json({ msg: "Email already in use" });
      return;
    }

    // optional: prevent duplicate phone numbers
    const existingByPhone = await User.findOne({ phone });
    if (existingByPhone) {
      res.status(409).json({ msg: "Phone number already in use" });
      return;
    }

    // auto-generate a unique username to satisfy schema requirement
    const username = await generateUniqueUsername(name, email);
console.log("Generated username:", username)

    // hash password
        const hashedPassword = await hashPassword(password);
        console.log("Hashed password:", hashedPassword)
    // create user (other fields use schema defaults)
    const user = await User.create({
      name,
      email,
      phone,
      username,
      password: hashedPassword,
    });
console.log("User created:", user)
    // thanks to toJSON transform, password is not included
    res.status(201).json({
      msg: "User registered successfully",
      user,
    });
  } catch (err: any) {
    console.error("Error in register controller:", err);
    // handle Mongoose validation/unique errors cleanly
    
    if (err?.code === 11000) {
      const key = Object.keys(err.keyValue ?? {})[0] ?? "field";
      res.status(409).json({ msg: `${key} must be unique`, key, value: err.keyValue?.[key] });
      return;
    }
    res.status(500).json({ msg: "Server error" });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  console.log("Login endpoint hit");
  console.log("Request body:", req.body);
  
  try {
    const { email, password } = req.body as LoginDTO;

    // Basic presence checks
    if (!email || !password) {
      res.status(400).json({ msg: "Email and password are required" });
      return;
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ msg: "Invalid credentials" });
      return;
    }

    console.log("User found:", user.email);

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      console.log("Password validation failed");
      res.status(401).json({ msg: "Invalid credentials" });
      return;
    }

    console.log("Password validated successfully");

     // Optional: Check if user is verified (based on your IUser interface)
    // Uncomment if you want to require email verification before login
    // if (!user.isEmailVerified) {
    //   res.status(403).json({ msg: "Please verify your email before logging in" });
    //   return;
    // }



    // Create JWT token
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      res.status(500).json({ msg: "Server configuration error" });
      return;
    }

      const payload: JWTPayload = {
      userId: (user._id as mongoose.Types.ObjectId).toString(),
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d', // default 7 days
    } as jwt.SignOptions);
    console.log("JWT token generated for user:", user.email);

    // Update last login timestamp (optional)
    await User.findByIdAndUpdate(user._id, {
      lastLogin: new Date(),
    });

    // Return success response (password excluded thanks to toJSON transform)
    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        phone: user.phone,
         role: user.role,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        // include other safe fields as needed
      },
    });

  } catch (err: any) {
    console.error("Error in login controller:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Optional: Logout function (for token blacklisting if needed)
export const logout = async (req: Request, res: Response): Promise<void> => {
  console.log("Logout endpoint hit");
  
  try {
    // If you implement token blacklisting, add logic here
    // For now, just return success (client should remove token)
    
    res.status(200).json({
      msg: "Logout successful",
    });
  } catch (err: any) {
    console.error("Error in logout controller:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


// 1️⃣ Forgot password — request reset
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) {
      // Don’t leak info; respond same message
      return res.status(200).json({ msg: "If that email exists, a reset link was sent" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    // Hash token before storing (so DB doesn’t store plain token)
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Set on user with expiry (15 min)
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save({ validateBeforeSave: false });

    // Send link to email (pseudo code — use nodemailer or similar)
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(
      email
    )}`;

    // TODO: implement actual email sending
    console.log("Password reset link:", resetLink);

    res.status(200).json({ msg: "Password reset link sent if email exists" });
  } catch (err: any) {
    console.error("Forgot password error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// 2️⃣ Reset password — user submits new password + token
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, email, newPassword } = req.body;
    if (!token || !email || !newPassword) {
      return res.status(400).json({ msg: "Token, email, and new password are required" });
    }

    // Hash token to compare with DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      email,
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() }, // not expired
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ msg: "Password reset successful" });
  } catch (err: any) {
    console.error("Reset password error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};