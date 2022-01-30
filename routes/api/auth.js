import express from "express";
import { authValidation, loginValidation } from "../../models/index.js";

import { singup, login, logout } from "../../controllers/index.js";

import { auth, ctrlWrapper } from "../../middlewares/index.js";

const router = express.Router();

router.post("/singup", authValidation, ctrlWrapper(singup));
router.post("/login", loginValidation, ctrlWrapper(login));
router.get("/logout", auth, ctrlWrapper(logout));

export default router;
