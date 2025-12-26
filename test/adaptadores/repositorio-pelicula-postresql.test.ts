import { pool } from "../../app/adaptadores/pool-postgresql";
import RepositorioPeliculaPostgreSQL from "../../app/adaptadores/repositorio-pelicula-postgresql";
import Pelicula from "../../app/dominio/pelicula";

let repositorioPeliculaPostgreSQL: RepositorioPeliculaPostgreSQL;

describe("RepositorioPeliculaPostgreSQL", () => {
  repositorioPeliculaPostgreSQL = new RepositorioPeliculaPostgreSQL();

  afterEach(async () => {
    await pool.query("TRUNCATE TABLE peliculas RESTART IDENTITY CASCADE");
  });

  afterAll(async () => {
    await pool.end();
  });

  test("deberia crear un objeto RepositorioPeliculaPostgreSQL", () => {
    expect(repositorioPeliculaPostgreSQL).toBeInstanceOf(RepositorioPeliculaPostgreSQL);
  });

  test("deberia guardar una pelicula en la base de datos y devolver los datos correctos", async () => {
    const pelicula: Pelicula = new Pelicula(0, "pelicula1", "genero1");
    const peliculaGuardada: Pelicula = await repositorioPeliculaPostgreSQL.guardar(pelicula);
    expect(peliculaGuardada.obtenerId()).toEqual(1);
    expect(peliculaGuardada.obtenerTitulo()).toEqual(pelicula.obtenerTitulo());
    expect(peliculaGuardada.obtenerGenero()).toEqual(pelicula.obtenerGenero());
  });
});
