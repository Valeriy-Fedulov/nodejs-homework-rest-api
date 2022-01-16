import express from "express";
import logger from "morgan";
import cors from "cors";
import fs from "fs/promises";
import moment from "moment";

import contactsRouter from "./routes/api/contactsRouter.js";

// import contactsOperations from "./contacts.js";

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
  res.status(500).json({ message: err.message });
});

app.get("/api/contacts", (req, res) => {
  // contactsOperations.listContacts();
  // res.json(contacts);
});

app.get("/api/contacts/:id", (req, res) => {
  // contactsOperations.getById();
});

app.post("/api/contacts", (req, res) => {
  // contactsOperations.addContact();
});

app.delete("/api/contacts/:id", (req, res) => {
  // contactsOperations.removeContact();
});

app.put("/api/contacts/:id", (req, res) => {});

export default app;
