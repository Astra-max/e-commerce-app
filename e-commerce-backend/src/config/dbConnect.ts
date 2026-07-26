import { Pool } from "pg";
import { logger } from "../util/logger";
import LoadCfg from "./loadConfg";

const url = LoadCfg.loadDbCfg();

const pool = new Pool({
  connectionString: url,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .connect()
  .then((client) => {
    logger.info("Database connected successfully");
    client.release();
  })
  .catch((err) => {
    logger.error(`Failed to connect to DB: ${err}`);
    process.exit(1)
  });

export default pool;