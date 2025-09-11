import mongoose, { Schema, Model } from "mongoose";
import { IAssignment } from "../types/Assignment.types";

const assignmentSchema: Schema<IAssignment> = new Schema(
  {
     studentName: {
      type: String,
      required: true,
      trim: true,
    },
    studentId: {
      type: String,
      required: true,
      trim: true,
    },
    doctorName: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["homework", "project", "quiz", "other"], // extendable
      default: "homework",
    },
    description: {
      type: String,
      default: "",
    },
    timeToComplete: {
      type: Number, // in minutes or hours
      required: true,
    },
    status: {
      type: String,
      enum: ["in_progress", "achieved", "pending", "overdue"],
      default: "in_progress",
    },
    attachments: [
      {
        type: String, // URL or file path
      },
    ],
    additionalInfo: {
      type: String,
      default: "",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Assignment: Model<IAssignment> = mongoose.model<IAssignment>(
  "Assignment",
  assignmentSchema
);

export default Assignment;
