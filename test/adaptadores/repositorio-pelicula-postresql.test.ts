import { pool } from "../../app/adaptadores/pool-postgresql";
import RepositorioPeliculaPostgreSQL from "../../app/adaptadores/repositorio-pelicula-postgresql";
import Pelicula from "../../app/dominio/pelicula";
import PeliculaYaPersistidaError from "../../app/errores/pelicula-ya-pesistida-error";


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

  test("deberia guardar multiples peliculas en la base de datos y devolver los datos correctos", async () => {
    const pelicula: Pelicula = new Pelicula(0, "pelicula1", "genero1");
    const peliculaGuardada: Pelicula = await repositorioPeliculaPostgreSQL.guardar(pelicula);
    expect(peliculaGuardada.obtenerId()).toEqual(1);
    expect(peliculaGuardada.obtenerTitulo()).toEqual(pelicula.obtenerTitulo());
    expect(peliculaGuardada.obtenerGenero()).toEqual(pelicula.obtenerGenero());

    const pelicula2: Pelicula = new Pelicula(0, "pelicula2", "genero2");
    const peliculaGuardada2: Pelicula = await repositorioPeliculaPostgreSQL.guardar(pelicula2);
    expect(peliculaGuardada2.obtenerId()).toEqual(2);
    expect(peliculaGuardada2.obtenerTitulo()).toEqual(pelicula2.obtenerTitulo());
    expect(peliculaGuardada2.obtenerGenero()).toEqual(pelicula2.obtenerGenero());
  });

  test("deberia devolver un error si la pelicula que se quiere guardar tiene un id diferente de 0", async () => {
    const pelicula: Pelicula = new Pelicula(1, "pelicula1", "genero1");
    await expect(repositorioPeliculaPostgreSQL.guardar(pelicula)).rejects.toThrow(PeliculaYaPersistidaError);
  });
});
