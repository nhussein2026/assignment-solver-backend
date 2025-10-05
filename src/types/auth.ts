// types/auth.ts
export interface JwtPayload {
  id: string; // MongoDB ObjectId as string
  role: "admin" | "user" | "manager" | "tutor" | "programmer" | "Assistant";
  username?: string;
  iat?: number; // issued at (optional, added by JWT)
  exp?: number; // expiration (optional, added by JWT)
}
