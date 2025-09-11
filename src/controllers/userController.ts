import { Request, Response } from "express";
import User from "../models/User";
import { IUser } from "../types/User.types";

/**
 * Create a new user (not register)
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, username, password, referralCode, referredBy, subjects, role } =
      req.body;

    const newUser = new User({
      name,
      email,
      phone,
      username,
      password,
      referralCode,
      referredBy,
      subjects,
      role,
    });

    const savedUser = await newUser.save();
    // never return password directly
    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Get all users
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find().select("-password").populate("subjects");
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get single user by ID
 */
export const getUserById = async (req: Request, res: Response) => {
  console.log("getUserById called");
  try {
    const { id } = req.params;

    // Basic MongoDB ObjectId validation (without mongoose import)
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(id).select("-password").populate("subjects");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err: any) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ message: err.message || "Failed to fetch user" });
  }
};
/**
 * Update user by ID
 */
export const updateUser = async (req: Request, res: Response) => {
  console.log("updateUser called");
  try {
    const { id } = req.params;

    // Basic MongoDB ObjectId validation (without mongoose import)
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Remove password from update here if you want separate endpoint for password change
    const updateData = { ...req.body };
    delete updateData.password;

    // Add updatedAt timestamp
    updateData.updatedAt = new Date();

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .select("-password")
      .populate("subjects");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err: any) {
    console.error("Error updating user:", err);
    res.status(400).json({ message: err.message || "Failed to update user" });
  }
};

/**
 * Get the logged-in user's profile
 */
export const getMyProfile = async (req: Request, res: Response) => {
    console.log("getMyProfile called");
  try {
    // This assumes your auth middleware attaches the decoded user object to req.user
    const authUser = (req as any).user; // or use a custom type
    console.log("Authenticated user:", authUser);

    if (!authUser?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = authUser.userId;
    console.log("Fetching profile for userId:", userId);

    const user = await User.findById(userId)
      .select("-password")

      console.log("Fetched user profile:", user);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Delete user by ID
 */
export const deleteUser = async (req: Request, res: Response) => {
  console.log("deleteUser called");
  try {
    const { id } = req.params;

    // Basic MongoDB ObjectId validation 
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err: any) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: err.message || "Failed to delete user" });
  }
};
