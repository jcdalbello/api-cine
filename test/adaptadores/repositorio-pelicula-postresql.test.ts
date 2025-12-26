import RepositorioPeliculaPostgreSQL from "../../app/adaptadores/repositorio-pelicula-postgresql";

let repositorioPeliculaPostgreSQL: RepositorioPeliculaPostgreSQL;

describe("RepositorioPeliculaPostgreSQL", () => {
  repositorioPeliculaPostgreSQL = new RepositorioPeliculaPostgreSQL();

  test("deberia crear un objeto RepositorioPeliculaPostgreSQL", () => {
    expect(repositorioPeliculaPostgreSQL).toBeInstanceOf(RepositorioPeliculaPostgreSQL);
  });
});
