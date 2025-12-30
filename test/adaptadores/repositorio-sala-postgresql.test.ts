import { pool } from "../../app/adaptadores/pool-postgresql";
import RepositorioSalaPostgreSQL from "../../app/adaptadores/repositorio-sala-postgresql";
import Sala from "../../app/dominio/sala";

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
  });

  describe("listarSalas", () => {
    test("deberia devovler una lista vacia de salas", () => {
      const salas: Sala[] = repositorioSalaPostgreSQL.listarSalas();
      expect(salas.length).toEqual(0);
    });

    test.skip("deberia devovler una lista con una sola sala si solo se guardo una sala", async() => {
      const sala: Sala = new Sala(0, 50);
      await repositorioSalaPostgreSQL.guardar(sala);
      const salas: Sala[] = repositorioSalaPostgreSQL.listarSalas();
      expect(salas.length).toEqual(1);
      expect(salas).toContainEqual(sala);
    });
  });
});