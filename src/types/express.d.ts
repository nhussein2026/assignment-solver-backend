import { IUser } from "./User.types";
import { JwtPayload } from "../types/auth";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
