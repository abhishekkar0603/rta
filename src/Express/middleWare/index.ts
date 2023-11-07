import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.SERVER_SECRET;

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    res.send(400).send({
      message: "authorization header missing",
    });
  } else {
    jwt.verify(token, secret ? secret : "default", (err, decoded) => {
      if (err) {
        res.status(403).send(err);
        return;
      }
      console.log(decoded);
      if (
        decoded !== undefined &&
        typeof decoded !== "string" &&
        decoded?.role === "admin"
      )
        next();
      else res.status(401).send({ message: "Operation not allowed" });
    });
  }
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    res.send(400).send({
      message: "authorization header missing",
    });
  } else {
    jwt.verify(token, secret ? secret : "default", (err, _decoded) => {
      if (err) {
        res.status(403).send(err);
        return;
      }
      next();
    });
  }
};

export { userMiddleware, authMiddleware };
