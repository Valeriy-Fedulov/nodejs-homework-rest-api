import express from "express";
import logger from "morgan";
import cors from "cors";

import "dotenv/config";

import {
  authRouter,
  usersRouter,
  contactsRouter,
  filesRouter,
} from "./routes/index.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);
app.use("/avatars", filesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(500).json({ message: err.message });
});

export default app;
