import { Types } from "mongoose";

export interface IAssignment {
  _id?: Types.ObjectId;
  studentName: string;
  studentId: string;
  doctorName: string;
  course: Types.ObjectId; // reference to Course
  question: string;
  type?: "homework" | "project" | "quiz" | "other";
  description?: string;
  timeToComplete: number; // in minutes or hours
  status?: "in_progress" | "achieved" | "pending" | "overdue";
  attachments?: string[]; // URLs or file paths
  additionalInfo?: string;
  createdBy: Types.ObjectId; // reference to User
  createdAt?: Date;
  updatedAt?: Date;
}
