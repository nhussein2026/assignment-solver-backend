import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMyProfile,
} from "../controllers/userController";
import authenticated from "../middleware/isAuthenticated";

const router = Router();

router.post("/", createUser);           // POST /api/users
router.get("/", getAllUsers);           // GET /api/users
// router.get("/:id", getUserById);        // GET /api/users/:id
router.put("/:id", updateUser);         // PUT /api/users/:id
router.delete("/:id", deleteUser);      // DELETE /api/users/:id


// profile route
router.get("/me", authenticated,  getMyProfile); // GET /api/users/me

export default router;
