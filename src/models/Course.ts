import mongoose, { Schema, Model } from "mongoose";
import { ICourse } from "../types/Course.types";

const courseSchema: Schema<ICourse> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    pic: {
      type: String, // URL or path to course image
      default: "",  // optional
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // typically admin
      required: true,
    },
    isOther: {
      type: Boolean,
      default: false, // marks user-created course not in admin list
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const Course: Model<ICourse> = mongoose.model<ICourse>("Course", courseSchema);

export default Course;
