import { IUser } from "./User.types";

interface JwtPayload {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser | string | JwtPayload;
    }
  }
}
