import express from "express";
import { auth, ctrlWrapper } from "../../middlewares/index.js";

import { getCurrent, updateSubscription } from "../../controllers/index.js";

const router = express.Router();

router.get("/current", auth, ctrlWrapper(getCurrent));
router.patch("/", auth, ctrlWrapper(updateSubscription));

export default router;
