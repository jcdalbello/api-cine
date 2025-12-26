import { Pool } from "pg";

export const pool = new Pool({
  user: 'usuario',
  host: 'localhost',
  database: 'api_cine_db',
  password: 'password',
  port: 5432,
});
