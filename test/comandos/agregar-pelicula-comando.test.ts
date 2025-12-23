import AgregarPeliculaComando from "../../app/comandos/agregar-pelicula-comando";

const agregarPeliculaComando: AgregarPeliculaComando = new AgregarPeliculaComando();

describe("AgregarPeliculaComando", () => {
  test("deberia crear un objeto AgregarPeliculaComando", () => {
    expect(agregarPeliculaComando).toBeInstanceOf(AgregarPeliculaComando);
  });
});
