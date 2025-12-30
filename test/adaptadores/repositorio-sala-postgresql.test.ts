import { pool } from "../../app/adaptadores/pool-postgresql";
import RepositorioSalaPostgreSQL from "../../app/adaptadores/repositorio-sala-postgresql";
import Sala from "../../app/dominio/sala";
import SalaYaPersistidaError from "../../app/errores/sala-ya-persistida-error";

describe("RepositorioSalaPostgreSQL", () => {
  const repositorioSalaPostgreSQL: RepositorioSalaPostgreSQL = new RepositorioSalaPostgreSQL();

  afterEach(async () => {
    await pool.query("TRUNCATE TABLE salas RESTART IDENTITY CASCADE");
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("guardar", () => {
    test("deberia crear un objeto RepositorioSalaPostgreSQL", () => {
      expect(repositorioSalaPostgreSQL).toBeInstanceOf(RepositorioSalaPostgreSQL);
    });

    test("deberia guardar una sala y devolver el resultado", async () => {
      const sala: Sala = new Sala(0, 50);
      const salaGuardada: Sala = await repositorioSalaPostgreSQL.guardar(sala);
      expect(salaGuardada.obtenerId()).toEqual(1);
      expect(salaGuardada.obtenerCapacidad()).toEqual(sala.obtenerCapacidad());
    });

    test("deberia guardar una sala y devolver el resultado", async () => {
      const sala: Sala = new Sala(0, 50);
      const salaGuardada: Sala = await repositorioSalaPostgreSQL.guardar(sala);
      expect(salaGuardada.obtenerId()).toEqual(1);
      expect(salaGuardada.obtenerCapacidad()).toEqual(sala.obtenerCapacidad());
    });

    test("deberia guardar multiples salas en la base de datos y devolver los datos correctos", async () => {
      const sala: Sala = new Sala(0, 50);
      const salaGuardada: Sala = await repositorioSalaPostgreSQL.guardar(sala);
      expect(salaGuardada.obtenerId()).toEqual(1);
      expect(salaGuardada.obtenerCapacidad()).toEqual(sala.obtenerCapacidad());

      const sala2: Sala = new Sala(0, 150);
      const salaGuardada2: Sala = await repositorioSalaPostgreSQL.guardar(sala2);
      expect(salaGuardada2.obtenerId()).toEqual(2);
      expect(salaGuardada2.obtenerCapacidad()).toEqual(sala2.obtenerCapacidad());
    });

    test("deberia devolver un error si la sala que se quiere guardar tiene un id diferente de 0", async () => {
      const sala: Sala = new Sala(1, 50);
      await expect(repositorioSalaPostgreSQL.guardar(sala)).rejects.toThrow(SalaYaPersistidaError);
    });
  });

  describe("listarSalas", () => {
    test("deberia devovler una lista vacia de salas", async () => {
      const salas: Sala[] = await repositorioSalaPostgreSQL.listarSalas();
      expect(salas.length).toEqual(0);
    });

    test("deberia devovler una lista con una sola sala si solo se guardo una sala", async () => {
      const sala: Sala = new Sala(0, 50);
      const salaGuardada: Sala = await repositorioSalaPostgreSQL.guardar(sala);

      const salas: Sala[] = await repositorioSalaPostgreSQL.listarSalas();
      expect(salas.length).toEqual(1);
      expect(salas).toContainEqual(salaGuardada);
    });

    test("deberia devovler una lista con todas las salas que tengan una capacidad mayor o igual a la pasada por parametro", async () => {
      const capacidadMinima: number = 50;
      const sala1: Sala = new Sala(0, capacidadMinima - 1);
      const sala2: Sala = new Sala(0, capacidadMinima);
      const sala3: Sala = new Sala(0, capacidadMinima + 1);
      const salaGuardada1: Sala = await repositorioSalaPostgreSQL.guardar(sala1);
      const salaGuardada2: Sala = await repositorioSalaPostgreSQL.guardar(sala2);
      const salaGuardada3: Sala = await repositorioSalaPostgreSQL.guardar(sala3);

      const salas: Sala[] = await repositorioSalaPostgreSQL.listarSalas(capacidadMinima);
      expect(salas.length).toEqual(2);
      expect(salas).toContainEqual(salaGuardada2);
      expect(salas).toContainEqual(salaGuardada3);
      expect(salas).not.toContainEqual(salaGuardada1);
    });
  });

  describe("recuperar", () => {
    test("deberia recuperar una sala por su id", async () => {
      const idSala: number = 1;
      const capacidad: number = 50;
      const salaParaGuardar: Sala = new Sala(0, capacidad);
      await repositorioSalaPostgreSQL.guardar(salaParaGuardar);
      const sala: Sala = await repositorioSalaPostgreSQL.recuperar(idSala);
      expect(sala.obtenerId()).toEqual(idSala);
      expect(sala.obtenerCapacidad()).toEqual(50);
    });

    test("deberia recuperar multiples salas por sus ids correspondientes", async () => {
      const cantidadDeSalas: number = 10;
      for (let i = 1; i <= cantidadDeSalas; i++) {
        const capacidad: number = i * 10;
        const salaParaGuardar: Sala = new Sala(0, capacidad);
        await repositorioSalaPostgreSQL.guardar(salaParaGuardar);
      }

      for (let i = 1; i <= cantidadDeSalas; i++) {
        const idActual: number = i;
        const capacidadActual: number = i * 10;
        const salaRecuperada: Sala = await repositorioSalaPostgreSQL.recuperar(idActual);
        expect(salaRecuperada.obtenerId()).toEqual(idActual);
        expect(salaRecuperada.obtenerCapacidad()).toEqual(capacidadActual);
      }
    });
  });
});