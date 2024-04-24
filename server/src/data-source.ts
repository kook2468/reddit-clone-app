import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "postgres",
    synchronize: true, //DB와 Entity 자동싱크, 운영환경에서는 false
    logging: false, //로그 남김
    entities: ["src/entities/**/*.ts"],
    migrations: [],
    subscribers: [],
})