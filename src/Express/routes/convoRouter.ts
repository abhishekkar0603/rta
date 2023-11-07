import { Router } from "express";
import { authMiddleware } from "../middleWare";
import squlize from "../db";

const convoRouter = Router();

convoRouter.use(authMiddleware);

convoRouter.post("/create", async (req, res) => {
  const body = req.body;
  const users = await squlize.models.Users.findAll({
    where: {
      id: body.id,
    },
  });
  const q = await squlize.models.Convo.create(
    {
      name: body.name ? body.name : "",
    },
    {
      include: squlize.models.Users,
    }
  );
  console.log(q);
  const data: any = [];
  for (var i = 0; i < users.length; i++) {
    const ele = users[i];
    data.push({
      Convo_convoId: q.getDataValue("id"),
      Users_userId: ele.getDataValue("id"),
    });
  }
  await squlize.models.Members.bulkCreate(data);
  res.send(q);
});

convoRouter.get("/user/:id", async (req, res) => {
  const uid = req.params.id;
  const usrs = squlize.models.Users;
  const q = await squlize.models.Convo.findAll({
    where: {
      "$Users.id$": parseInt(uid),
    },
    include: [{ model: usrs, required: true, attributes: ["id"] }],
    attributes: ["id"],
  });
  res.send(q);
});

convoRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const q = await squlize.models.Convo.findByPk(id, {
    include: [{ model: squlize.models.Users, attributes: ["id", "usr_name"] }],
  });
  if (!q) {
    res.status(400).send({ message: "Invalid conversation Id" });
  } else res.send(q);
});

convoRouter.put("/member/:id", async (req, res) => {
  const ids = req.body.ids;
  const convoId = req.params.id;
  const usrs = await squlize.models.Users.findAll({
    where: {
      id: ids,
    },
  });
  console.log(ids);
  const q = await squlize.models.Convo.findByPk(convoId);
  console.log(usrs);
  const data = usrs.map<any>((usr) => {
    return {
      Convo_convoId: q?.getDataValue("id"),
      Users_userId: usr.getDataValue("id"),
    };
  });
  squlize.models.Members.bulkCreate(data)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

export default convoRouter;
