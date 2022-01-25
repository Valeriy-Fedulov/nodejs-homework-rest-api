import express from "express";
import { userValidation, loginValidation } from "../../models/index.js";

import { singup, login, logoutUser, getUser } from "../../controllers/index.js";

const router = express.Router();

router.post("/singup", userValidation, singup);
router.post("/login", login);
router.post("/logout", logoutUser);
router.post("/current", getUser);

export default router;
