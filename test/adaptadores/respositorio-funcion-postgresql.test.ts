import RepositorioFuncionPostgresql from "../../app/adaptadores/repositorio-funcion-postgresql";

describe("RepositorioFuncionPostgresql", () => {
  const repositorioFuncionPostgresql: RepositorioFuncionPostgresql = new RepositorioFuncionPostgresql();

  test("deveria crear un objeto RepositorioFuncionPostgresql", () => {
    expect(repositorioFuncionPostgresql).toBeInstanceOf(RepositorioFuncionPostgresql);
  });
});
