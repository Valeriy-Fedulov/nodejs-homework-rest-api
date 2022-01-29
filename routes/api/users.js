import express from "express";
import { auth, ctrlWrapper } from "../../middlewares/index.js";

import { getCurrent } from "../../controllers/index.js";

const router = express.Router();

router.get("/current", auth, ctrlWrapper(getCurrent));

export default router;
