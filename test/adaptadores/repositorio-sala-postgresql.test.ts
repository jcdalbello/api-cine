import RepositorioSalaPostgreSQL from "../../app/adaptadores/repositorio-sala-postgresql";
import Sala from "../../app/dominio/sala";

describe("RepositorioSalaPostgreSQL", () => {
  const repositorioSalaPostgreSQL: RepositorioSalaPostgreSQL = new RepositorioSalaPostgreSQL();

  test("deberia crear un objeto RepositorioSalaPostgreSQL", () => {
    expect(repositorioSalaPostgreSQL).toBeInstanceOf(RepositorioSalaPostgreSQL);
  });

  test("deberia guardar una sala y devolver el resultado", () => {
    const sala: Sala = new Sala(0, 50);
    const salaGuardada: Sala = repositorioSalaPostgreSQL.guardar(sala);
    expect(salaGuardada.obtenerId()).toEqual(1);
    expect(salaGuardada.obtenerCapacidad()).toEqual(sala.obtenerCapacidad());
  });
});