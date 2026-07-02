import cors from "cors";

const corsOptions: cors.CorsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

const corsMiddleware = cors(corsOptions);
export default corsMiddleware;