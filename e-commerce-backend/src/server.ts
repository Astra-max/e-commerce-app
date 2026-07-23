import express from "express";
import { router } from "./routes/routes";
import { generalRateLimiter } from "./middleware/rate.limit.middleware";
import corsMiddleware from "./middleware/cors.middleware";
import { LoadServerCfg } from "./config/loadEnv";
import { logger } from "./util/logger";

const app = express();
app.use(corsMiddleware);
app.use(express.json());
app.use(generalRateLimiter);

const cfg = LoadServerCfg()

app.use("/api/v1", router);

app.listen(cfg.port, () => {
  logger.info(`Server running on http://localhost:${cfg.port}`);
});
