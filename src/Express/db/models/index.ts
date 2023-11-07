import { DataTypes, Sequelize, UUIDV4 } from "sequelize";

export function createDefaultAdmin(sequelize: Sequelize) {
  sequelize.models.Users.bulkCreate([
    {
      email: "admin@cd.com",
      usr_name: "admin_man",
      role: "admin",
    },
    {
      email: "bob@cd.com",
      usr_name: "bob_man",
      role: "user",
    },
    {
      email: "dan@cd.com",
      usr_name: "dan_man",
      role: "user",
    },
  ]);
}

export function Users(sequlize: Sequelize) {
  sequlize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    usr_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^\w{3,20}$/,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}

export function Conversation(sequelize: Sequelize) {
  sequelize.define("Convo", {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
}

export function Message(sequelize: Sequelize) {
  sequelize.define("Message", {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
}

export function Members(sequelize: Sequelize) {
  sequelize.define("Members", {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  });
}

export function associations(squlize: Sequelize) {
  console.log(squlize.models);
  squlize.models.Message.belongsTo(squlize.models.Convo, {
    foreignKey: "id",
  });
  squlize.models.Convo.belongsToMany(squlize.models.Users, {
    through: "Members",
    foreignKey: "Convo_convoId",
  });
  squlize.models.Users.belongsToMany(squlize.models.Convo, {
    through: "Members",
    foreignKey: "Users_userId",
  });
}
