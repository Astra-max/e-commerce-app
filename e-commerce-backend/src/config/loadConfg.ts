import env from "dotenv";
import { logger } from "../util/logger";

env.config({ quiet: true });
class LoadCfg {
    private port: number = 5500;

    // load server port
    loadServerAddr(): number {
        const serverPort = process.env.SERVER_PORT;
        if (!serverPort) {
            logger.warn(`Failed to load and set web server port defaulting ${this.port}`);
            return this.port;
        }
        if (Number.isNaN(Number(serverPort)) || Number(serverPort) < 3000) {
            logger.error(`Invalid web server port number!\nDefaulting ${this.port}`)
        }
        logger.info(`Loaded and set server port succefully!`)
        return Number(serverPort);
    }

    // load jwt secret key
    loadSecretKey(): string {
        const secret = process.env.SECRET_KEY;

        if (!secret || secret === "") {
            logger.error(`Failed to load jwt secret key!`)
            process.exit(1);
        }
        logger.info(`Loaded and set jwt secret key successfully`);
        return secret
    }

    // load database connection string
    loadDbCfg(): string {
        const dbUrl = process.env.DATABASE_URL;

        if (!dbUrl || dbUrl === "") {
            logger.error(`Failed to load database connection string`);
            process.exit(1);
        }
        logger.info("Loaded and set database url successfully!");
        return dbUrl
    }

    // load node environment
    loadNodeEnv(): string {
        const nodeEnv = process.env.NODE_ENV as string

        if (!nodeEnv || nodeEnv === "") {
            logger.error(`Failed to load node environment.`)
            process.exit(1)
        }

        logger.info(`Execution Environment: [ ---> ${nodeEnv} <--- ]`)
        return nodeEnv;
    }

}

const loadCfg = new LoadCfg();

export default loadCfg;
