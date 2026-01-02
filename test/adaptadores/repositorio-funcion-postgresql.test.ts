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
  const repositorioFuncionPostgresql: RepositorioFuncionPostgreSQL = new RepositorioFuncionPostgreSQL(
    repositorioSalaPostgreSQL,
    repositorioPeliculaPostgreSQL,
  );

  const idFuncion: number = 1;

  const capacidadSala: number = 50;

  const tituloPelicula: string = "pelicula1";
  const generoPelicula: string = "genero1";

  afterEach(async () => {
    await pool.query("TRUNCATE TABLE peliculas RESTART IDENTITY CASCADE");
    await pool.query("TRUNCATE TABLE salas RESTART IDENTITY CASCADE");
    await pool.query("TRUNCATE TABLE funciones RESTART IDENTITY CASCADE");
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


  test("deberia guardar multiples funciones en la base de datos y devolver los datos correctos de cada una", async () => {
    const cantidadDeFuncionesAGuardar: number = 5;
    for (let i = 1; i <= cantidadDeFuncionesAGuardar; i++) {
      const salaParaGuardarActual: Sala = new Sala(0, capacidadSala + i);
      const salaGuardadaActual: Sala = await repositorioSalaPostgreSQL.guardar(salaParaGuardarActual);

      const peliculaParaGuardarActual: Pelicula = new Pelicula(0, tituloPelicula + i, generoPelicula + i);
      const peliculaGuardadaActual: Pelicula = await repositorioPeliculaPostgreSQL.guardar(peliculaParaGuardarActual);

      const funcionParaGuardarActual: Funcion = new Funcion(0, salaGuardadaActual, peliculaGuardadaActual);
      const funcionGuardadaActual: Funcion = await repositorioFuncionPostgresql.guardar(funcionParaGuardarActual);

      const idFuncionActual: number = i;

      expect(funcionGuardadaActual.obtenerId()).toEqual(idFuncionActual);
      expect(funcionGuardadaActual.obtenerSala()).toEqual(salaGuardadaActual);
      expect(funcionGuardadaActual.obtenerPelicula()).toEqual(peliculaGuardadaActual);
    }
  });

  describe("buscarFunciones", () => {
    test("deberia devolver una lista vacia si no hay funciones guardadas", async () => {
      const funciones: Funcion[] = await repositorioFuncionPostgresql.buscarFunciones();
      expect(funciones.length).toEqual(0);
    });

    test("deberia devolver una lista con la unica funcion guardada sin pasar ningun parametro de busqueda", async () => {
      const salaParaGuardar: Sala = new Sala(0, capacidadSala);
      const salaGuardada: Sala = await repositorioSalaPostgreSQL.guardar(salaParaGuardar);

      const peliculaParaGuardar: Pelicula = new Pelicula(0, tituloPelicula, generoPelicula);
      const peliculaGuardada: Pelicula = await repositorioPeliculaPostgreSQL.guardar(peliculaParaGuardar);

      const funcionParaGuardar: Funcion = new Funcion(0, salaGuardada, peliculaGuardada);
      const funcionGuardada: Funcion = await repositorioFuncionPostgresql.guardar(funcionParaGuardar);

      const funciones: Funcion[] = await repositorioFuncionPostgresql.buscarFunciones();
      expect(funciones.length).toEqual(1);
      expect(funciones[0]).toEqual(funcionGuardada);
    });

    test("deberia devolver una lista con todas las funciones si no se pasar ningun parametro de busqueda", async () => {
      const cantidadDeFunciones: number = 5;
      for (let i = 1; i <= cantidadDeFunciones; i++) {
        const salaParaGuardarActual: Sala = new Sala(0, capacidadSala + i);
        const salaGuardadaActual: Sala = await repositorioSalaPostgreSQL.guardar(salaParaGuardarActual);

        const peliculaParaGuardarActual: Pelicula = new Pelicula(0, tituloPelicula + i, generoPelicula + i);
        const peliculaGuardadaActual: Pelicula = await repositorioPeliculaPostgreSQL.guardar(peliculaParaGuardarActual);

        const funcionParaGuardarActual: Funcion = new Funcion(0, salaGuardadaActual, peliculaGuardadaActual);
        await repositorioFuncionPostgresql.guardar(funcionParaGuardarActual);
      }

      const funciones: Funcion[] = await repositorioFuncionPostgresql.buscarFunciones();
      expect(funciones.length).toEqual(cantidadDeFunciones);
    });

    test("deberia devolver una lista con todas las funciones que coincidan con el id de sala", async () => {
      const salaParaGuardar: Sala = new Sala(0, capacidadSala);
      const salaGuardada: Sala = await repositorioSalaPostgreSQL.guardar(salaParaGuardar);

      const salaParaGuardar2: Sala = new Sala(0, capacidadSala + 1);
      const salaGuardada2: Sala = await repositorioSalaPostgreSQL.guardar(salaParaGuardar2);

      const peliculaParaGuardar: Pelicula = new Pelicula(0, tituloPelicula, generoPelicula);
      const peliculaGuardada: Pelicula = await repositorioPeliculaPostgreSQL.guardar(peliculaParaGuardar);

      const peliculaParaGuardar2: Pelicula = new Pelicula(0, tituloPelicula + "2", generoPelicula + "2");
      const peliculaGuardada2: Pelicula = await repositorioPeliculaPostgreSQL.guardar(peliculaParaGuardar2);

      const funcionParaGuardar: Funcion = new Funcion(0, salaGuardada, peliculaGuardada);
      const funcionGuardada: Funcion = await repositorioFuncionPostgresql.guardar(funcionParaGuardar);

      const funcionParaGuardar2: Funcion = new Funcion(0, salaGuardada2, peliculaGuardada2);
      const funcionGuardada2: Funcion = await repositorioFuncionPostgresql.guardar(funcionParaGuardar2);

      const funciones: Funcion[] = await repositorioFuncionPostgresql.buscarFunciones(salaGuardada.obtenerId());
      expect(funciones.length).toEqual(1);
      expect(funciones).toContainEqual(funcionGuardada);
      expect(funciones).not.toContainEqual(funcionGuardada2);
    });
  });
});
