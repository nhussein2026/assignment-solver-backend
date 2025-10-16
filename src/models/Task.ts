import mongoose, { Schema, Model } from "mongoose";
import { ITask } from "../types/Task.types";

const taskSchema: Schema<ITask> = new Schema(
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
      enum: ["قيد التنفيذ", "تم الإنجاز", "قيد الانتظار", "متأخر"],
      default: "قيد التنفيذ",
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
  { timestamps: true },
);

const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);

export default Task;
