import { Router } from "express";
import {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from "../controllers/assignmentController";
import authenticated from "../middleware/authMiddleware"; // replace with your actual auth middleware

const router = Router();

// Public
router.get("/", getAllAssignments);
router.get("/:id", getAssignmentById);

// Protected (user/admin)
router.post("/", authenticated, createAssignment);
router.put("/:id", authenticated, updateAssignment);
router.delete("/:id", authenticated, deleteAssignment);

export default router;
