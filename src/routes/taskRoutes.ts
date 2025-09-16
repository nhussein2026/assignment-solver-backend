import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import authenticated from "../middleware/isAuthenticated";

const router = Router();

router.post("/", authenticated, createTask);
router.get("/", authenticated, getAllTasks);
router.get("/:id", authenticated, getTaskById);
router.put("/:id", authenticated, updateTask);
router.delete("/:id", authenticated, deleteTask);

export default router;
