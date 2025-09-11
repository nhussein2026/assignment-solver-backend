import { Types } from "mongoose";

export interface ICourse {
  _id?: Types.ObjectId;
  name: string;
  pic?: string;
  createdBy: Types.ObjectId; // admin user
  isOther?: boolean;
  assignments?: Types.ObjectId[]; // references Assignment
  createdAt?: Date;
  updatedAt?: Date;
}
