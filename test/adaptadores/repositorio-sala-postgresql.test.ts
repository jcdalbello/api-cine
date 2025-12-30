import RepositorioSalaPostgreSQL from "../../app/adaptadores/repositorio-sala-postgresql";

describe("RepositorioSalaPostgreSQL", () => {
  const repositorioSalaPostgreSQL: RepositorioSalaPostgreSQL = new RepositorioSalaPostgreSQL();
  test("deberia crear un objeto RepositorioSalaPostgreSQL", () => {
    expect(repositorioSalaPostgreSQL).toBeInstanceOf(RepositorioSalaPostgreSQL);
  });
});