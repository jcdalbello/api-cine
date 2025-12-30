import RepositorioSalaPostgreSQL from "../../app/adaptadores/repositorio-sala-postgresql";
import Sala from "../../app/dominio/sala";

describe("RepositorioSalaPostgreSQL", () => {
  const repositorioSalaPostgreSQL: RepositorioSalaPostgreSQL = new RepositorioSalaPostgreSQL();

  describe("guardar", () => {
    test("deberia crear un objeto RepositorioSalaPostgreSQL", () => {
      expect(repositorioSalaPostgreSQL).toBeInstanceOf(RepositorioSalaPostgreSQL);
    });

    test("deberia guardar una sala y devolver el resultado", () => {
      const sala: Sala = new Sala(0, 50);
      const salaGuardada: Sala = repositorioSalaPostgreSQL.guardar(sala);
      expect(salaGuardada.obtenerId()).toEqual(1);
      expect(salaGuardada.obtenerCapacidad()).toEqual(sala.obtenerCapacidad());
    });

    test("deberia guardar una sala y devolver el resultado", () => {
      const sala: Sala = new Sala(0, 50);
      const salaGuardada: Sala = repositorioSalaPostgreSQL.guardar(sala);
      expect(salaGuardada.obtenerId()).toEqual(1);
      expect(salaGuardada.obtenerCapacidad()).toEqual(sala.obtenerCapacidad());
    });

    test("deberia guardar multiples salas en la base de datos y devolver los datos correctos", () => {
      const sala: Sala = new Sala(0, 50);
      const salaGuardada: Sala = repositorioSalaPostgreSQL.guardar(sala);
      expect(salaGuardada.obtenerId()).toEqual(1);
      expect(salaGuardada.obtenerCapacidad()).toEqual(sala.obtenerCapacidad());

      const sala2: Sala = new Sala(0, 150);
      const salaGuardada2: Sala = repositorioSalaPostgreSQL.guardar(sala2);
      expect(salaGuardada2.obtenerId()).toEqual(2);
      expect(salaGuardada2.obtenerCapacidad()).toEqual(sala2.obtenerCapacidad());
    });
  });
});