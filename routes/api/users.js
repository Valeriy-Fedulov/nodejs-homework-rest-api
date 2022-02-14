import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { auth, ctrlWrapper } from "../../middlewares/index.js";

import {
  getCurrent,
  updateSubscription,
  updateAvatar,
  sentVerify,
} from "../../controllers/index.js";

const router = express.Router();

const FILE_DIR = path.resolve("./public/avatars");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const uploadMiddleware = multer({ storage });

router.get("/current", auth, ctrlWrapper(getCurrent));
router.patch("/", auth, ctrlWrapper(updateSubscription));
router.patch(
  "/avatars",
  auth,
  uploadMiddleware.single("avatar"),
  ctrlWrapper(updateAvatar)
);
router.post("/verify", ctrlWrapper(sentVerify));

export default router;
