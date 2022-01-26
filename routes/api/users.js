import express from "express";
import auth from "../../middlewares/index.js";
// import { userValidation } from "../../models/index.js";

import { getCurrent } from "../../controllers/index.js";

const router = express.Router();

router.post("/current", auth, getCurrent);

export default router;
