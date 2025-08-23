import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { RegisterDTO } from "../types/User.types";
import { hashPassword } from "../utils/password";

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
      res.status(400).json({ msg: "Invalid phone format. Expected Qatari number like +97460001234 or 60001234" });
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

export const login = async (req: Request, res: Response): Promise<void> => {}