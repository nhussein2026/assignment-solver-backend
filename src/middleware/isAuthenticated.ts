import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/auth";

// Extend Express Request to include user property
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// Validate environment variable at startup
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

// Middleware to authenticate JWT token
const isAuthenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "Authorization header missing" });
      return;
    }

    if (!authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Authorization header malformed" });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token missing" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    // Log error for server-side monitoring
    console.error("JWT verification error:", err);

    // Don't expose specific error details in production
    if (process.env.NODE_ENV === "production") {
      res.status(401).json({ message: "Authentication failed" });
    } else {
      // More detailed error in development
      if (err instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: "Token expired" });
      } else if (err instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        res.status(401).json({ message: "Authentication failed" });
      }
    }
  }
};

export default isAuthenticated;
