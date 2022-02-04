import express from "express";
import path from "path";

const FILE_DIR = path.resolve("./public/avatars");

const router = express.Router();

router.use("/", express.static(FILE_DIR));

export default router;
