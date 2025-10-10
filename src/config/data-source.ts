import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";

const buildSettings = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, '../entities/**.{ts,js}');
    const migrationPath: string = path.join(__dirname, '../migrations/**.{ts,js}');

    const host: string | undefined = process.env.DB_HOST;
    if (!host) throw new Error("Missing env var: 'DB_HOST'");

    const username: string | undefined = process.env.DB_USERNAME;
    if (!username) throw new Error("Missing env var: 'DB_USERNAME'");

    const password: string | undefined = process.env.DB_PASSWORD;
    if (!password) throw new Error("Missing env var: 'DB_PASSWORD'");

    const database: string | undefined = process.env.DB_DATABASE;
    if (!database) throw new Error("Missing env var: 'DB_DATABASE'");

    const port: number = Number(process.env.DB_PORT);
    if (isNaN(port)) throw new Error("Invalid or missing env var: 'DB_PORT'");

    return {
        type: "postgres",
        host,
        port,
        username,
        password,
        database,
        entities: [entitiesPath],
        migrations: [migrationPath],
        synchronize: false,
        logging: false,
        extra: {
            max: 10,
            idleTimeoutMillis: 30000,
        },
    };
};

const AppDataSource = new DataSource(buildSettings());

export default AppDataSource;
