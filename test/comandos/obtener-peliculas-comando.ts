import ObtenerPeliculasComando from "../../app/comandos/obtener-peliculas-comando";

let obtenerPeliculasComando: ObtenerPeliculasComando;

describe("ObtenerPeliculasComando", () => {
  obtenerPeliculasComando = new ObtenerPeliculasComando();

  test("deberia crear un objeto ObtenerPeliculasComando", () => {
    expect(obtenerPeliculasComando).toBeInstanceOf(ObtenerPeliculasComando);
  });
});
