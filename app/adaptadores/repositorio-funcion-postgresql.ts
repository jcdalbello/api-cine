import { Pool } from "pg";
import { pool } from "./pool-postgresql";
import Funcion from "../dominio/funcion";
import RepositorioFuncion from "../dominio/puerto-repositorio-funcion";
import Sala from "../dominio/sala";
import Pelicula from "../dominio/pelicula";
import RepositorioSala from "../dominio/puerto-repositorio-sala";
import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";

export default class RepositorioFuncionPostgreSQL implements RepositorioFuncion {
  private readonly pool: Pool;

  constructor(
    private readonly repositorioSala: RepositorioSala,
    private readonly repositorioPelicula: RepositorioPelicula,
  ) {
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

  public async buscarFunciones(idSala?: number): Promise<Funcion[]> {
    let query: string = `
      SELECT * FROM funciones WHERE 1=1
    `;
    const valores: number[] = [];
    let contadorParametros: number = 1;

    if (idSala) {
      const condicionSala: string = ` AND id_sala = $${contadorParametros}`;
      query += condicionSala;
      valores.push(idSala);
      contadorParametros++;
    }

    query += ";";

    const resultado = await this.pool.query(query, valores);
    
    if (resultado.rowCount === 0) {
      return [];
    }

    const funciones: Funcion[] = [];

    for (const row of resultado.rows) {
      const idSala: number = row.id_sala;
      const idPelicula: number = row.id_pelicula;

      const sala: Sala = await this.repositorioSala.recuperar(idSala);
      const pelicula: Pelicula = await this.repositorioPelicula.recuperar(idPelicula);

      const funcion: Funcion = new Funcion(idSala, sala, pelicula);
      funciones.push(funcion);
    }

    return funciones;
  }
}
