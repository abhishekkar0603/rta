import { Sequelize } from "sequelize";
import {
  Conversation,
  Members,
  Message,
  Users,
  associations,
  createDefaultAdmin,
} from "./models";

const squlize = new Sequelize({
  dialect: "sqlite",
  storage: "./messenger-db.sqlite",
  logQueryParameters: true,
  benchmark: true,
});

Users(squlize);
Conversation(squlize);
Message(squlize);
Members(squlize);
associations(squlize);

squlize.sync({ force: true }).then(() => createDefaultAdmin(squlize));

export default squlize;
