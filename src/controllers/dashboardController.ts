import { Request, Response } from "express";
import User from "../models/User";
import Course from "../models/Course";
import Task from "../models/Task";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [users, courses, tasks] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Task.countDocuments(),
    ]);

    res.json({
      success: true,
      data: { users, courses, tasks },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
