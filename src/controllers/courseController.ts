import { Request, Response } from "express";
import Course from "../models/Course";
import Assignment from "../models/Assignment";

// Create a course
export const createCourse = async (req: Request, res: Response) => {
  console.log("Creating a new course");
  try {
    const { name, pic, isOther } = req.body;
    const createdBy = (req.user as any)?._id;

    const course = new Course({ name, pic, isOther, createdBy });
    await course.save();

    res.status(201).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Get all courses
export const getAllCourses = async (_req: Request, res: Response) => {
  console.log("Fetching all courses");
  try {
    const courses = await Course.find().populate("assignments");
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Get single course
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate("assignments");
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Update course
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const course = await Course.findByIdAndUpdate(id, updates, { new: true });
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

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
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    // optionally delete related assignments
    await Assignment.deleteMany({ course: id });

    res.status(200).json({ success: true, message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
