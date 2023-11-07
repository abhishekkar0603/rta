import { Router } from "express";
import squlize from "../db";
import jwt from "jsonwebtoken";
import { loginSchema } from "../schema";

const secret = process.env.SERVER_SECRET;

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const body = req.body;

  console.log(body);

  const { error } = loginSchema.validate(body);

  if (error) {
    res.status(400).send(error.message);
    return;
  }

  const { Users } = squlize.models;

  const q = await Users.findOne({
    where: {
      usr_name: body.usr_name,
      email: body.email,
    },
  });
  if (!q?.dataValues) {
    res.status(400).send("Invalid usr_name or password");
  } else {
    console.log(q.getDataValue("role"));
    const token = jwt.sign(
      { role: q.getDataValue("role"), usr_id: q.getDataValue("id") },
      secret ? secret : "default",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).send({ token, id: q.getDataValue("id") });
  }
});

export default authRouter;
