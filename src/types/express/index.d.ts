import { IUser } from '../User.types';

declare global {
  namespace Express {
    interface Request {
      user?: IUser | string | JwtPayload; // or user: IUser if you’re sure it always exists
    }
  }
}
