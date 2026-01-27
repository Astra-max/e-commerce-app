import express from "express";
import env from "dotenv";
import cors from "cors"
import { router } from "./routes/routes";
import RequestLimit, { GeneralRateLimiter } from "./middleware/rate-limiter";

env.config();


const app = express();
app.use(cors(
  {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
))
app.use(express.json());
app.use(RequestLimit)
app.use(GeneralRateLimiter)

const PORT = process.env.SERVER_PORT || 5500;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
