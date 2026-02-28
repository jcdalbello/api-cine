import { Pool } from "pg";
import { pool } from "./pool-postgresql";
import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";
import Pelicula from "../dominio/pelicula";
import PeliculaYaPersistidaError from "../errores/pelicula-ya-pesistida-error";
import PeliculaNoEncontradaError from "../errores/pelicula-no-encontrada-error";

export default class RepositorioPeliculaPostgreSQL implements RepositorioPelicula {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  public async guardar(pelicula: Pelicula): Promise<Pelicula> {
    if (pelicula.tieneIdAsignado()) {
      throw new PeliculaYaPersistidaError();
    }

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

  public async listarPeliculas(titulo?: string, genero?: string): Promise<Pelicula[]> {
    let query: string = `
      SELECT * FROM peliculas WHERE 1=1
    `;
    const valores: string[] = [];
    let contadorParametros: number = 1;

    if (titulo) {
      const condicionTitulo: string = ` AND titulo LIKE $${contadorParametros}`;
      query += condicionTitulo;
      valores.push("%" + titulo + "%");
      contadorParametros++;
    }

    if (genero) {
      const condicionGenero: string = ` AND genero LIKE $${contadorParametros}`;
      query += condicionGenero;
      valores.push("%" + genero + "%");
      contadorParametros++;
    }

    query += ";";

    const resultado = await this.pool.query(query, valores);
    return resultado.rows.map((row) => {
      const id: number = row.id;
      const titulo: string = row.titulo;
      const genero: string = row.genero;
      return new Pelicula(id, titulo, genero);
    });
  }

  public async recuperar(id: number): Promise<Pelicula> {
    const query: string = `
      SELECT * FROM peliculas
      WHERE id = $1;    
    `;
    const values: number[] = [id];

    const resultado = await this.pool.query(query, values);
    if (resultado.rowCount === 0) {
      throw new PeliculaNoEncontradaError;
    }

    const idRecuperado: number = resultado.rows[0].id;
    const tituloRecuperado: string = resultado.rows[0].titulo;
    const generoRecuperado: string = resultado.rows[0].genero;
    return new Pelicula(
      idRecuperado,
      tituloRecuperado,
      generoRecuperado,
    );
  }

  public async eliminar(id: number): Promise<void> {
    const query: string = `
        DELETE FROM peliculas
        WHERE id = $1;
    `;

    const values: number[] = [id];

    await this.pool.query(query, values);
  }
}