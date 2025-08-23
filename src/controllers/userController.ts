// import { Request, Response } from "express";
// import User from "../models/User";
// import { IUser } from "../types/User.types";

// // Create new user
// export const createUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { name, email, phone, username, password } = req.body as IUser;

//     const existing = await User.findOne({ email });
//     if (existing) {
//       res.status(400).json({ msg: "Email already in use" });
//       return;
//     }

//     const user = new User({ name, email, phone, username, password });
//     await user.save();

//     res.status(201).json(user);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err });
//   }
// };

// // Get all users
// export const getUsers = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const users = await User.find().select("-password"); // hide password
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// // Get single user by ID
// export const getUserById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const user = await User.findById(req.params.id).select("-password");
//     if (!user) {
//       res.status(404).json({ msg: "User not found" });
//       return;
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };
