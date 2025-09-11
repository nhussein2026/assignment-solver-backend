import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController";
import authenticated from "../middleware/authMiddleware"; 

const router = Router();

// Public
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Protected (admin/user)
router.post("/", authenticated, createCourse);
router.put("/:id", authenticated, updateCourse);
router.delete("/:id", authenticated, deleteCourse);

export default router;
