import express, { Router } from "express";
import { register, login } from "../Controllers/authcontroller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
