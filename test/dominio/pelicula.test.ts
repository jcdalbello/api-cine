import Pelicula from "../../app/dominio/pelicula";

describe("Pelicula", () => {
  test("deberia crear un objeto Pelicula", () => {
    const pelicula: Pelicula = new Pelicula("1", "pelicula1", "genero1");
    expect(pelicula).toBeInstanceOf(Pelicula);
  });
});
