import { Pool } from "pg";
import { pool } from "./pool-postgresql";
import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";
import Pelicula from "../dominio/pelicula";

export default class RepositorioPeliculaPostgreSQL implements RepositorioPelicula {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  public async guardar(pelicula: Pelicula): Promise<Pelicula> {
    const query: string = `
      INSERT INTO peliculas (titulo, genero)
      VALUES ($1, $2)
      RETURNING id;    
    `;

    const valores: string[] = [pelicula.obtenerTitulo(), pelicula.obtenerGenero()];
    const resultado = await this.pool.query(query, valores);
    const idGenerado: number = resultado.rows[0].id;
    return new Pelicula(
      idGenerado,
      pelicula.obtenerTitulo(),
      pelicula.obtenerGenero()
    );
  }
}