import express from "express";
import { authValidation, loginValidation } from "../../models/index.js";

import { singup, login, logoutUser } from "../../controllers/index.js";

import { ctrlWrapper } from "../../middlewares/index.js";

const router = express.Router();

router.post("/singup", authValidation, ctrlWrapper(singup));
router.post("/login", loginValidation, ctrlWrapper(login));
router.post("/logout", ctrlWrapper(logoutUser));

export default router;
