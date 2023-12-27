import dotenv from "dotenv";
import { parse } from "pg-connection-string";

dotenv.config();

const dbConfig = parse(process.env.DATABASE_URL!);

export default {
  client: "pg",
  migrations: {
    extension: "ts",
  },
  connection: {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
    //ssl: { rejectUnauthorized: false },
  },
};
