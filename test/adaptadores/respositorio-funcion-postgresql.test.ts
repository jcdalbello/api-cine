import { pool } from "../../app/adaptadores/pool-postgresql";
import RepositorioFuncionPostgreSQL from "../../app/adaptadores/repositorio-funcion-postgresql";
import RepositorioPeliculaPostgreSQL from "../../app/adaptadores/repositorio-pelicula-postgresql";
import RepositorioSalaPostgreSQL from "../../app/adaptadores/repositorio-sala-postgresql";
import Funcion from "../../app/dominio/funcion";
import Pelicula from "../../app/dominio/pelicula";
import Sala from "../../app/dominio/sala";

describe("RepositorioFuncionPostgresql", () => {
  const repositorioPeliculaPostgreSQL: RepositorioPeliculaPostgreSQL = new RepositorioPeliculaPostgreSQL();
  const repositorioSalaPostgreSQL: RepositorioSalaPostgreSQL = new RepositorioSalaPostgreSQL();
  const repositorioFuncionPostgresql: RepositorioFuncionPostgreSQL = new RepositorioFuncionPostgreSQL();

  const idFuncion: number = 1;

  const capacidadSala: number = 50;

  const tituloPelicula: string = "pelicula1";
  const generoPelicula: string = "genero1";

  afterEach(async () => {
    await pool.query("TRUNCATE TABLE peliculas RESTART IDENTITY CASCADE");
    await pool.query("TRUNCATE TABLE salas RESTART IDENTITY CASCADE");
  });

  afterAll(async () => {
    await pool.end();
  });

  test("deberia crear un objeto RepositorioFuncionPostgresql", () => {
    expect(repositorioFuncionPostgresql).toBeInstanceOf(RepositorioFuncionPostgreSQL);
  });

  test("deberia guardar una funcion en la base de datos y devolver los datos correctos", async () => {
    const salaParaGuardar: Sala = new Sala(0, capacidadSala);
    const salaGuardada: Sala = await repositorioSalaPostgreSQL.guardar(salaParaGuardar);

    const peliculaParaGuardar: Pelicula = new Pelicula(0, tituloPelicula, generoPelicula);
    const peliculaGuardada: Pelicula = await repositorioPeliculaPostgreSQL.guardar(peliculaParaGuardar);

    const funcionParaGuardar: Funcion = new Funcion(0, salaGuardada, peliculaGuardada);
    const funcionGuardada: Funcion = await repositorioFuncionPostgresql.guardar(funcionParaGuardar);

    expect(funcionGuardada.obtenerId()).toEqual(idFuncion);
    expect(funcionGuardada.obtenerSala()).toEqual(salaGuardada);
    expect(funcionGuardada.obtenerPelicula()).toEqual(peliculaGuardada);
  });
});
