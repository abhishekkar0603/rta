import { Router } from "express";
import squlize from "../db";
import { userSchema, userUpdateSchema } from "../schema";
import { userMiddleware } from "../middleWare";

const userRouter = Router();

userRouter.get("/list", async (_req, res) => {
  const { Users } = squlize.models;
  const q = await Users.findAll({
    attributes: ["id", "usr_name", "firstName", "lastName", "role"],
  });
  res.send(q);
});

userRouter.put("/update", userMiddleware, async (req, res) => {
  const body = req.body;
  const { error } = userUpdateSchema.validate(body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    squlize.models.Users.update(
      { ...body },
      {
        where: {
          id: body.id,
        },
      }
    )
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
  }
});

userRouter.delete("/delete", userMiddleware, async (req, res) => {
  const body = req.body;
  const { error } = userUpdateSchema.validate(body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    squlize.models.Users.destroy({
      where: {
        id: body.id,
      },
    })
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
  }
});

userRouter.post("/add", userMiddleware, async (req, res) => {
  const body = req.body;
  const { error } = userSchema.validate(body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    squlize.models.Users.bulkCreate(body)
      .then(() => res.sendStatus(200))
      .catch((err) => res.send(err));
  }
});

export default userRouter;
