import express from "express";
import env from "dotenv";
import { router } from "./routes/routes";
import { generalRateLimiter } from "./middleware/rate.limit.middleware";
import corsMiddleware from "./middleware/cors.middleware";

env.config();

const app = express();
app.use(corsMiddleware);
app.use(express.json());
app.use(generalRateLimiter);

const PORT = process.env.SERVER_PORT || 5500;

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
