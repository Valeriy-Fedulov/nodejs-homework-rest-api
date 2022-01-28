import { User } from "../models/index.js";
import Unauthorized from "http-errors";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw new Unauthorized("Not authorized");
  }
  const { id } = jwt.verify(token, SECRET_KEY);
};

export default auth;
