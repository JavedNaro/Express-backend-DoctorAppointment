import { Express } from "express";
import {
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
} from "../Controllers/userController.js";

const router = exprss.Router();

router.get("/:id", getSingleUser);
router.get("/", getAllUser);
router.get("/", updateUser);
router.get("/", deleteUser);

export default router;
