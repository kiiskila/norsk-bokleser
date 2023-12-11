import dotenv from "dotenv";
dotenv.config();

export default {
  client: "pg",
  migrations: {
    extension: "ts",
  },
  connection: {
    host: process.env.DATABASE_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
