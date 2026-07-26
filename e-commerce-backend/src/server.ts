import express from "express";
import { router } from "./routes/routes";
import { generalRateLimiter } from "./middleware/rate.limit.middleware";
import corsMiddleware from "./middleware/cors.middleware";
import LoadCfg from "./config/loadConfg";
import { logger } from "./util/logger";
import seed from "./config/seed";

const app = express();
app.use(corsMiddleware);
app.use(express.json());
app.use(generalRateLimiter);

const port = LoadCfg.loadServerAddr()

app.use("/api/v1", router);

const env = LoadCfg.loadNodeEnv()

if (env === "production") {
  seed();
}

app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});