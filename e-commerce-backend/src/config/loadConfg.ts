import env from "dotenv";
import { logger } from "../util/logger";

env.config({ quiet: true });
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
        logger.info(`Loaded and set jwt secret key successfully`);
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

}

const loadCfg = new LoadCfg();

export default loadCfg;
