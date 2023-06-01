import { Sequelize } from "sequelize-typescript";
import pg from "pg";
import dbConfig from "../config/index";
import User from "./User";
import List from "./List";
import Task from "./Task";

let connectionUri = `postgres://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.HOST}/${dbConfig.NAME}?ssl=true`;

if (process.env.NODE_ENV === "development") {
  connectionUri = `postgres://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.HOST}/${dbConfig.NAME}`;
}

const sequelize = new Sequelize(connectionUri, {
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
});

// const sequelize = new Sequelize({
//   host: dbConfig.HOST,
//   database: dbConfig.NAME,
//   username: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   dialect: "postgres",
//   dialectModule: pg,
//   logging: false,
// });

sequelize.addModels([User, List, Task]);

User.hasMany(List, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

List.belongsTo(User, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

List.hasMany(Task, {
  foreignKey: {
    name: "list_id",
    allowNull: false,
  },
});

Task.belongsTo(List, {
  foreignKey: {
    name: "list_id",
    allowNull: false,
  },
});

export { User, List, Task };

export const initDB = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
};
