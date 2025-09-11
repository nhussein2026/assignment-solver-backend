import { Request, Response } from "express";
import Assignment from "../models/Assignment";
import Course from "../models/Course";

// Create assignment
export const createAssignment = async (req: Request, res: Response) => {
  try {
    const { course: courseId, question, type, description, timeToComplete, attachments, additionalInfo } = req.body;
    const createdBy = req.user._id;

    const assignment = new Assignment({
      course: courseId,
      question,
      type,
      description,
      timeToComplete,
      attachments,
      additionalInfo,
      createdBy,
    });

    await assignment.save();

    // add assignment to course
    await Course.findByIdAndUpdate(courseId, { $push: { assignments: assignment._id } });

    res.status(201).json({ success: true, assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Get all assignments
export const getAllAssignments = async (_req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find().populate("course createdBy");
    res.status(200).json({ success: true, assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Get single assignment
export const getAssignmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id).populate("course createdBy");
    if (!assignment) return res.status(404).json({ success: false, message: "Assignment not found" });

    res.status(200).json({ success: true, assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Update assignment
export const updateAssignment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const assignment = await Assignment.findByIdAndUpdate(id, updates, { new: true });
    if (!assignment) return res.status(404).json({ success: false, message: "Assignment not found" });

    res.status(200).json({ success: true, assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Delete assignment
export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findByIdAndDelete(id);
    if (!assignment) return res.status(404).json({ success: false, message: "Assignment not found" });

    // remove assignment from course
    await Course.findByIdAndUpdate(assignment.course, { $pull: { assignments: id } });

    res.status(200).json({ success: true, message: "Assignment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
