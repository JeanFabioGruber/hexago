import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

// Normaliza __dirname para usar barras normais
const normalizedDir = __dirname.replace(/\\/g, "/");

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,  
  entities: [`${normalizedDir}/**/entity/*.ts`],
  migrations: [`${normalizedDir}/**/migrations/*.ts`],
  synchronize: false,
  logging: false,
});

console.log("Entidades carregadas:", AppDataSource.options.entities);
console.log("Migrations carregadas:", AppDataSource.options.migrations);
