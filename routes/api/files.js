import express from "express";

import { uploadFiles } from "../../controllers/index.js";

import { auth, ctrlWrapper } from "../../middlewares/index.js";

const router = express.Router();

router.post("/upload", auth, ctrlWrapper(uploadFiles));

export default router;
