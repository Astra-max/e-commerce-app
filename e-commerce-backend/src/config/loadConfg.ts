import env from "dotenv";
import { logger } from "../util/logger";

env.config();

interface ServerConfig {
    port: number;
    secretKey: string;
    dbUrl: string;
}

var serverEnv: ServerConfig = {
    port: 0,
    secretKey: "",
    dbUrl: "",
}

class LoadCfg {
    private port: number = 5500;

    loadServerAddr(): number {
        const serverPort = process.env.SERVER_PORT;
        if (!serverPort) {
            logger.warn(`Failed to load and set web server port defaulting ${this.port}`);
            return this.port;
        }
        if (Number.isNaN(Number(serverPort)) || Number(serverPort) < 3000) {
            logger.warn(`Invalid web server port number!\nDefaulting ${this.port}`)
        }
        logger.info(`Loaded and set server port succefully!`)
        return Number(serverPort);
    }

    loadSecretKey(): string {
        const secret = process.env.SECRET_KEY;

        if (!secret || secret === "") {
            logger.warn(`Failed to load jwt secret key!`)
            process.exit(1);
        }
        logger.info(`Loaded jwt secret key successfully`);
        return secret
    }

    loadDbCfg(): string {
        const dbUrl = process.env.DATABASE_URL;

        if (!dbUrl || dbUrl === "") {
            logger.error(`Failed to load database connection string`);
            process.exit(1);
        }
        logger.info("Loaded and set database url successfully!");
        return dbUrl
    }

    loadCfg(): ServerConfig {
        try {
            const port = this.loadServerAddr();
            const secretKey = this.loadSecretKey();
            const dbUrl = this.loadDbCfg()
            serverEnv = { ...serverEnv, port, dbUrl, secretKey }
        } catch (error) {
            logger.warn(`Failed to load environment variables.`);
            process.exit(1);
        }
        return serverEnv
    }

}

const loadCfg = new LoadCfg();

export default loadCfg;
