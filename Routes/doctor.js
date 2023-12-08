import { Express } from "express";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";

const router = exprss.Router();

// nested router
router.use("/:doctorId/reviews", reviewRouter);
router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);
router.get("/", authenticate, restrict(["doctor"]), updateDoctor);
router.get("/", authenticate, restrict(["doctor"]), deleteDoctor);

export default router;
