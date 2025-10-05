import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController";
import isAuthenticated from "../middleware/isAuthenticated";

const router = Router();

// Public
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Protected (admin/user)
router.post("/add", isAuthenticated, createCourse);
router.put("/:id", isAuthenticated, updateCourse);
router.delete("/:id", isAuthenticated, deleteCourse);

export default router;
