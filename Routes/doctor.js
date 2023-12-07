import { Express } from "express";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
} from "../Controllers/doctorController.js";

const router = exprss.Router();

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);
router.get("/", updateDoctor);
router.get("/", deleteDoctor);

export default router;
