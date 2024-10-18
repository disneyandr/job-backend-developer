import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis do .env

export const AppDataSource = new DataSource({
  type: 'mysql', // Altere para o tipo de banco de dados que você está usando
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false, // Não use true em produção
});
