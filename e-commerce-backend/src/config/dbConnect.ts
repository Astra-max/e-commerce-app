import { Pool } from "pg";
import dotenv from "dotenv";
import { logger } from "../util/logger";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
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
    logger.error("Failed to connect to DB", err);
  });

export default pool;