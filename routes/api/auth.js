import express from "express";
import { userValidation, loginValidation } from "../../models/index.js";

import {
  addUser,
  loginUser,
  logoutUser,
  getUser,
} from "../../controllers/index.js";

const router = express.Router();

router.post("/users/singup", userValidation, addUser);
router.post("/users/login", loginValidation, loginUser);
router.post("/users/logout", logoutUser);
router.post("/users/current", getUser);

export default router;
