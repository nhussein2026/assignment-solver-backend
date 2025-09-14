import { Request, Response } from "express";
import Course from "../models/Course";
import Assignment from "../models/Assignment";

// Create a course
export const createCourse = async (req: Request, res: Response) => {
  console.log("Creating a new course", req.body);

  try {
    const { name, pic, isOther } = req.body;

    // your authenticated middleware sets req.user
    const user = req.user as { userId?: string; id?: string; _id?: string; role?: string };

    // accept userId or id or _id, whichever your middleware sets
    const creatorId = user.userId || user.id || user._id;
    if (!creatorId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const createdBy = user.id || user._id || user.userId;

    const course = new Course({
      name,
      pic,
      isOther,
      createdBy,
    });

    await course.save();

    res.status(201).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Get all courses
export const getAllCourses = async (_req: Request, res: Response) => {
  try {
    const courses = await Course.find()
      .populate("assignments")
      .populate("createdBy", "name email"); // optional populate
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Get single course
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id)
      .populate("assignments")
      .populate("createdBy", "name email");
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Update course
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // don’t let clients change createdBy directly
    delete (updates as any).createdBy;

    const course = await Course.findByIdAndUpdate(id, updates, { new: true });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Delete course
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // optionally delete related assignments
    await Assignment.deleteMany({ course: id });

    res.status(200).json({ success: true, message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
