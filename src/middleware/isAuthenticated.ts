import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Express.Request {
  user?: JwtPayload;
}

// Define the shape of the JWT payload
interface JwtPayload {
  id: string;
  role: string;
}

// JWT secret should be in env variables
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate JWT token
const authenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT error:", err); // optional logging
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authenticated;
