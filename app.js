import express from "express";
import logger from "morgan";
import cors from "cors";
import fs from "fs/promises";
import moment from "moment";
import mongoose from "mongoose";

import contactsRouter from "./routes/api/contactsRouter.js";

const DB_HOST =
  "mongodb+srv://userdb:qazXSWS@cluster0.hllxk.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Dtabase connect"))
  .catch((error) => console.log(error.message));

const app = express();

app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");
  await fs.appendFile("server.log", `\n${method} ${url} ${date}`);
  next();
});

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(500).json({ message: err.message });
});

export default app;
