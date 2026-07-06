import { Pool } from "pg";
import dotenv from "dotenv";

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
    console.log("Connected to Database");
    client.release();
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });

export default pool;