import env from "dotenv";
import { logger } from "../util/logger";

env.config();

interface ServerConfig {
    port: number;
}

var ServerEnv: ServerConfig = {
    port: 0,
}

export function LoadServerCfg(): ServerConfig {
    const serverPort = process.env.SERVER_PORT;
    if (!serverPort) {
        logger.warn(`Failed to load server port: defaulting 5500`);
        ServerEnv = { ...ServerEnv, port: 5500};
        return ServerEnv
    }
    ServerEnv = { ...ServerEnv, port: Number(serverPort) }
    logger.info('Loaded server env successfully')
    return ServerEnv;
}

export function LoadDBCfg() {}