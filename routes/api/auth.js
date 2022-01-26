import express from "express";
import { authValidation, loginValidation } from "../../models/index.js";

import { singup, login, logoutUser } from "../../controllers/index.js";

const { SECRET_KEY } = process.env;
console.log(SECRET_KEY);

const router = express.Router();

router.post("/singup", authValidation, singup);
router.post("/login", loginValidation, login);
router.post("/logout", logoutUser);

export default router;
