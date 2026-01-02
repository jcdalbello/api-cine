import { Pool } from "pg";
import { pool } from "./pool-postgresql";
import Funcion from "../dominio/funcion";
import RepositorioFuncion from "../dominio/puerto-repositorio-funcion";
import Sala from "../dominio/sala";
import Pelicula from "../dominio/pelicula";

export default class RepositorioFuncionPostgreSQL implements RepositorioFuncion {
  private readonly pool: Pool;

  constructor() {
    this.pool = pool;
  }

  public async guardar(funcion: Funcion): Promise<Funcion> {
    const sala: Sala = funcion.obtenerSala();
    const pelicula: Pelicula = funcion.obtenerPelicula();

    const query: string = `
      INSERT INTO funciones (id_sala, id_pelicula)
      VALUES ($1, $2)
      RETURNING id;   
    `;

    const valores: number[] = [sala.obtenerId(), pelicula.obtenerId()];
    const resultado = await this.pool.query(query, valores);
    const idGenerado: number = resultado.rows[0].id;
    return new Funcion(
      idGenerado,
      sala,
      pelicula
    );
  }

  public buscarFunciones(): Funcion[] {
    return [];
  }
}
