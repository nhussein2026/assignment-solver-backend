import { Request, Response } from "express";
import Task from "../models/Task";

// Create a Task
export const createTask = async (req: Request, res: Response) => {
  // console.log("Request body to create task:", req.body); // Debugging line
  console.log("user is: ", req.user); // Debugging line to check authenticated user
  try {
    const {
      studentName,
      studentId,
      doctorName,
      course,
      question,
      type,
      description,
      timeToComplete,
      attachments,
      additionalInfo,
    } = req.body;

    console.log("Creating task for student:", req.user); // Debugging line
    // your authenticated middleware sets req.user
    const createdBy = req?.user?.id;
    console.log("Authenticated user ID:", createdBy); // Debugging line
    if (!createdBy) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    const task = new Task({
      studentName,
      studentId,
      doctorName,
      course,
      question,
      type,
      description,
      timeToComplete,
      attachments,
      additionalInfo,
      createdBy,
    });

    await task.save();
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Get all Tasks
export const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await Task.find().populate("course").populate("createdBy");
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Get Task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("course")
      .populate("createdBy");
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Update Task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Delete Task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
