// routes/dashboardRoutes.ts
import express from "express";
import { getDashboardStats } from "../controllers/dashboardController";
import isAuthenticated from "../middleware/isAuthenticated";

const router = express.Router();

router.get("/stats", getDashboardStats);

export default router;
