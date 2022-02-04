import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

import { uploadFiles } from "../../controllers/index.js";

import { auth, ctrlWrapper } from "../../middlewares/index.js";

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

router.post(
  "/upload",
  uploadMiddleware.single("avatar"),
  ctrlWrapper(uploadFiles)
);
router.use("/", express.static(FILE_DIR));

export default router;
