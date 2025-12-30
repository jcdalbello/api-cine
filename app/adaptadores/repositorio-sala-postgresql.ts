import { Pool } from "pg";
import { pool } from "./pool-postgresql";
import RepositorioSala from "../dominio/puerto-repositorio-sala";
import Sala from "../dominio/sala";
import SalaYaPersistidaError from "../errores/sala-ya-persistida-error";

export default class RepositorioSalaPostgreSQL implements RepositorioSala {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }
  public async guardar(sala: Sala): Promise<Sala> {
    if (sala.tieneIdAsignado()) {
      throw new SalaYaPersistidaError();
    }

    const query: string = `
      INSERT INTO salas (capacidad)
      VALUES ($1)
      RETURNING id;    
    `;

    const valores: number[] = [sala.obtenerCapacidad()];
    const resultado = await this.pool.query(query, valores);
    const idGenerado: number = resultado.rows[0].id;
    return new Sala(
      idGenerado,
      sala.obtenerCapacidad()
    );
  }

  public async listarSalas(): Promise<Sala[]> {
    const query: string = `
      SELECT * FROM salas;
    `;

    const resultado = await this.pool.query(query);
    return resultado.rows.map((row) => {
      const id: number = row.id;
      const capacidad: number = row.capacidad;
      
      return new Sala(id, capacidad);
    });
  }
}