import typeorm from "typeorm";
const { DataSource } = typeorm;

import Patient from "./entities/Patient.js";
import Order from "./entities/Order.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "db",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE || "app_db",
    synchronize: false,
    logging: false,
    entities: [Patient, Order],
    subscribers: [],
});
