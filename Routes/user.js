import { Express } from "express";
import {
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
} from "../Controllers/userController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = exprss.Router();

router.get("/:id", authenticate, restrict(["patient"]), getSingleUser);
router.get("/", authenticate, restrict(["admin"]), getAllUser);
router.get("/", authenticate, restrict(["patient"]), updateUser);
router.get("/", authenticate, restrict(["patient"]), deleteUser);

export default router;
