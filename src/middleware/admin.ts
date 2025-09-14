import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

/**
 * This assumes you already ran `authenticated` middleware before,
 * so `req.user` is populated with `{ id, role }`.
 */
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  // if you used your own `AuthenticatedRequest` interface:
  // const user = (req as AuthenticatedRequest).user as JwtPayload;
  const user = req.user as JwtPayload | undefined;

  if (!user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  next();
};
