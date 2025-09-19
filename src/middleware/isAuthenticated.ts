import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../types/User.types";


export interface AuthenticatedRequest extends Express.Request {
  user?: JwtPayload;
}


// Define the shape of the JWT payload
interface JwtPayload {
  id: string;
  role: string;
}

// JWT secret should be in env variables
const JWT_SECRET = process.env.JWT_SECRET || "n101a4f6b8c94e5e93f0c9a2db3875fc7f92b8c96f71d39f0e8b041adf3b71b6c68ab50d20a45c31f5d8be479efb1c17db5f6c9c59d8ebfn1017a7cc1545n2026";

// Middleware to authenticate JWT token
const authenticated = (req: Request, res: Response, next: NextFunction ) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
    req.user = decoded; // e.g., { id, role }
    next();
  } catch (err) {
    console.error("JWT error:", err); // optional logging
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authenticated;
